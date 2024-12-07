import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {Drawer} from "expo-router/drawer";
import React from 'react';
import LogoTitle from "@/components/LogoTitle";
import {RootSiblingParent} from 'react-native-root-siblings';

import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";
import {fetchLocations} from "@/services/locationService";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [pushNotification, setPushNotification] = useState({});
    const [loaded] = useFonts({
        DongleRegular: require("../assets/fonts/Dongle-Regular.ttf"),
        DongleBold: require("../assets/fonts/Dongle-Bold.ttf"),
    });

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
        fetchLocations();
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    //TODO: Custom implementation of navigation items in case of bugs, add drawerContent={(props) => <CustomDrawerContent {...props}/>} to Drawer as a prop
    /*const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
                <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('index')}
                >
                    <Text style={styles.drawerButtonText}>Početna</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('MoreAboutActions')}
                >
                    <Text style={styles.drawerButtonText}>Novosti</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('EmailForm')}
                >
                    <Text style={styles.drawerButtonText}>Prijavi problem</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('Map')}
                >
                    <Text style={styles.drawerButtonText}>Mapa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('TermsConditions')}
                >
                    <Text style={styles.drawerButtonText}>Uslovi korišćenja</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => props.navigation.navigate('AboutUs')}
                >
                    <Text style={styles.drawerButtonText}>O nama</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
        );
    };*/

    return (
        <RootSiblingParent>
            <GestureHandlerRootView style={{flex: 1}}>
                <Drawer
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
        fontSize: 18,
        fontFamily: 'DongleRegular',
    },
});
