require('dotenv').config();

export default ({ config }) => ({
    expo: {
        name: "Ekoheroj",
        slug: "ecohero",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/eko-heroj-icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        splash: {
            backgroundColor: "#00405C",
            image: "./assets/eko_heroj_logo.png",
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.ecohero",
            config: {
                googleMapsApiKey: process.env.EXPO_GOOGLE_API_KEY, // API Key from environment variables
            },
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/eko-heroj-icon.png",
                backgroundColor: "#00405C",
            },
            permissions: [
                "android.permission.CAMERA",
                "android.permission.RECORD_AUDIO",
            ],
            package: "com.ecohero",
            googleServicesFile: "./google-services.json",
            config: {
                googleMaps: {
                    apiKey: process.env.EXPO_GOOGLE_API_KEY, // API Key from environment variables
                },
            },
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/eko-heroj-icon",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/eko_heroj_logo.png",
                    resizeMode: "contain",
                    backgroundColor: "#00405C",
                },
            ],
            [
                "expo-camera",
                {
                    cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
                    microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
                    recordAudioAndroid: true,
                },
            ],
            [
                "expo-location",
                {
                    locationAlwaysAndWhenInUsePermission:
                        "Allow $(PRODUCT_NAME) to use your location.",
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: "d4b5af98-340b-4211-ab63-477270af62d7",
            },
        },
    },
});
