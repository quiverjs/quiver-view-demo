import { h } from 'quiver-view'
import { valueSignal, unitEventSignal } from 'quiver-signal'
import { constantSpva } from 'quiver-view'

// renderUserActions :: () -> (
//     Signal Pair Vdom a,
//     Signal String,
//     Signal () )
export const renderUserActions = () => {
  const [sortKeySignal, sortKeySetter] = valueSignal('userId')
  const [createUserSignal, createUser] = unitEventSignal()

  const keyHandler = key =>
    () => sortKeySetter.setValue(key)

  const spva = constantSpva(
    <div className='user-actions'>
      <button onclick={createUser}>Create User</button>
      <button onclick={keyHandler('userId')}>Sort By ID</button>
      <button onclick={keyHandler('name')}>Sort By Name</button>
      <button onclick={keyHandler('score')}>Sort By Score</button>
    </div>
  )

  return [spva, sortKeySignal, createUserSignal]
}
