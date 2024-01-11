import { GooglePlaceSearchModel, GeoLocation } from 'models'

export interface GenericResponse {
    status: string
    message: string
}

export interface LocationResponse {
    predictions: [GooglePlaceSearchModel]
}

export interface LocationDetailsResponse {
    result: {
        geometry: GeoLocation
    }
}

