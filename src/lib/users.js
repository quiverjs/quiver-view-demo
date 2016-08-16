import { ImmutableMap } from 'quiver-util/immutable'

import { valueSignal, flattenSignal } from 'quiver-signal'

import {
  h, renderSignal,
  constantSignal, renderListSignal
} from 'quiver-view'

const nestedSignal = (initialSignal) => {
  let signalMap = ImmutableMap()
  if(initialSignal) {
    signalMap = signalMap.set('innerSignal', initialSignal)
  }

  const [signalSignal, signalSetter] = valueSignal(signalMap)

  const setSignal = innerSignal => {
    signalMap = signalMap.set('innerSignal', innerSignal)
    signalSetter.setValue(signalMap)
  }

  const resultSignal = flattenSignal(signalSignal)
    ::map(resultMap => resultMap.get('innerSignal'))

  return [resultSignal, setSignal]
}

export const renderUsers = usersSignal => {
  const [selectedUserSignal, setUserSignal] = nestedSignal()

  const renderUserSignal = (userSignal) => {
    const onSelect = () => setSelected(userSignal)

    return renderSignal(userSignal, user => {
      const userId = user.get('userId')
      const name = user.get('name')
      const score = user.get('score')

      return (
        <div className='user'>
          <h2>{name}</h2>
          <div>
            <span className='label'>User ID: </span>
            <span>{ userId }</span>
          </div>
          <div>
            <span className='label'>Score: </span>
            <span>{ score }</span>
          </div>
          <button onClick={onSelect}>Edit User</button>
        </div>
      )
    })
  }

  const usersVdom = renderListSignal(
    constantSignal(),
    usersSignal,
    renderUserSignal,
    (_, userVdoms) => {
      <div className='users'>
        { userVdoms }
      </div>
    }
  )

  return [usersVdom, selectedUserSignal]
}
