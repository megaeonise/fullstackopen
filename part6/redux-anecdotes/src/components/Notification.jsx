import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification===''){
    return <></>
  }
  else{
    setTimeout(()=> {
      dispatch(removeNotification())
    }, 5000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

}

export default Notification