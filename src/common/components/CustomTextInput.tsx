import React, { useState, useEffect } from 'react';
import { TextInput, TextInputProps, Text } from 'react-native'

import { palettes } from 'common/theme'

interface TextFieldProps {
    placeholder: string
    placeholderTextColor: string
    secureTextEntry?: boolean
    onChangeText: (value: string) => void,
    onBlur?: (value) => void,
    onFocus?: (value) => void,
    value?: string
    error?: string
}

export const CustomTextInput = ({
    placeholder = '',
    placeholderTextColor = '',
    secureTextEntry,
    onChangeText,
    onBlur,
    onFocus,
    value = '',
    error = ''
}: TextFieldProps) => {

    return (
        <>
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: palettes.lightgrey,
                    borderRadius: 10,
                    marginTop: 20,
                    paddingHorizontal: 10,
                    color: palettes.black
                }}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                onBlur={onBlur}
                onFocus={onFocus}
                value={value}
            />
            {
                error &&
                <Text style={{ color: palettes.red }}>{error}</Text>
            }
        </>
    )
}