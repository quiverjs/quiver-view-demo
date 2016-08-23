import { h, combineRender } from 'quiver-view'
import { constantSignal } from 'quiver-signal'
import { subscribeGenerator } from 'quiver-signal/method'
import { ImmutableMap, extract } from 'quiver-util/immutable'

import { createUserManager } from './user-manager'
import { renderUserActions } from './action'
import { renderUsers } from './users'

export const renderApp = () => {
  const userManager = createUserManager()

  const [actionsVdomSignal, sortKeySignal, createUserSignal] = renderUserActions()

  createUserSignal::subscribeGenerator(function*() {
    while(true) {
      if(yield) {
        userManager.createUser()
      }
    }
  })

  const [usersVdomSignal, selectedUserSignal] = renderUsers(userManager.userMapSignal)

  return combineRender(
    constantSignal(),
    ImmutableMap({
      actions: actionsVdomSignal,
      users: usersVdomSignal
    }),
    (_, vdomMap) => {
      const [actionsVdom] = vdomMap.get('actions')
      const [usersVdom] = vdomMap.get('users')

      return (
        <div className='app'>
          { actionsVdom }
          { usersVdom }
        </div>
      )
    })
}
