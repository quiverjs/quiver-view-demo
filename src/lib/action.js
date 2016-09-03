import React from 'react'
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
      <button onClick={createUser}>Create User</button>
      <button onClick={keyHandler('userId')}>Sort By ID</button>
      <button onClick={keyHandler('name')}>Sort By Name</button>
      <button onClick={keyHandler('score')}>Sort By Score</button>
    </div>
  )

  return [spva, sortKeySignal, createUserSignal]
}
