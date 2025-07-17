const Message = ( { message, isError } ) => {
  if(message!==null){
    if(isError){
      return (
        <div className="error">
          {message}
        </div>
      )
    }
    else{
      return (
        <div className="message">
          {message}
        </div>
      )
    }
  }
}

export default Message