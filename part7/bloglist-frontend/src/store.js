import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    message: messageReducer,
    user: userReducer,
  },
});

export default store;

console.log(store.getState());
