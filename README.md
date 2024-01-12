# react-native-google-autocomplete (Tested in Android ONLY)

Integrated with  [**react-native-biometrics**](https://www.npmjs.com/package/react-native-biometrics) for login

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Add google api key (Should have stored in server side - for development purpose ONLY)

Set your own google api key to GOOGLE_API_API_KEY in .env file

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Video Example

At 00:12, the application requests the activation of biometrics, causing a delay in the process. Subsequently, at 00:36, the app initiates a prompt for fingerprint scanning.

https://github.com/Raymond-95/google-autocomplete/assets/24829391/5cc392a5-a636-4859-bf20-4473e23f9864


