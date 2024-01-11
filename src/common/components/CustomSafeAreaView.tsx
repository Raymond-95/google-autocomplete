import React from "react"
import { StyleSheet, SafeAreaView, View } from 'react-native'

import { palettes } from 'common/theme'

interface CustomSafeAreaViewProps {
    children?: React.ReactNode
}

export const CustomSafeAreaView = ({
    children
}: CustomSafeAreaViewProps) => {
    return (
        <SafeAreaView style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        backgroundColor: palettes.white,
        padding: 20
    }
})