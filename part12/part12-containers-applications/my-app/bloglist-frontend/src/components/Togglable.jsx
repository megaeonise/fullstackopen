import { useImperativeHandle, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.closeButtonLabel}</button>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  closeButtonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable