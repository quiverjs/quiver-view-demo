import { ImmutableMap, extract } from 'quiver-util/immutable'
import { h, combineRender } from 'quiver-view'

import { createUserManager } from './user-manager'
import { renderUserActions } from './action'
import { sortUserMapSignal } from './sort'

export const renderApp = () => {
  const userManager = createUserManager()

  const [userActionsVdom, sortKeySignal, createUserSignal] = renderUserActions()

  const usersSignal = sortUserMapSignal(userManager, sortKeySignal)

  const [usersVdom, selectedUserSignal] = renderUsers(usersSignal)
}
