import { h } from 'quiver-view'
import { valueSignal, constantSignal, unitEventSignal } from 'quiver-signal'

export const renderUserActions = () => {
  const [sortKeySignal, sortKeySetter] = valueSignal('uesrId')
  const [createUserSignal, createUser] = unitEventSignal()

  const keyHandler = key =>
    () => sortKeySetter.setValue(key)

  const resultDom = constantSignal(
    <div className='user-actions'>
      <button onclick={createUser}>Create User</button>
      <button onclick={keyHandler('userId')}>Sort By ID</button>
      <button onclick={keyHandler('name')}>Sort By Name</button>
      <button onclick={keyHandler('score')}>Sort By Score</button>
    </div>
  )

  return [resultDom, sortKeySignal, createUserSignal]
}
