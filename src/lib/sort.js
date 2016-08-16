import { h } from 'quiver-view'
import { flattenSignal, combineSignals } from 'quiver-signal'
import { map } from 'quiver-signal/method'

import sortBy from 'lodash.sortby'

export const sortUserMapSignal = (userManager, sortKeySignal) => {
  const { userMapSignal, getUserSignal } = userManager
  const flattened = flattenSignal(userMapSignal)

  const combined = combineSignals(ImmutableMap({
    sortKey: sortKeySignal,
    userMap: flattened
  }))

  return combined::map(args => {
    const sortKey = args.get('sortKey')
    const userMap = args.get('userMap')

    const users = [...userMap.values()]
    const sorted = sortBy(users, user => user.get(sortKey))

    const sortedSignals = sorted.map(user =>
      getUserSignal(user.get('userId')))

    return sortedSignals
  })
}
