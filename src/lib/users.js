import { constantSignal } from 'quiver-signal'

import {
  h, renderSignal,
  renderScsa, renderSmScpvc
} from 'quiver-view'


// renderUsers ::
//     Signal Map Signal User ->
//     Signal Pair Vdom Map User
export const renderUsers = smsu => {
  // smsu :: Signal Map Signal User

  // renderScsca ::
  //     Signal Container Signal a ->
  //     (Signal a -> Signal (Pair Vdom a)) ->
  //     Signal Container Pair Vdom a

  // smpvu :: Signal Map Pair Vdom User
  const smpvu = renderScsa(
    smsu,
    (userSignal) =>
      renderSignal(userSignal, user => {
        const userId = user.get('userId')
        const name = user.get('name')
        const score = user.get('score')

        return (
          <div className='user'>
            <h2>{name}</h2>
            <div>
              <span className='label'>User ID: </span>
              <span>{ userId }</span>
            </div>
            <div>
              <span className='label'>Score: </span>
              <span>{ score }</span>
            </div>
            <button>Edit User</button>
          </div>
        )
      }))

  // spvmu :: Signal Pair Vdom Map User
  const spvmu = renderSmScpvc(
    constantSignal(),
    smpvu,
    (_, mpvu) => {
      // mpvu :: Map Pair Vdom User

      const userVdoms = [...mpvu.values()]
        .map(([vdom]) => vdom)

      return (
        <div className='users'>
          { userVdoms }
        </div>
      )
    }
  )

  return [spvmu]
}
