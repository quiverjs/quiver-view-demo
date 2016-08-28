import sortBy from 'lodash.sortby'
import { valueSignal } from 'quiver-signal'

import {
  h, renderSignal,
  renderScsa, renderSmScpvc
} from 'quiver-view'


// renderUsers ::
//     Signal String
//     Signal Map Signal User ->
//     (Signal Pair Vdom Map User, Signal Signal User)
export const renderUsers = (sortKeySignal, smsu) => {
  // smsu :: Signal Map Signal User

  // selectedUserSsu :: Signal Signal User
  const [selectedUserSsu, ssuSetter] = valueSignal()

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

        const onUserSelect = () =>
          ssuSetter.setValue(userSignal)

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
            <button onclick={onUserSelect}>Edit User</button>
          </div>
        )
      }))

  // spvmu :: Signal Pair Vdom Map User
  const spvmu = renderSmScpvc(
    sortKeySignal,
    smpvu,
    (sortKey, mpvu) => {
      // mpvu :: Map Pair Vdom User
      // lpvu :: List Pair Vdom User
      const lpvu = [...mpvu.values()]

      const sortedLpvu = sortBy(lpvu,
        ([,user]) => user.get(sortKey))

      const userVdoms = sortedLpvu
        .map(([vdom]) => vdom)

      return (
        <div className='users'>
          { userVdoms }
        </div>
      )
    }
  )

  return [spvmu, selectedUserSsu]
}
