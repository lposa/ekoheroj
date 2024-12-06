import React, {useState, useEffect, useRef} from 'react';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';


import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Keyboard,
    Dimensions,
    View,
    Image,
    Platform,
    TextInput,
} from 'react-native';

``
import {cities} from '@/cities';
import Autocomplete from 'react-native-autocomplete-input';


import MapFilter from "@/components/MapFilter";
import {getLocations} from "@/services/locationService";

const getMarkerDescription = (arr: string[]) => {
    return arr.slice(3, arr.length).join(' ');
};

const latitudeDelta = 0.0156;
const {height, width} = Dimensions.get('window');

const getMarkerColor = (type: number) => {
    const colors: Record<number, string> = {
        1: 'orange',
        2: 'yellow',
        3: 'red',
        4: 'blue',
        5: 'green',
        6: 'purple',
    };

    return colors[type];
};

type FilterType = {
    city: string;
    lat: string;
    lng: string;
    label?: string;
} | { city: string; lat: string; lng: string; label?: undefined; }

const Map = () => {
    const [newLocation, setNewLocation] = useState<Region | undefined>();
    const [filteredCities, setFilteredCities] = useState<FilterType[]>([]);
    const [filteredMarkers, setFilteredMarkers] = useState<string[] | []>([]);
    const [inputText, setInputText] = useState('');
    const [isLocationGranted, setLocationGranted] = useState(false);

    const [filterParam, setFilterParam] = useState('1');
    const mapRef = useRef<MapView>(null);

    const findCity = (query: React.SetStateAction<string>) => {
        setInputText(query);
        if (query) {
            if (typeof query === "string") {
                const newRegex = query
                    .toLowerCase()
                    .replace(/[č,ć]/gi, 'c')
                    .replace(/š/gi, 's')
                    .replace(/ž/gi, 'z');


                const newCities = cities.filter(
                    c => c.city.toLowerCase().search(newRegex) >= 0,
                );
                setFilteredCities(newCities);
            }
        } else {
            setFilteredCities([]);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                let {status} = await Location.requestBackgroundPermissionsAsync()
                setLocationGranted(status === 'granted');
                if (Platform.OS === 'ios') {

                    if (status !== 'granted') {
                        setNewLocation({
                            latitude: 45.25265,
                            longitude: 19.83305,
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: latitudeDelta * (width / height),
                        });
                        return;
                    }
                    let location = await Location.getCurrentPositionAsync({});
                    if (location) {
                        setNewLocation({
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: latitudeDelta * (width / height),
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude,
                        })
                    }

                } else {
                    if (status !== "granted") {
                        let location = await Location.getCurrentPositionAsync({});
                        if (location) {
                            setNewLocation({
                                latitudeDelta: latitudeDelta,
                                longitudeDelta: latitudeDelta * (width / height),
                                longitude: location.coords.longitude,
                                latitude: location.coords.latitude,
                            })
                        }
                    } else {
                        setNewLocation({
                            latitude: 45.25265,
                            longitude: 19.83305,
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: latitudeDelta * (width / height),
                        });
                    }
                }
            } catch (err) {
                console.warn(err);
            }
        })();
    }, []);

    useEffect(() => {
        const init = async () => {
            const locations = await getLocations(filterParam);
            if (locations) {
                setFilteredMarkers(locations);
            }

        };

        init();
    }, [filterParam]);

    if (!isLocationGranted) {
        return (
            <View style={styles.screen}>
                <Text>Niste dozvolili da aplikacija koristi vašu lokaciju.</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={styles.titleContainer}>
                <Image
                    style={styles.imageStyle}
                    source={require('../assets/map_icon.png')}
                />
                <Text style={styles.title}>Mapa</Text>
            </View>
            <View style={{zIndex: 7}}>
                <Autocomplete
                    inputContainerStyle={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={filteredCities as FilterType[]}
                    renderTextInput={() => (
                        <TextInput
                            onChangeText={text => findCity(text)}
                            placeholderTextColor={'#999999'}
                            placeholder="Unesite ime grada"
                            style={styles.inputTextStyle}>
                            {inputText}
                        </TextInput>
                    )}
                    flatListProps={{
                        keyboardShouldPersistTaps: 'always',
                        keyExtractor: item => (item as FilterType)?.city,
                        renderItem: ({item: {city, lng, lat, label}}: { item: FilterType }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    const updatedLocation: Region = {
                                        latitude: +lat,
                                        longitude: +lng,
                                        latitudeDelta: latitudeDelta,
                                        longitudeDelta: latitudeDelta * (width / height),
                                    };
                                    setNewLocation(updatedLocation);
                                    mapRef.current?.animateToRegion(updatedLocation, 4000);
                                    setInputText('');
                                    Keyboard.dismiss();
                                    setFilteredCities([]);
                                }}
                            >
                                <Text style={styles.itemText}>{label ? label : city}</Text>
                            </TouchableOpacity>
                        ),
                    }}
                />
            </View>
            <MapFilter
                setFilteredMarkers={setFilteredMarkers}
                setFilterParam={setFilterParam}
            />
            {newLocation && (
                <>
                    <View style={styles.mapViewContainer}>
                        <MapView
                            ref={mapRef}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={newLocation}
                            showsUserLocation={true}
                            loadingEnabled={true}
                            loadingIndicatorColor="#FF6600"
                            onPress={() => Keyboard.dismiss()}
                            style={styles.mapView}>
                            {filteredMarkers &&
                                filteredMarkers?.map((marker, idx) => {
                                    return (
                                        <Marker
                                            key={idx + marker[0] + ' ' + marker[1]}
                                            coordinate={{
                                                latitude: +marker[1],
                                                longitude: +marker[2],
                                            }}
                                            title="Lokacija"
                                            description={getMarkerDescription(marker)}
                                            pinColor={getMarkerColor(+marker[0])}
                                            opacity={0.8}
                                            rotation={10}
                                            onPress={() => Keyboard.dismiss()}
                                        />
                                    );
                                })}
                        </MapView>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 20,
    },
    imageStyle: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    inputTextStyle: {
        color: '#00405C',
        fontWeight: '600',
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    mapViewContainer: {
        borderWidth: 1,
        borderColor: '#d2d2d2',
        height: '65%',
    },
    mapView: {
        width: '100%',
        height: '100%',
    },
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 16,
        marginTop: 40,
    },
    autocompleteContainer: {
        backgroundColor: 'transparent',
        marginBottom: 0,
        paddingBottom: 0,
        zIndex: -100,
        borderWidth: 0,
        borderRadius: 10,
        flex: 0,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 6,
        margin: 2,
        color: '#00405C',
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
    },

    input: {
        width: '100%',
        marginBottom: 0,
        shadowColor: '#000000',
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    titleContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingLeft: 0,
    },
    title: {
        fontFamily: 'DongleBold',
        fontSize: 24,
        color: '#FF6600',
        fontWeight: '700',
        marginLeft: 10,
    },
});

export default Map;
