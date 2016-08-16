import { h, renderSignal } from 'quiver-view'

export const renderUserForm = (userSignal, userSetter) =>
  renderSignal(userSignal, user => {


    const name = user.get('name')

    const onNameChanged = ev => {
        const newName = ev.target.value
        userSetter.setName(newName)
    }

    return (
      <div className='user-form'>
        <h2>Edit User</h2>

        <label>Name:</label>
        <input name='name' type='text' value={name} onchange={onNameChanged} />

        <button onclick={userSetter.incrementScore}>
          Add Score
        </button>

        <button onclick={userSetter.decrementScore}>
          Minus Score
        </button>
      </div>
    )
  })
