import { create } from 'apisauce'
import BuildConfig from "react-native-config"

export const namespace = '/api'

// generic instance
export const genericInstance = create({
    baseURL: BuildConfig.API_BASE_URL + namespace,
    timeout: 30 * 1000,
    headers: {
        'Accept': 'application/json'
    }
})

export const googleLibrary = '/maps'

// google instance
export const googleInstance = create({
    baseURL: BuildConfig.GOOGLE_API_BASE_URL + googleLibrary + namespace,
    timeout: 30 * 1000,
    headers: {
        'Accept': 'application/json'
    }
})