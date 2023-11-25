import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./slices/studentSlice";

export const store = configureStore({
  reducer: { student: studentSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
