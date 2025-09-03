import React from 'react';
import { Linking, LogBox } from 'react-native';
import './global.css';
import './src/i18n';
import { LanguageProvider } from './src/i18n/LanguageContext';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import StackNav from './src/navigation/StackNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, persistor } from './src/redux/Store/store';
import { Provider } from 'react-redux';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import requestNotificationPermission from './src/utils/notification';

LogBox.ignoreAllLogs();

const NAVIGATION_IDS = ["booking", "chat"];

// 🔹 Build deep link from notification data
function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.notification_type;

  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('🚨 Unverified navigationId', navigationId);
    return null;
  }

  if (navigationId === "booking") {
    const bookingId = data?.id;
    if (typeof bookingId === 'string') {
      const url_booking = `kikfixhandyman://app/booking/${bookingId}`
      console.log(url_booking)
      return url_booking;
    }
    console.error('🚨 Missing bookingId');
    return null;
  }
  if(navigationId === "chat"){
    const id = data?.id;
    if(typeof id === 'string'){
      const url_chat = `kikfixhandyman://app/chat/${id}`;
      console.log(url_chat);
      return url_chat;
    }
    return null;
  }

  return null;
}

// 🔹 Linking config
const linking = {
  prefixes: ['kikfixhandyman://app'],
  config: {
    screens: {
      Serv: 'booking/:bookingId',
      chat: 'chat/:id'
    },
  },
  async getInitialURL() {
    // 1. Check if app was opened by deep link
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }

    // 2. Check if opened from FCM notification (killed state)
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }

    return null;
  },
  subscribe(listener: (url: string) => void) {
    // Handle standard deep links
    const onReceiveURL = ({ url }: { url: string }) => listener(url);
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    // Handle notifications (background -> app open)
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

const InnerApp = () => {
  React.useEffect(() => {
    if (firebase.apps.length > 0) {
      console.log('✅ Firebase is working!');
    }
    requestNotificationPermission();

    // Foreground handling (don’t navigate, just alert/sound)
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('📩 Foreground FCM:', remoteMessage.data);
      // play sound / show in-app banner here
    });

    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <LanguageProvider>
      <NavigationContainer linking={linking}>
        <StackNav />
      </NavigationContainer>
    </LanguageProvider>
  );
};

const App = () => (
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <InnerApp />
    </PersistGate>
  </Provider>
);

export default App;
