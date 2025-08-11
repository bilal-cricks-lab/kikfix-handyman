import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../../screens/Splash';
import StackParamList from '../../types/stack';
import SignIn from '../../screens/Auth/SignIn';
import HandymanDashboard from '../../screens/Handyman/dashboard';
import JobAcceptanceSuccess from '../../screens/Handyman/JobAccept';
import CounterOfferScreen from '../../screens/Handyman/CounterOffer';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Serv"
        component={HandymanDashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Success"
        component={JobAcceptanceSuccess}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Counter_Offer' component={CounterOfferScreen} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  );
};

export default StackNav;
