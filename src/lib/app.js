import React from 'react'
import { h, renderSmCspvc } from 'quiver-view'
import { constantSignal } from 'quiver-signal'
import { ImmutableMap } from 'quiver-util/immutable'

import { createUserManager } from './user-manager'
import { renderUserActions } from './action'
import { renderUsers } from './users'
import { renderUserForm } from './user-form'
import { pipeActionSignals } from './pipe'

export const renderApp = () => {
  const userManager = createUserManager()

  const [
    actionsSpva, sortKeySignal, createUserSignal
  ] = renderUserActions()

  const [
    usersSpva, selectedUserSsu
  ] = renderUsers(sortKeySignal, userManager.slsu)

  const [
    formSpva, editEventSignal
  ] = renderUserForm(selectedUserSsu)

  pipeActionSignals(userManager, createUserSignal, editEventSignal)

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
