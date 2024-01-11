import { configureStore, Tuple } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable'
import { rootReducer, RootStoreType } from './rootReducer'

import { locationEpics } from './slices/locationSlice'

// Redux observable
export type MyEpic = Epic<any, any, RootStoreType, any>
export const rootEpic = combineEpics(...locationEpics)
const epicMiddleware = createEpicMiddleware<any, any, RootStoreType, any>()

const middlewares = [
  epicMiddleware
];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(...middlewares)
})

export type AppDispatch = typeof store.dispatch;

epicMiddleware.run(rootEpic)