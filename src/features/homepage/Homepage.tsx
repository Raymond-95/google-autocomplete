import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "features/navigation/Navigator"

import { useEffect } from "react"
import { StyleSheet, View, Text } from 'react-native'

// import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {useDispatch} from 'react-redux'
import { locationActions } from 'redux/slices/locationSlice'

import { CustomSafeAreaView } from 'common/components'
import { fonts } from "common/theme"

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Home">
}

const Homepage = ({ navigation }: Props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(locationActions.searchLocation({
            searchText: 'sela' // hardcoded for selangor
        }))
    }, [])

    return (
        <CustomSafeAreaView>
            {/* <View></View> */}
        </CustomSafeAreaView>
    )
}

export default Homepage;