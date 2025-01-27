import React, {useEffect, useRef, useState} from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Toast from 'react-native-root-toast';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);

    const resetForm = () => {
        setEmail('');
        setMessage('');
    }

    useEffect(() => {
        async function checkAvailability() {
            const isMailAvailable = await MailComposer.isAvailableAsync();
            setIsAvailable(isMailAvailable)
        }

        checkAvailability();
    }, [])

    const showToasts = (text: string) => {
        if (Platform.OS === "ios") {
            Toast.show(text, {duration: Toast.durations.LONG})
        } else {
            ToastAndroid.show(text, ToastAndroid.LONG)
        }
    }

    function sendEmailTest() {
        if (isAvailable) {
            MailComposer.composeAsync({
                subject: 'Kontakt',
                body: `<h3>Poruka: ${message}</h3>`,
                ccRecipients: [''],
                bccRecipients: [''],
                isHtml: true,
                recipients: ["cepomdoosmehaekoheroj@gmail.com"],
            }).then(() => {
                showToasts("Email poslat!")
                resetForm();
            }).catch(() => showToasts('Greška! Pokušajte ponovo.'))
        }
    }


    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.titleContainer}>
                    <Image
                        style={{width: 42, height: 42}}
                        source={require('../assets/report-problem-icon.png')}
                    />
                    <Text style={styles.title}>Kontaktiraj nas</Text>
                </View>
                <View>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'#999999'}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                        value={email}
                    />
                    <TextInput
                        placeholder="Poruka"
                        multiline={true}
                        onChangeText={text => setMessage(text)}
                        value={message}
                        numberOfLines={6}
                        maxLength={300}
                        placeholderTextColor={'#999999'}
                        style={[styles.input, styles.multilineInput]}
                    />
                    <TouchableOpacity style={[styles.submitBtn]} onPress={sendEmailTest}>
                        <Text style={styles.submitBtnText}>Pošalji</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        display: 'flex',
//         alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: {
        borderColor: 'transparent',
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        fontSize: 24,
        borderRadius: 8,
        fontFamily: 'DongleRegular',
        backgroundColor: '#fff',
        color: '#00405C',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.6,
        shadowRadius: 4.65,
        elevation: 2,
        height: 50,
        textAlignVertical: 'center',
    },
    multilineInput: {
        textAlignVertical: 'top',
        height: 200
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'DongleRegular',
        color: '#999999',
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        backgroundColor: '#83C683',
        borderRadius: 30,
        marginBottom: 20,
        padding: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 26,
        fontFamily: 'DongleBold',
    },
    buttonsContainer: {
        display: 'flex',
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cameraBtn: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4.65,
        elevation: 2,
    },
    btnContainer: {
        display: 'flex',
        width: '80%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageNamesContainer: {
        backgroundColor: '#FF6600',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        marginBottom: 10,
        borderRadius: 30,
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    imageNames: {
        width: '80%',
        color: '#fff',
        fontFamily: 'DongleRegular',
        fontSize: 22,
    },
    titleContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingVertical: 20,
    },
    title: {
        fontFamily: 'DongleBold',
        fontSize: 24,
        color: '#FF6600',
        fontWeight: '700',
        marginLeft: 10,
    },
    camera: {
        flex: 1,
        position: 'relative',
        zIndex: 999,
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    cameraTakePic: {
        position: 'relative',
        width: 100,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: 20,
    },
    cameraText: {
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'uppercase',
        fontFamily: "DongleBold"
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        textTransform: 'uppercase',
        fontFamily: "DongleBold",
        height: 20
    }
});


export default ContactUs;
