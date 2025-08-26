import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import requestToken from './fcm_token';

const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      // ✅ Android 13+ (API level 33) requires runtime permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('✅ Notification permission granted (Android)');
        requestToken();
      } else {
        console.log('❌ Notification permission denied (Android)');
      }
    } else if (Platform.OS === 'ios') {
      // ✅ iOS request permission
      const authStatus = await messaging().requestPermission({
        alert: true,
        announcement: true,
        badge: true,
        carPlay: true,
        provisional: false,
        sound: true,
      });

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('✅ Notification permission granted (iOS)');
        requestToken();
      } else {
        console.log('❌ Notification permission denied (iOS)');
      }
    }
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
  }
};

export default requestNotificationPermission;