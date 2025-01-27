import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';

const AboutUs = () => {
  const handleLinkPress = () => {
    Linking.openURL('https://cepomdoosmeha.org.rs/');
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>O nama</Text>
        <Text style={styles.text}>
          Humanitarno ekološka organizacija "Čepom do osmeha" osnovana je 2014.
          godine u cilju širenja empatije i solidarnosti prema deci sa smetnjama
          u razvoju i prema našoj planeti Zemlji kroz očuvanje životne sredine.
          Plastični čep je samo jedan simbol kao pokretač pozitivne energije
          koja je povela entuzijaste na ovaj humani put, a danas pretvorila u
          priznatu Najbolju dugoročnu volontersku akciju u Srbiji.
        </Text>
        <Text style={styles.text}>
          Aplikacija "Ekoheroj" je na raspolaganju svima koji žele da učestvuju
          u očuvanju naše planete, a ujedno učine dobro i humano delo. U okviru
          aplikacije korisnici imaju mogućnost da vide sve objekte gde mogu
          predati plastične čepove i ostali reciklabilni materijal- papir,
          limenke, pet ambalažu, staklo i biootpad, ali i da sami označe i
          prijave drugima ekološki opasne situacije i katastrofe, sve što
          narušava našu prirodnu sredinu i okolinu. Jednostavno, jednim klikom,
          ova aplikacija vam omogućava da postanete Ekoheroj, jer Ekoheroju je
          uvek na pameti briga o našoj planeti.
        </Text>
        <Text style={styles.text}>
          Poseti nas na sajtu{' '}
          <Text style={styles.link} onPress={handleLinkPress}>
            https://cepomdoosmeha.org.rs/
          </Text>
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
  link: {
    fontFamily: 'DongleRegular',
    color: '#1E90FF',
    fontSize: 28,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default AboutUs;
