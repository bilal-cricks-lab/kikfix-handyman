import AsyncStorage from '@react-native-async-storage/async-storage';
import Echo, { Broadcaster } from 'laravel-echo';
import Pusher from 'pusher-js/react-native';

// Ensure Buffer is available

// Async token fetcher
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('user_token');
    return token || '';
  } catch (error) {
    console.error('Error getting auth token:', error);
    return '';
  }
};

// Echo instance factory (async because token is needed)
export const createEcho = async () => {
  const token = await getAuthToken();

  const echo = new Echo<keyof Broadcaster>({
    broadcaster: 'pusher',
    key: 'd8f959cdefeb458660a2', // 🔑 your pusher key
    cluster: 'ap2',
    forceTLS: true,
    client: new Pusher('d8f959cdefeb458660a2', {
      cluster: 'ap2',
      forceTLS: true,
      authEndpoint: 'https://kikfix-com.stackstaging.com/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    channelAuthorization: {
        headers: {
            Authorization: `Berear ${token}`,
        },
        endpoint: '/broadcasting/auth',
        transport: 'ajax',
    }
    }),

    // Laravel Echo authorizer override
    authorizer: (channel, options) => {
      return {
        authorize: async (socketId, callback) => {
          try {
            const response = await fetch('https://kikfix-com.stackstaging.com/broadcasting/auth', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                socket_id: socketId,
                channel_name: channel.name,
              }),
            });

            console.log("Response", response)
            const data = await response.json();

            if (data.auth) {
            } else {
              console.error('Auth failed:', data);
            }
          } catch (error) {
            console.error('Auth error:', error);
          }
        },
      };
    },
  });

  return echo;
};
