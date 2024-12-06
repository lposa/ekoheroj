import AsyncStorage from '@react-native-async-storage/async-storage';
import { readRemoteFile } from 'react-native-csv';

export const getLocations = async type => {
  let locationsString = await AsyncStorage.getItem(type);
  if (locationsString !== null) {
    // Parse JSON string back to JavaScript object
    return JSON.parse(locationsString);
  }

  await fetchLocations();
  locationsString = await AsyncStorage.getItem(type);
  return locationsString ? JSON.parse(locationsString) : null;
};

export const fetchLocations = async () => {
  readRemoteFile(process.env.EXPO_PUBLIC_LOCATION_URL, {
    complete: async results => {
      // Store each type as a stringified JSON
      for (let typeId = 1; typeId <= 6; typeId++) {
        const filteredData = results.data.filter(marker => marker[0] === typeId.toString());
        await AsyncStorage.setItem(
            typeId.toString(),
            JSON.stringify(filteredData)
        );
      }
    }
  });
};


/*export const getLocations = async type => {
  let locations = await AsyncStorage.getItem(type);
  console.log(type, locations)
  if (locations !== null) {
    return locations;
  }

  await fetchLocations();
  locations = await AsyncStorage.getItem(type);

  return locations;
};

export const fetchLocations = async () => {
  const expirationTime = 12 * 60 * 60;

  const expire = JSON.stringify({expiryTime:expirationTime})

  readRemoteFile("https://cepomdoosmeha.org.rs/lokacije.csv", {
    complete: results => {
      AsyncStorage.setItem(
        '1',
        results.data.filter(marker => marker[0] === '1'),
      );
      AsyncStorage.setItem(
        '2',
        results.data.filter(marker => marker[0] === '2'),
      );
      AsyncStorage.setItem(
        '3',
        results.data.filter(marker => marker[0] === '3'),
      );
      AsyncStorage.setItem(
        '4',
        results.data.filter(marker => marker[0] === '4'),
      );
      AsyncStorage.setItem(
        '5',
        results.data.filter(marker => marker[0] === '5'),
      );
      AsyncStorage.setItem(
        '6',
        results.data.filter(marker => marker[0] === '6'),
      );
    },
  });
};*/


