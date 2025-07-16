import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../../screens/Splash';
import StackParamList from '../../types/stack.types';
import SignIn from '../../screens/Auth/SignIn';
import CustomerDashboard from '../../screens/Customer/dasboard';
import HandymanDashboard from '../../screens/Handyman/dashboard';

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
        name="Boarding"
        component={React.lazy(() => import('../../screens/Auth/OnBoarding'))}
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
        name="Cust"
        component={CustomerDashboard}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Serv"
        component={HandymanDashboard}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
