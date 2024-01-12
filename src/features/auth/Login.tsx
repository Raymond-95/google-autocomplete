import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "features/navigation/Navigator"

import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Button } from '@ant-design/react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { CustomSafeAreaView, Heading1, CustomTextInput } from 'common/components';
import { Images } from 'common/assets/images';
import { palettes } from 'common/theme';

import { unlockWithBiometric, BiometricResponse, registerBiometric } from 'utils'
interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Login">
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('email address is required'),
  password: Yup.string().min(8, 'password is too short').required('password is required'),
});

const Login = ({ navigation }: Props) => {
  const handleSubmit = async (values: { email: string; password: string }) => {

    unlockWithBiometric()
      .then((result: BiometricResponse) => {
        if (result.biometricEnabled && result.verified) {
          // navigate to after login successfully
          navigation.navigate('Home');
        }
        else if (result.biometricEnabled && !result.verified) {
          throw new Error('Failed to verified')
        }
        else {
          registerBiometric(values.email, values.password)
        }
      })
      .catch(error => {
        Alert.alert(error.message)
      })
  };

  return (
    <CustomSafeAreaView>
      <View style={styles.imgContainerStyle}>
        <Image style={styles.logoStyle} source={Images.logoIcon} resizeMode="contain" />
      </View>

      <View style={styles.containerStyle}>
        <Heading1 title={'Login to your account'} />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, setErrors, handleSubmit, values, errors, touched }) => (
            <View>
              <CustomTextInput
                placeholder={'email address'}
                placeholderTextColor={palettes.lightgrey}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                onFocus={() => setErrors({ email: null })}
                value={values.email}
                error={(touched.email && errors.email) ? errors.email : undefined}
              />

              <CustomTextInput
                placeholder={'password'}
                placeholderTextColor={palettes.lightgrey}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                onFocus={() => setErrors({ password: null })}
                value={values.password}
                secureTextEntry={true}
                error={(touched.password && errors.password) ? errors.password : undefined}
              />

              <Button style={styles.submitBtnStyle} type="primary" onPress={handleSubmit}>Submit</Button>
            </View>
          )}
        </Formik>
      </View>
    </CustomSafeAreaView>
  );
};



const styles = StyleSheet.create({
  imgContainerStyle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: '30%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerStyle: {
    flex: 0.6,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: palettes.lightgrey,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    color: palettes.black
  },
  submitBtnStyle: {
    marginTop: 25,
    backgroundColor: palettes.primaryColor,
    borderRadius: 10,
    borderColor: palettes.primaryColor
  },
  textStyle: {
    color: palettes.white,
  },
});

export default Login;
