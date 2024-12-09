import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {Drawer} from "expo-router/drawer";
import React from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';
import LogoTitle from "@/components/LogoTitle";

import {GestureHandlerRootView, Pressable} from "react-native-gesture-handler";
import {StyleSheet, Text} from "react-native";
import {fetchLocations} from "@/services/locationService";
import {usePushNotifications} from "@/notifications/usePushNoticiations";
import {DrawerContentComponentProps, DrawerContentScrollView} from "@react-navigation/drawer";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        DongleRegular: require("../assets/fonts/Dongle-Regular.ttf"),
        DongleBold: require("../assets/fonts/Dongle-Bold.ttf"),
    });
    const {expoPushToken, notification} = usePushNotifications();

    const data = JSON.stringify(notification, undefined, 2);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
            } catch (e) {
                console.warn(e);
            }
        }

        prepare();
    }, []);


    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }

        //PUSH NOTIFICATIONS TEST - take the expoPushToken data and use it with expos push notification tool to test
        /*console.log("expo push token",expoPushToken?.data)
        console.log(data)*/
        fetchLocations();
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const CustomDrawerContent = (props: DrawerContentComponentProps) => {
        return (
            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
                <Pressable
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('index')}
                >
                    <Text style={styles.drawerButtonText}>Početna</Text>
                </Pressable>

                <Pressable
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('MoreAboutActions')}
                >
                    < Text style={styles.drawerButtonText}>Novosti</Text>
                </Pressable>

                <Pressable
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('EmailForm')}
                >
                    <Text style={styles.drawerButtonText}>Prijavi problem</Text>
                </Pressable>

                <Pressable
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('Map')}
                >
                    <Text style={styles.drawerButtonText}>Mapa</Text>
                </Pressable>

                <Pressable
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('TermsConditions')}
                >
                    <Text style={styles.drawerButtonText}>Uslovi korišćenja</Text>
                </Pressable>

                <Pressable
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('AboutUs')}
                >
                    <Text style={styles.drawerButtonText}>O nama</Text>
                </Pressable>
            </DrawerContentScrollView>
        );
    };

    return (
        <RootSiblingParent>
            <GestureHandlerRootView style={{flex: 1}}>
                <Drawer
                    drawerContent={(props) => <CustomDrawerContent {...props}/>}
                    screenOptions={{
                        headerTitleAlign: 'center',
                        drawerStyle: {
                            backgroundColor: '#00405C',
                        },
                        headerTintColor: '#83C683',
                        drawerActiveTintColor: 'white',
                        drawerInactiveTintColor: 'white',
                    }}>
                        <Drawer.Screen
                            name="index"
                            options={{
                                headerTitle: () => <LogoTitle/>,
                                drawerLabel: "Početna",
                            }}
                        />
                        <Drawer.Screen
                            name="MoreAboutActions"
                            options={{
                                headerTitle: () => <LogoTitle/>,
                                drawerLabel: "Novosti",
                            }}
                        />
                        <Drawer.Screen
                            name="EmailForm"
                            options={{
                                headerTitle: () => <LogoTitle/>,
                                drawerLabel: "Prijavi problem",
                            }}
                        />
                        <Drawer.Screen
                            name="Map"
                            options={{
                                headerTitle: () => <LogoTitle/>,
                                drawerLabel: "Mapa",
                            }}
                        />
                        <Drawer.Screen
                            name="TermsConditions"
                            options={{
                                headerTitle: () => <LogoTitle/>,
                                drawerLabel: "Uslovi korišćenja",
                            }}
                        />
                        <Drawer.Screen
                            name="AboutUs"
                            options={{
                                headerTitle: () => <LogoTitle/>,
                                drawerLabel: "O nama",
                            }}
                        />
                </Drawer>
            </GestureHandlerRootView>
        </RootSiblingParent>
    );
}


const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#00405C',
        paddingVertical: 10,
    },
    drawerButton: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#83C683',
    },
    drawerButtonText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'DongleRegular',
    },
});
