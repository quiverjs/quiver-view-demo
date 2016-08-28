import haikunator from 'haikunator'
import { error } from 'quiver-util/error'
import { valueSignal } from 'quiver-signal'
import { ImmutableMap, ImmutableList } from 'quiver-util/immutable'

export const createUserManager = () => {
  let nextUserId = 1

  // userTable :: Map UserId { User, (Signal User), (SignalSetter User) }
  const userTable = new Map()

  // lsu :: List Signal User
  let lsu = ImmutableList()

  // slsu :: Signal List Signal User
  const [slsu, slsuSetter] = valueSignal(lsu)

  const createUser = () => {
    const userId = nextUserId++

    let user = ImmutableMap({
      userId,
      name: haikunator(),
      score: 0
    })

    const [userSignal, userSetter] = valueSignal(user)

    userTable.set(userId, {
      user, userSignal, userSetter
    })

    lsu = lsu.push(userSignal)
    slsuSetter.setValue(lsu)

    return userSignal
  }

  const getUserEntry = (userId) => {
    const entry = userTable.get(userId)
    if(!entry) throw error(404, 'user not found')
    return entry
  }

  const updateUser = (userEntry, newUser) => {
    userEntry.user = newUser
    const { userSetter } = userEntry
    userSetter.setValue(newUser)
  }

  const setUserName = (userId, name) => {
    const entry = getUserEntry(userId)
    const { user } = entry

    const newUser = user.set('name', name)

    updateUser(entry, newUser)
  }

  const incrementUserScore = userId => {
    const entry = getUserEntry(userId)
    const { user } = entry

    const score = user.get('score')
    const newUser = user.set('score', score+1)

    updateUser(entry, newUser)
  }

  const decrementUserScore = userId => {
    const entry = getUserEntry(userId)
    const { user } = entry

    const score = user.get('score')
    const newUser = user.set('score', score-1)

    updateUser(entry, newUser)
  }

  return {
    createUser,
    slsu,

    setUserName,
    incrementUserScore,
    decrementUserScore
  }
}
