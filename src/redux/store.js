import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./features/getPropertySlice";

export const store = configureStore({
  reducer: {
    properties: propertyReducer,
    //comments: propertyReducer,
  },
});

//store.dispatch(getCommentsAsync("https://looking.fly.dev/comments"));
//store.dispatch(getCommentByIdAsync(1));
