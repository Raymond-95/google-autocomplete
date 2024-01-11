import { combineReducers } from "redux"
import { locationReducer } from 'redux/slices/locationSlice'

export const rootReducer = combineReducers({
    location: locationReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>
