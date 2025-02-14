import { Alert } from "@mui/material";
const Message = ({ message, isError }) => {
  if (message !== null) {
    if (isError) {
      return (
        <Alert className="error" severity="error">
          {message}
        </Alert>
      );
    } else {
      return (
        <Alert className="message" severity="success">
          {message}
        </Alert>
      );
    }
  }
};

export default Message;
