import { valueSignal } from 'quiver-signal'
import { ImmutableMap } from 'quiver-util/immutable'

export const createUserManager = () => {
  let nextUserId = 1

  let userMap = ImmutableMap()
  const [userMapSignal, userMapSetter] = valueSignal(userMap)

  const getUserSignal = userId =>
    userMap.get(userId)

  const createUser = () => {
    const userId = nextUserId++

    let user = ImmutableMap({
      userId,
      name: 'anonymous',
      score: 0
    })

    const [userSignal, setter] = valueSignal(user)

    userMap = userMap.set(userId, userSignal)
    userMapSetter.setValue(userMap)

    const setName = name => {
      user = user.set('name', name)
      setter.setValue(user)
    }

    const incrementScore = () => {
      const score = user.get('score')
      user = user.set('score', score+1)
      setter.setValue(user)
    }

    const decrementScore = () => {
      const score = user.get('score')
      user = user.set('score', score-1)
      setter.setValue(user)
    }

    const userSetter = {
      setName,
      incrementScore,
      decrementScore
    }

    return [userSignal, userSetter]
  }

  return {
    createUser,
    getUserSignal,
    userMapSignal
  }
}
