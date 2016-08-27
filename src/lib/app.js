import { h, renderSmCspvc } from 'quiver-view'
import { constantSignal } from 'quiver-signal'
import { subscribeGenerator } from 'quiver-signal/method'
import { ImmutableMap } from 'quiver-util/immutable'

import { createUserManager } from './user-manager'
import { renderUserActions } from './action'
import { renderUsers } from './users'

export const renderApp = () => {
  const userManager = createUserManager()

  const [actionsSpva, sortKeySignal, createUserSignal] = renderUserActions()

  createUserSignal::subscribeGenerator(function*() {
    while(true) {
      if(yield) {
        userManager.createUser()
      }
    }
  })

  const [usersSpva, selectedUserSignal] = renderUsers(sortKeySignal, userManager.smsu)

  // renderSmCspvc ::
  //     Signal main ->
  //     Container Signal Pair Vdom child ->
  //     (main -> Container Pair Vdom child -> Vdom) ->
  //     Signal Pair Vdom (Pair main (Container child))
  return renderSmCspvc(
    constantSignal(),
    ImmutableMap({
      actions: actionsSpva,
      users: usersSpva
    }),
    (_, mpvc) => {
      // mpvc :: Map Pair Vdom child

      const [actionsVdom] = mpvc.get('actions')
      const [usersVdom] = mpvc.get('users')

      return (
        <div className='app'>
          { actionsVdom }
          { usersVdom }
        </div>
      )
    })
}
