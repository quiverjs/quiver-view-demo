import { h, renderSmCspvc } from 'quiver-view'
import { constantSignal } from 'quiver-signal'
import { listen } from 'quiver-signal/method'
import { ImmutableMap } from 'quiver-util/immutable'

import { createUserManager } from './user-manager'
import { renderUserActions } from './action'
import { renderUsers } from './users'
import { renderUserForm } from './user-form'

export const renderApp = () => {
  const userManager = createUserManager()

  const [actionsSpva, sortKeySignal, createUserSignal] = renderUserActions()

  createUserSignal::listen(() =>
    userManager.createUser())

  const [usersSpva, selectedUserSsu] = renderUsers(sortKeySignal, userManager.slsu)

  const [formSpva, editEventSignal] = renderUserForm(selectedUserSsu)

  editEventSignal::listen(ev => {
    console.log('edit event:', ev)
    const { userId, action } = ev

    if(action === 'change_name') {
      const { newName } = ev
      userManager.setUserName(userId, newName)

    } else if(action === 'increment_score') {
      userManager.incrementUserScore(userId)

    } else if(action === 'decrement_score') {
      userManager.decrementUserScore(userId)

    }
  })

  // renderSmCspvc ::
  //     Signal main ->
  //     Container Signal Pair Vdom child ->
  //     (main -> Container Pair Vdom child -> Vdom) ->
  //     Signal Pair Vdom (Pair main (Container child))
  return renderSmCspvc(
    constantSignal(),
    ImmutableMap({
      actions: actionsSpva,
      users: usersSpva,
      form: formSpva
    }),
    (_, mpvc) => {
      // mpvc :: Map Pair Vdom child

      const [actionsVdom] = mpvc.get('actions')
      const [usersVdom] = mpvc.get('users')
      const [formVdom] = mpvc.get('form')

      return (
        <div className='app'>
          { actionsVdom }
          { formVdom }
          { usersVdom }
        </div>
      )
    })
}
