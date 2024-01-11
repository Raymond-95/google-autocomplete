import { client } from 'services/network/ApiService'
import { routes } from 'services/network/routes'
import { LocationResponse, LocationDetailsResponse } from 'services/network/responseModels'

// API implementation
export const apis = {
    searchLocation: (data) => client.googleGet<LocationResponse>(
        routes.searchLocationUrl(),
        data
    ),
    getLocationDetails: (data) => client.googleGet<LocationDetailsResponse>(
        routes.getLocationDetailsUrl(),
        data
    )
}