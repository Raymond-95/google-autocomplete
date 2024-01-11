import { StyleSheet } from 'react-native'
import { palettes } from 'common/theme/palettes'

export const fonts = StyleSheet.create({
    heading1: {
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: palettes.black
    },
    heading2: {
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: palettes.black
    },
    regular: {
        fontSize: 18,
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: palettes.black
    },
    regularBoldTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: palettes.black
    },
    whiteFont: {
        color: palettes.white
    }
})