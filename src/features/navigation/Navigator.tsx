import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    isMountedRef,
    navigationRef,
} from 'services/navigation/NavigationService'

import { palettes } from 'common/theme'

import LoginScreen from 'features/auth/Login'
import HomeScreen from 'features/homepage/Homepage'

export type RootStackParamsList = {
    Login: undefined
    Home: undefined
}

const Stack = createNativeStackNavigator<RootStackParamsList>();

const Navigator = () => {
    /**
     * Hide the splash screen on mount
     * Keep track of nav container mounts for usage of {@link NavigationService}
     */
    useEffect(() => {
        isMountedRef.current = true
        // SplashScreen.hide({ duration: 250 })
        return () => {
            isMountedRef.current = false
        }
    }, [])
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login" >
                <Stack.Screen name="Login" component={LoginScreen} options={hideHeader} />
                <Stack.Screen name="Home" component={HomeScreen} options={customHeader} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;

/**
 * Hide header
 */
const hideHeader = {
    headerShown: false
}

/**
 * Customer hdeader
 */
const customHeader = {
    headerShadowVisible: true,
    headerStyle: {
        backgroundColor: palettes.primaryColor
    },
    headerTintColor: palettes.white
}