import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import logo from '../assets/eko_heroj_logo.png'

const LogoTitle = () => {
  return (
    <View style={styles.logoContainer}>
        <Image style={styles.logoImage} source={logo}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
    logoContainer: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    logoImage: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    }
});

export default LogoTitle;