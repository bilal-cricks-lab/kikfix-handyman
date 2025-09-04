import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const requestToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('user_token');
    console.log(token);
    return token || '';
  } catch (error) {
    console.error('Error getting auth token:', error);
    return '';
  }
};
