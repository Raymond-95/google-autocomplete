import * as React from 'react';
import { Text } from 'react-native'

import { fonts } from 'common/theme'

interface Props {
    title: string
}

export const Heading1 = ({
    title
}: Props) => {
    return (
        <Text style={fonts.heading1}>
            {title}
        </Text>
    )
}