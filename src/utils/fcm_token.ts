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

export default requestToken;
