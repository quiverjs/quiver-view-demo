import { listen } from 'quiver-signal/method'

export const pipeActionSignals = (userManager, createUserSignal, editEventSignal) => {
  createUserSignal::listen(() =>
    userManager.createUser())

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
}
