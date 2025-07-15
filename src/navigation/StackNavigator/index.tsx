import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../../screens/Splash';
import SignUp from '../../screens/Auth/SignUp';
import StackParamList from '../../types/stack.types';
import SignIn from '../../screens/Auth/SignIn';

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
        component={React.lazy(() => import('../../screens/OnBoarding'))}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='SignIn' component={SignIn} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  );
};

export default StackNav;
