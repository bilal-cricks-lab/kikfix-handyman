/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { LogBox, SafeAreaView, StatusBar } from 'react-native';
// import DesignSystemShowcase from './src/components/DesignSystem/DesignSystemShowcase';
import './global.css';

// Import i18n configuration
import './src/i18n';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/navigation/StackNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { validateEnvironment } from './src/config/env';
import { Store, persistor } from './src/redux/Store/store';
import { Provider } from 'react-redux';

LogBox.ignoreAllLogs();

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider>
          <NavigationContainer>
            {/* <SafeAreaView className="flex-1 bg-gray-100"> */}
            {/* <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" /> */}
            {/* <DesignSystemShowcase /> */}
            <StackNav />
            {/* </SafeAreaView> */}
          </NavigationContainer>
        </LanguageProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
