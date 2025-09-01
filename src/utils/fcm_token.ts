import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const requestToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const getAuthToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem('user_token');
    console.log(token);
    return token || '';
  } catch (error) {
    console.error('Error getting auth token:', error);
    return '';
  }
};

export {
  requestToken,
  getAuthToken
};
