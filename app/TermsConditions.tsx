import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const TermsConditions = () => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Uslovi korišćenja</Text>
        <Text style={styles.text}>
          Ekoheroj obavezuje da će poštovati anonimnost i privatnost korisnika
          aplikacije. Ekoheroj može prikupljati lične podatke korisnika, kao što
          su ime, adresa, telefonski broj ili imejl adresa, samo ako ih korisnik
          dobrovoljno dostavi aplikaciji Ekoheroj.
        </Text>
        <Text style={styles.text}>
          Pod dobrovoljnim dostavljanjem podataka u smislu ove aplikacije smatra
          se popunjavanje i slanje imejl forme Dostavljene informacije će biti
          korišćene isključivo u svrhu obaveštavanja korisnika ukoliko je
          prijavio problem a u vezi sa ishodom rešavanja problema. Ekoheroj
          navedene podatke neće učiniti dostupnim bilo kojoj trećoj strani.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 10,
  },
  textContainer: {
    marginHorizontal: 30,
  },
  heading: {
    fontFamily: 'DongleBold',
    fontSize: 24,
    color: '#83C683',
    textAlign: 'left',
    width: '100%',
    marginBottom: 15,
    marginTop: 20,
  },
  text: {
    fontFamily: 'DongleRegular',
    color: '#00405C',
    fontSize: 28,
    lineHeight: 24,
    marginBottom: 20,
    paddingTop: 10,
  },
});

export default TermsConditions;
