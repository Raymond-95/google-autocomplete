import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage'
import { NavigationService } from 'services/navigation/NavigationService';

export interface BiometricResponse {
    biometricEnabled: boolean
    verified: boolean
}

const rnBiometrics = new ReactNativeBiometrics();

export const registerBiometric = async (email: string, password: string) => {

    const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();

    // Biometrics is a generic type for Android only
    if (!available || biometryType !== BiometryTypes.Biometrics) {
        Alert.alert('Opps!', 'Face ID is not available on this device.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => NavigationService.navigate('Home') },
        ]);
        return;
    }

    if (available && biometryType === BiometryTypes.Biometrics) {
        Alert.alert(
            'Biometric',
            'Would you like to enable biometric authentication for the next time?',
            [
                { text: 'Cancel', style: 'cancel', onPress: () => NavigationService.navigate('Home') },
                {
                    text: 'Yes',
                    onPress: async () => {
                        // generate a signed key
                        const { publicKey } = await rnBiometrics.createKeys();

                        // save `credential` and `publicKey` in the local storage to use it during Face ID authentication
                        // as this is for demo purpose only
                        // public key supposed to store in server side
                        try {
                            await EncryptedStorage.setItem(
                                "credentials",
                                JSON.stringify({
                                    userid: email,
                                    password: password,
                                    publicKey: publicKey
                                })
                            );

                            NavigationService.navigate('Home')
                        } catch (error) {
                            Alert.alert(error.message)
                        }
                    },
                }
            ],
        );
    }
}

export const unlockWithBiometric = () => {

    return new Promise(async (resolve, reject) => {
        try {
            // get stored data
            // it will be verified across server side for the signed adata
            const credentials = await EncryptedStorage.getItem("credentials");

            if (credentials) {
                const { success } = await rnBiometrics.simplePrompt({
                    promptMessage: 'Confirmation',
                });

                if (success) {
                    resolve({
                        biometricEnabled: true,
                        verified: true
                    })
                }
                else {
                    // biometric is enabled for the app but failed to verify
                    resolve({
                        biometricEnabled: true,
                        verified: false
                    })
                }
            }
            else {
                // biometric is not enable for the app
                resolve({
                    biometricEnabled: false,
                    verified: false
                })
            }
        } catch (error) {
            // return error
            reject(error)
        }

    })
}