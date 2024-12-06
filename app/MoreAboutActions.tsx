import React, { useEffect, useState, useCallback } from 'react';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import {
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Linking
} from 'react-native';
import { gStyle } from '@/global-css';


const MoreAboutActions = () => {
  const [html, setHtml] = useState({ html: '' });
  const url = process.env.EXPO_PUBLIC_PULL_NOTIFICATIONS_URL;
  useEffect(() => {
    if (process.env.DEBUG) {
      console.log('Url za notifikacije: ', url);
    }
    getNotification();
  }, []);

  const getNotification = useCallback(async () => {
    try {
      const response = await fetch(url as string);
      if (response.ok) {
        const data = await response.text();
        setHtml({ html: data });
      }
    } catch (error) {
      if (process.env.DEBUG) {
        console.warn(error);
      }
    }
  }, []);
  const onPress = (evt: any, href: string) => {
    Linking.openURL(href);
  };
  const { width } = useWindowDimensions();
  return (
    <ScrollView style={(gStyle.screen, styles.htmlContainer)}>
      <RenderHtml
        contentWidth={width}
        source={html}
        baseStyle={styles.html}
        tagsStyles={tagsStyles}
        systemFonts={systemFonts}
        renderersProps={{ a: { onPress } }}
      />
    </ScrollView>
  );
};

const systemFonts = [...defaultSystemFonts, 'DongleRegular', 'DongleBold'];

const tagsStyles = {
  a: {
    fontFamily: 'DongleRegular',
    color: '#83C683',
    lineHeight: 26,
    fontSize: 24,
  },
};

const styles = StyleSheet.create({
  html: {
    fontFamily: 'DongleRegular',
    color: '#00405C',
    fontSize: 24,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
  },
  htmlContainer: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default MoreAboutActions;
