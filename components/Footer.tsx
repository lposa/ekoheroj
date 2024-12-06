import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Podržano od Čepom do osmeha</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: '#00405C',
    color: 'white',
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  text: {
    fontFamily: 'DongleRegular',
    fontSize: 24,
    lineHeight: 28,
    color: 'white',
  },
});

export default Footer;
