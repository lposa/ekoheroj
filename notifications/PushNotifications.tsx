import React, {useCallback, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Modal, Pressable, ScrollView, StyleSheet, Text, View,} from 'react-native';


interface Notification {
  title: string;
  body: string;
}

interface PushNotificationProps {
  pushNotification?: {
    notification: Notification;
  };
}

const PushNotifications: React.FC<PushNotificationProps> = ({ pushNotification }) => {
  const [notTitle, setNotTitle] = useState('');
  const [notText, setNotText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const requestUserPermission = useCallback(async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      // TEST
      return messaging().onMessage(async remoteMessage => {
        const title = remoteMessage?.notification?.title;
        const body = remoteMessage?.notification?.body;
        if(title && body) {
          setNotText(body);
          setNotTitle(title);
          setModalVisible(true);
        }
      });
    }
  }, []);

  // @ts-ignore
  useEffect(() => {
    const unsubscribe = requestUserPermission();

    if (pushNotification?.notification?.title) {
      setNotTitle(pushNotification?.notification?.title);
      setNotText(pushNotification?.notification?.body);
      setModalVisible(true);
    }

    return unsubscribe;
  }, [pushNotification, requestUserPermission]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.wrapper}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{notTitle}</Text>
            <ScrollView style={{ height: '90%' }}>
              <Text style={styles.modalText}>{notText}</Text>
            </ScrollView>
            <Pressable
              style={[styles.closeBtn]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.btnText}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    position: 'absolute',
    left: '5%',
    top: '10%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    height: '50%',
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalView: {
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#FF6600',
  },
  modalText: {
    fontSize: 16,
    color: '#00405C',
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#00405C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    width: 30,
    height: 22,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default PushNotifications;
