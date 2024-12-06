import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import mapeIcon from "../assets/mape_icon.png";
import problemIcon from '../assets/prijavi_problem_icon.png';
import mapeBgImg from '../assets/mape_bg_img.png';
import problemBgImg from '../assets/prijavi_problem_bg_img.png';
import {useNavigation} from "expo-router";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type RootStackParamList = {
    EmailForm: undefined;
    Map: undefined;
    AboutUs: undefined;
    index: undefined;
    MoreAboutActions: undefined;
    TermsConditions:undefined
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


const Index = (props: { navigation: { dispatch: (arg0: any) => void; navigate: (arg0: string) => any; }; }) => {

    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={styles.screen}>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Dobro došli,</Text>

                <Text style={styles.text}>
                    Jednim klikom ova aplikacija Vam omogućava da postanete EKO heroj!
                    Prijavom ekološkog problema i odlaganjem reciklabilnog materijala
                    doprinosite čistijoj i zdravijoj životnoj sredini!
                </Text>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.imgContainer}
                    onPress={() => navigation.navigate("EmailForm")
                    }>
                    <ImageBackground
                        source={problemBgImg}
                        style={[styles.img, styles.img1]}>
                        <Image style={styles.icon1} source={problemIcon} />
                        <Text style={styles.imgText}>Prijavi problem</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.imgContainer}
                    onPress={() =>
                        navigation.navigate("Map")
                    }>
                    <ImageBackground source={mapeBgImg} style={[styles.img, styles.img2]}>
                        <Image style={styles.icon2} source={mapeIcon} />
                        <Text style={styles.imgText}>Mapa</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 10,
    },
    textContainer: {
        marginHorizontal: 30,
    },
    heading: {
        fontFamily: 'DongleBold',
        fontSize: 36,
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
    container: {
        flexDirection: 'row',
        flex: 0.9,
        marginHorizontal: 10,
    },
    img: {
        overflow: 'hidden',
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        flex: 1,
    },
    img1: {
        borderTopLeftRadius: 22,
    },
    img2: {
        borderTopRightRadius: 22,
    },
    icon1: {
        width: 50,
        height: 50,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    icon2: {
        width: 35,
        height: 35,
        marginLeft: 15,
        marginBottom: 5,
        resizeMode: 'contain',
    },
    imgContainer: {
        marginRight: 5,
        flex: 1,
    },
    imgText: {
        fontFamily: 'DongleRegular',
        color: 'white',
        fontSize: 30,
        marginBottom: 20,
        width: '100%',
        textAlign: 'left',
        marginLeft: 15,
    },
});

export default Index;
