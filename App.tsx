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
import { RootSate, Store, persistor } from './src/redux/Store/store';
import { Provider } from 'react-redux';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import requestNotificationPermission from './src/utils/notification';

LogBox.ignoreAllLogs();

const navigationRef = createNavigationContainerRef();

const InnerApp = () => {
  const navigateToChatScreen = () => {
    if (navigationRef.isReady()) {
      // navigationRef.navigate('chat')
    }
  };

  const shouldNavigateToChat = (remoteMessage: any) => {
    const hasChatMessage = remoteMessage.notification?.body || 
                          remoteMessage.data?.body || 
                          remoteMessage.data?.message;
    
    console.log('📩 Notification received:', {
      body: remoteMessage.notification?.body,
      data: remoteMessage.data,
      shouldNavigate: !!hasChatMessage
    });

    return !!hasChatMessage;
  };

  React.useEffect(() => {
    if (firebase.apps.length > 0) {
      console.log('Firebase is working!');
    }
    requestNotificationPermission();

    // Check if app was opened from notification (killed state)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage && shouldNavigateToChat(remoteMessage)) {
          console.log('📩 Opened from killed state - navigating to chat');
          navigateToChatScreen();
        }
      });
  }, []);

  React.useEffect(() => {
    // Foreground message - just show notification, no navigation
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('📩 Foreground FCM message:', remoteMessage);
      // In foreground, you might want to show an in-app notification
      // but not navigate automatically
    });

    // Background -> app open (user tapped notification)
    const unsubscribeBackground = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('📩 Opened from background:', remoteMessage);
      
      if (shouldNavigateToChat(remoteMessage)) {
        console.log('📩 Navigating to chat screen from background');
        navigateToChatScreen();
      }
    });

    // Handle deep links
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      console.log('🔗 Deep link received:', url);
      if (url.includes('chat')) {
        navigateToChatScreen();
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
      linkingSubscription.remove();
    };
  }, []);

  return (
    <LanguageProvider>
      <NavigationContainer
        ref={navigationRef}
        linking={{
          prefixes: ['kikfixhandyman://app'],
          config: {
            screens: {
              Serv: {
                path: 'main/:bookingId',
                parse: {
                  bookingId: bookingId => `${bookingId}`,
                },
              },
              chat: 'chat'
            },
          },
        }}
        onReady={() => {
          // Handle initial URL when app starts
          Linking.getInitialURL().then(url => {
            if (url && url.includes('chat')) {
              navigateToChatScreen();
            }
          });
        }}
      >
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