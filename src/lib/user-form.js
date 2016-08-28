import { flattenSsa, eventSignal } from 'quiver-signal'
import { h, renderSignal } from 'quiver-view'

const emptySelectionDisplay =
  <div className='no-user-selected'>
    Select a user to edit their attributes here.
  </div>

// renderUserForm ::
//     Signal Signal User ->
//     (Signal Pair Vdom User, EventSignal EditAction)
export const renderUserForm = (selectedUserSsu) => {
  const userSignal = flattenSsa(selectedUserSsu)

  const [editEventSignal, emitter] = eventSignal()

  const formSpva = renderSignal(userSignal, user => {
    if(!user) return emptySelectionDisplay

    const userId = user.get('userId')
    const name = user.get('name')

    const onSubmit = ev => {
      ev.preventDefault()

      const form = ev.target
      const nameInput = form.querySelector('#name-input')
      const newName = nameInput.value

      emitter({
        userId,
        action: 'change_name',
        newName
      })
    }

    const onIncrement = () =>
      emitter({
        userId,
        action: 'increment_score'
      })

    const onDecrement = () =>
      emitter({
        userId,
        action: 'decrement_score'
      })

    return (
      <form className='user-form' onsubmit={onSubmit}>
        <h2>Edit User</h2>

        <label>Name:</label>
        <input id='name-input' name='name' type='text' value={name} />

        <button type='submit'>Change Name</button>

        <button onclick={onIncrement}>
          Add Score
        </button>

        <button onclick={onDecrement}>
          Minus Score
        </button>
      </form>
    )
  })

  return [formSpva, editEventSignal]
}
