import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import dataJsonReducer from './features/dataJson';
import impFeatureReducer from './features/importantFeatures';
import loggedInUserReducer from './features/loggedInUser';
import modalMessageReducer from './features/modalMessage';
import screenOnMobileInfoReducer from './features/windowInfo';

export const store = configureStore({
  reducer: {
    loggedInUserStore: loggedInUserReducer,
    modalMessageStore: modalMessageReducer,
    screenOnMobileInfoStore: screenOnMobileInfoReducer,
    impFeatureStore: impFeatureReducer,
    dataStore: dataJsonReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch