import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "features/navigation/Navigator"

import { useEffect, useState } from "react"
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { RootStoreType } from 'redux/rootReducer'
import { locationActions } from 'redux/slices/locationSlice'

import { CustomSafeAreaView } from 'common/components'
import { fonts, palettes } from "common/theme"
import { Images } from 'common/assets/images'

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Home">
}

// intial geolocation - malaysia
const initialRegion = {
    latitude: 4.210484,
    longitude: 101.975766
}

const Homepage = ({ navigation }: Props) => {

    const dispatch = useAppDispatch()

    const searchList = useAppSelector((state: RootStoreType) => state.location.searchList)
    const selectedPlaceGeolocation = useAppSelector((state: RootStoreType) => state.location.selectedPlaceGeolocation)

    console.log(selectedPlaceGeolocation)

    return (
        <CustomSafeAreaView>
            <AutocompleteDropdown
                dataSet={searchList ? searchList.map((item, index) => ({
                    id: index.toString(),
                    title: item.description
                })) : []}
                onChangeText={(value) => {
                    dispatch(locationActions.searchLocation({
                        searchText: value
                    }))
                }}
                onSelectItem={item => {
                    item && dispatch(locationActions.getLocationDetails({
                        selectedPlace: searchList[Number(item.id)]
                    }))
                }}
                onBlur={() => { }}
                debounce={600}
                useFilter={false} // set false to prevent rerender twice
                textInputProps={{
                    placeholder: 'search location',
                    placeholderTextColor: palettes.white,
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    style: {
                        backgroundColor: palettes.silver,
                        color: palettes.white
                    },
                }}
                inputContainerStyle={{
                    backgroundColor: palettes.silver
                }}
                rightButtonsContainerStyle={{
                    alignSelf: 'center',
                    backgroundColor: palettes.silver
                }}
                suggestionsListContainerStyle={{
                    backgroundColor: palettes.silver,
                }}
                ClearIconComponent={<Image source={Images.clearIcon} style={{ width: '100%', tintColor: palettes.white, marginRight: 10 }} resizeMode="contain" />}
                containerStyle={{ flexShrink: 1 }}
                renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
                inputHeight={50}
                showChevron={false}
                closeOnBlur={true}
            />

            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: selectedPlaceGeolocation ? Number(selectedPlaceGeolocation.latitude) : initialRegion.latitude,
                    longitude: selectedPlaceGeolocation ? Number(selectedPlaceGeolocation.longitude) : initialRegion.longitude,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0034
                }}>
                {
                    selectedPlaceGeolocation &&
                    <Marker
                        coordinate={{
                            latitude: Number(selectedPlaceGeolocation.latitude),
                            longitude: Number(selectedPlaceGeolocation.longitude)
                        }}
                    />
                }
            </MapView>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        backgroundColor: 'red'
    }
})
export default Homepage;