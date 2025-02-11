import React, {useEffect, useRef, useState} from 'react';
import {
    Image, Modal,
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
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import * as MailComposer from 'expo-mail-composer';
import Toast from 'react-native-root-toast';
import {Camera, CameraView, useCameraPermissions} from "expo-camera";
import {Asset} from "react-native-image-picker";

type ImagePathsType = {
    path: string;
    uri: string;
    type: string;
}[]

const EmailForm = () => {
    const [uploadedImageNames, setUploadedImageNames] = useState<string[] | []>([]);
    const [uploadedImagePaths, setUploadedImagePaths] = useState<ImagePathsType | []>([]);
    const [nameLastname, setNameLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

    let cameraRef = useRef<CameraView>(null);


    const resetForm = () => {
        setNameLastname('');
        setPhone('');
        setDescription('');
        setUploadedImageNames([]);
        setUploadedImagePaths([]);
    }

    useEffect(() => {
        const checkPermission = async () => {
            const {status} = await Camera.getCameraPermissionsAsync();

            if (status === 'granted') {
                setHasCameraPermission(true);
            } else if (status === 'undetermined') {
                const permissionResponse = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(permissionResponse.status === 'granted');
            } else {
                setHasCameraPermission(false);
            }
        };

        checkPermission();
    }, []);

    useEffect(() => {
        async function checkAvailability() {
            const isMailAvailable = await MailComposer.isAvailableAsync();
            setIsAvailable(isMailAvailable)
        }

        checkAvailability();
    }, [])

    const toggleImagePickerTwo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true
        });

        if (!result.canceled) {
            setImageStates(result?.assets)
        }
    }


    const toggleCamera = () => {
        if (hasCameraPermission) {
            setShowCamera(true);
        }
    };

    const takeAndSaveImage = async () => {
        const image = await cameraRef.current?.takePictureAsync({quality: 1, base64: true, exif: false});
        if (image) {
            let arr = [];
            arr.push(image)
            setImageStates(arr);
        }
        setShowCamera(false);
        showToasts('Slikanje uspešno!');
    }


    const setImageStates = (assets: ImagePickerAsset[] | Asset[]) => {
        let uploadedImages = assets;
        let imageNames = uploadedImages
            .map(element => element.fileName || "UserTakenImage")
            .concat(uploadedImageNames);
        let imagePaths = uploadedImages
            .map(element => ({
                path: element?.uri || "",
                uri: element?.uri || "",
                type: element?.type || "",
            }))
            .concat(uploadedImagePaths);

        if (!imageNames || !imagePaths) return null;

        setUploadedImageNames(imageNames as string[]);
        setUploadedImagePaths(imagePaths);
    };


    const showToasts = (message: string) => {
        if (Platform.OS === "ios") {
            Toast.show(message, {duration: Toast.durations.LONG})
        } else {
            ToastAndroid.show(message, ToastAndroid.LONG)
        }
    }

    function sendEmailTest() {
        if (isAvailable) {
            const paths = uploadedImagePaths
                .map(path => path.uri)
                .filter((uri): uri is string => uri !== undefined);

            MailComposer.composeAsync({
                subject: 'Prijavi problem',
                body: `<h3>Ime i prezime: ${nameLastname}</h3>
          <h3>Kontakt telefon: ${phone}</h3>
          <h3>Opis: ${description}</h3>`,
                ccRecipients: [''],
                bccRecipients: [''],
                isHtml: true,
                recipients: ["cepomdoosmehaekoheroj@gmail.com"],
                attachments: [...paths || []],
            }).then(() => {
                showToasts("Email poslat!")
                resetForm();
            }).catch(() => showToasts('Greška! Pokušajte ponovo.'))
        }

    }

    const removeImage = (key: number) => {
        const modifiedImageNames = uploadedImageNames?.filter(
            (element, index) => index !== key,
        );
        setUploadedImageNames(modifiedImageNames);
        const modifiedImagePaths = uploadedImagePaths?.filter(
            (element, index) => index !== key,
        );
        setUploadedImagePaths(modifiedImagePaths);
    };


    return (
        <SafeAreaView>
            <Modal visible={showCamera}>
                <CameraView ref={cameraRef} style={styles.camera}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setShowCamera(false)}>
                        <Text>Zatvori</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takeAndSaveImage} style={styles.cameraTakePic}>
                        <Text style={styles.cameraText}>Slikaj</Text>
                    </TouchableOpacity>
                </CameraView>
            </Modal>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.titleContainer}>
                    <Image
                        style={{width: 42, height: 42}}
                        source={require('../assets/report-problem-icon.png')}
                    />
                    <Text style={styles.title}>Prijavi problem</Text>
                </View>
                <View>

                    <TextInput
                        placeholder="Ime i prezime"
                        placeholderTextColor={'#999999'}
                        onChangeText={text => setNameLastname(text)}
                        style={styles.input}
                        value={nameLastname}
                    />
                    <TextInput
                        placeholder="Kontakt telefon"
                        style={styles.input}
                        placeholderTextColor={'#999999'}
                        onChangeText={text => setPhone(text)}
                        keyboardType="numeric"
                        value={phone}
                    />
                    <TextInput
                        placeholder="Opis"
                        multiline={true}
                        onChangeText={text => setDescription(text)}
                        value={description}
                        numberOfLines={6}
                        maxLength={300}
                        placeholderTextColor={'#999999'}
                        style={[styles.input, styles.multilineInput]}
                    />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.input, styles.btnContainer]}
                            onPress={toggleImagePickerTwo}>
                            <Text style={styles.buttonText}>+ Dodaj slike</Text>
                            <Image
                                style={{width: 28, height: 28}}
                                source={require('../assets/gallery.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cameraBtn]} onPress={toggleCamera}>
                            <Image
                                style={{width: 30, height: 30, resizeMode: 'contain'}}
                                source={require('../assets/camera.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    {uploadedImageNames?.map((name, index) => (
                        <View style={styles.imageNamesContainer} key={index}>
                            <Text style={styles.imageNames} numberOfLines={1}>
                                {name}
                            </Text>
                            <TouchableOpacity onPress={() => removeImage(index)}>
                                <Image
                                    style={{width: 35, height: 35}}
                                    source={require('../assets/minus.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={[styles.submitBtn]} onPress={sendEmailTest}>
                        <Text style={styles.submitBtnText}>Prijavi</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    scrollView: {
        display: 'flex',
        alignItems: 'center',
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
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "DongleBold"
    }

});

export default EmailForm;
