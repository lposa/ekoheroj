import {useState, useEffect, useRef} from 'react'

import * as Device from 'expo-device'
import * as Notification from "expo-notifications"

import Constants from "expo-constants"

import {Platform} from "react-native";


export interface PushNotificationState {
    notification?: Notification.Notification
    expoPushToken?: Notification.ExpoPushToken
}

export const usePushNotifications = (): PushNotificationState => {
    Notification.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: false
        })
    })

    const [expoPushToken, setExpoPushToken] = useState<Notification.ExpoPushToken | undefined>()
    const [notification, setNotification] = useState<Notification.Notification | undefined>();

    const notificationListener = useRef<Notification.EventSubscription>()
    const responseListener = useRef<Notification.EventSubscription>()

    async function registerForPushNotificationAsync() {
        let token;

        if (Device.isDevice) {
            const {status: existingStatus} = await Notification.getPermissionsAsync();

            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const {status} = await Notification.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                alert("Failed to get push token")
            }

            token = await Notification.getExpoPushTokenAsync({
                projectId: Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
            });

            console.log("project id",Constants?.expoConfig?.extra?.eas?.projectId)

            if (Platform.OS === 'android') {
                Notification.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notification.AndroidImportance.HIGH,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#00405C"
                })
            }

            return token;

        } else {
            console.log("ERROR: Please use a physical device")
        }
    }

    useEffect(() => {
        registerForPushNotificationAsync().then(token => {
            setExpoPushToken(token)
        })

        notificationListener.current = Notification.addNotificationReceivedListener(notification => {
            setNotification(notification)
        })

        responseListener.current = Notification.addNotificationResponseReceivedListener(response => {
            console.log(response)
        })

        return () => {
            Notification.removeNotificationSubscription(notificationListener.current!)
            Notification.removeNotificationSubscription(responseListener.current!)
        }
    }, [])

    return {
        expoPushToken,
        notification
    }

}
