/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
// import DesignSystemShowcase from './src/components/DesignSystem/DesignSystemShowcase';
import './global.css';

// Import i18n configuration
import './src/i18n';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/navigation/StackNavigator';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <NavigationContainer>
        {/* <SafeAreaView className="flex-1 bg-gray-100"> */}
          {/* <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" /> */}
          {/* <DesignSystemShowcase /> */}
          <StackNav />
        {/* </SafeAreaView> */}
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;
