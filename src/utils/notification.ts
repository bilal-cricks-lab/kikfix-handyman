import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import requestToken from './fcm_token';

const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        // Android 13+ → Ask runtime permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('✅ Notification permission granted (Android 13+)');
          requestToken();
        } else {
          console.log('❌ Notification permission denied (Android 13+)');
        }
      } else {
        // Android 12 and below → No runtime permission needed
        console.log('ℹ️ Android <13: Notifications auto-granted');
        requestToken();
      }
    } else if (Platform.OS === 'ios') {
      // iOS requires asking the user
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
