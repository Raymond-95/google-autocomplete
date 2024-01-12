import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { switchMap, withLatestFrom } from 'rxjs/operators'
import { MyEpic } from '../store'
import { RootStoreType } from 'redux/rootReducer'

import BuildConfig from 'react-native-config'

import { ApiService } from 'services/network/ApiService'
import { GooglePlaceSearchModel } from 'models'

type Geolocation = {
    latitude: string
    longitude: string
}

type LocationReducer = {
    isFetching: boolean
    searchText: string
    language: string
    apiKey: string,
    searchList: Array<GooglePlaceSearchModel>,
    selectedPlace: GooglePlaceSearchModel | null,
    selectedPlaceGeolocation: Geolocation | null
}

const initialState: LocationReducer = {
    isFetching: false,
    searchText: '',
    language: 'en',
    apiKey: '',
    searchList: [],
    selectedPlace: null,
    selectedPlaceGeolocation: null
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
        searchLocationError: (state, action) => ({ ...state, isFetching: false }),
        getLocationDetails: (state, action) => ({
            ...state,
            isFetching: true,
            selectedPlace: action.payload.selectedPlace
        }),
        getLocationSuccess: (state, action) => ({
            ...state,
            isFetching: false,
            selectedPlaceGeolocation: {
                latitude: action.payload.lat,
                longitude: action.payload.lng
            }
        }),
        getLocationError: (state, action) => ({ ...state, isFetching: false })
    },
})

/**
 *
 * @param action$ search location
 * @param state$
 * @returns
 */
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
                    console.log(error)
                    return locationActions.searchLocationError(error.message)
                })
        })
    )

/**
 *
 * @param action$ get location details
 * @param state$
 * @returns
 */
const getLocationDetailsEpic: MyEpic = (action$: Observable<PayloadAction<undefined>>, state$: Observable<RootStoreType>) =>
    action$.pipe(
        ofType(locationActions.getLocationDetails.type),
        withLatestFrom(state$),
        switchMap(([action, state]) => {

            const { selectedPlace, searchList } = state.location

            const data = {
                placeid: selectedPlace ? selectedPlace.place_id : searchList[0].place_id,
                key: BuildConfig.GOOGLE_API_API_KEY
            }

            console.log(selectedPlace)
            console.log(searchList[0])
            console.log(data)

            return ApiService.apis.getLocationDetails(data)
                .then(result => {
                    console.log(result)
                    return locationActions.getLocationSuccess(result.result.geometry.location)
                })
                .catch(error => {
                    console.log(error)
                    return locationActions.getLocationError(error.message)
                })
        })
    )

export const locationReducer = locationSlice.reducer
export const locationActions = locationSlice.actions
export const locationEpics = [searchLocationEpic, getLocationDetailsEpic]
