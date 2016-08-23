import { ImmutableMap } from 'quiver-util/immutable'

import { valueSignal, constantSignal, flattenSignal } from 'quiver-signal'

import {
  h, renderSignal,
  renderListSignal
} from 'quiver-view'

export const renderUsers = usersSignal => {
  const renderUserSignal = (userSignal) => {
    return renderSignal(userSignal, user => {
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
    })
  }

  const usersVdomSignal = renderListSignal(
    constantSignal(),
    usersSignal,
    renderUserSignal,
    (_, userVdoms) => {
      console.log('userVdoms:', userVdoms)
      return (
        <div className='users'>
          { [...userVdoms.values()].map(([vdom]) => vdom) }
        </div>
      )
    }
  )

  return [usersVdomSignal]
}
