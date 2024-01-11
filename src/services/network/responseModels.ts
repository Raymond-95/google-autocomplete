import { GooglePlaceSearchModel } from 'models'

export interface GenericResponse {
    status: string
    message: string
}

export interface LocationResponse {
    predictions: [GooglePlaceSearchModel]
}

