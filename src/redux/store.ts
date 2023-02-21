import { configureStore } from '@reduxjs/toolkit'
import loggedInUserReducer from './features/loggedInUser'
import modalMessageReducer from './features/modalMessage'

export const store = configureStore({
  reducer: {
    loggedInUserStore: loggedInUserReducer,
    modalMessageStore: modalMessageReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch