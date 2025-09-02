import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../../screens/Splash';
import StackParamList from '../../types/stack';
import SignIn from '../../screens/Auth/SignIn';
import HandymanDashboard from '../../screens/Handyman/dashboard';
import JobAcceptanceSuccess from '../../screens/Handyman/JobAccept';
import CounterOfferScreen from '../../screens/Handyman/CounterOffer';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/storage';
import Chat from '../../screens/Handyman/Chat';
import Notification from '../../screens/Handyman/Notification';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNav = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getItem('user_token'); // Replace with your token storage method
        setInitialRoute(token ? 'Serv' : 'SignIn');
      } catch (error) {
        console.error('Error checking auth:', error);
        setInitialRoute('SignIn');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading || initialRoute === null) {
    return null;
  }

  
  return (
    <Stack.Navigator initialRouteName={initialRoute as keyof StackParamList}>
      {initialRoute === 'SignIn' && (
        <>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Stack.Screen
        name="Serv"
        component={HandymanDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Success"
        component={JobAcceptanceSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Counter_Offer"
        component={CounterOfferScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
