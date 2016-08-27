import haikunator from 'haikunator'
import { valueSignal } from 'quiver-signal'
import { ImmutableMap } from 'quiver-util/immutable'

export const createUserManager = () => {
  let nextUserId = 1

  // msu :: Map Signal User
  let msu = ImmutableMap()

  // smsu :: Signal Map Signal User
  const [smsu, smsuSetter] = valueSignal(msu)

  // getUserSignal :: UserId -> Signal User
  const getUserSignal = userId =>
    msu.get(userId)

  const createUser = () => {
    const userId = nextUserId++

    let user = ImmutableMap({
      userId,
      name: haikunator(),
      score: 0
    })

    const [userSignal, signalSetter] = valueSignal(user)

    msu = msu.set(userId, userSignal)
    smsuSetter.setValue(msu)

    const setName = name => {
      user = user.set('name', name)
      setter.setValue(user)
    }

    const incrementScore = () => {
      const score = user.get('score')
      user = user.set('score', score+1)
      signalSetter.setValue(user)
    }

    const decrementScore = () => {
      const score = user.get('score')
      user = user.set('score', score-1)
      signalSetter.setValue(user)
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
    msu, smsu
  }
}
