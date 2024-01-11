declare module 'react-native-config' {
    export interface NativeConfig {
        API_BASE_URL: string;
        // google configurations
        GOOGLE_API_BASE_URL: string;
        GOOGLE_API_API_KEY: string;
    }

    export const BuildConfig: NativeConfig
    export default Config
}