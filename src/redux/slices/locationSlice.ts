import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators'
import { RootStoreType } from '../rootReducer'
import { MyEpic } from '../store'

import BuildConfig from 'react-native-config'

import { ApiService } from 'services/network/ApiService'
import { NavigationService } from 'services/navigation/NavigationService'
import { GooglePlaceSearchModel } from 'models'

type LocationReducer = {
    isFetching: boolean
    searchText: string
    language: string
    apiKey: string,
    searchList: Array<GooglePlaceSearchModel>
}

const initialState: LocationReducer = {
    isFetching: false,
    searchText: '',
    language: 'en',
    apiKey: '',
    searchList: []
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        searchLocation: (state, action) => ({
            ...state,
            isFetching: true,
            searchText: action.payload.searchText
        }),
        searchLocationSuccess: (state, action) => ({ ...state, isFetching: false, searchList: action.payload }),
        searchLocationError: (state, action) => ({ ...state, isFetching: false })
    },
})

const searchLocationEpic: MyEpic = (action$: Observable<PayloadAction<undefined>>, state$: Observable<RootStoreType>) =>
    action$.pipe(
        ofType(locationActions.searchLocation.type),
        withLatestFrom(state$),
        switchMap(([action, state]) => {

            const { searchText } = state.location

            const data = {
                input: searchText,
                langugage: 'en',
                types: 'geocode',
                key: BuildConfig.GOOGLE_API_API_KEY
            }

            return ApiService.apis.searchLocation(data)
                .then(result => {
                    return locationActions.searchLocationSuccess(result.predictions)
                })
                .catch(error => {
                    return locationActions.searchLocationError(error.message)
                })
        })
    )

export const locationReducer = locationSlice.reducer
export const locationActions = locationSlice.actions
export const locationEpics = [searchLocationEpic]
