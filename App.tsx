/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomDrawerContent } from './components/CustomDrawerContent';
import HomeRoot from './screens/Home';

const Drawer = createDrawerNavigator();

const App = () => {
  const isDarkMode = false;
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Drawer.Navigator
          drawerContent={(props: any) => <CustomDrawerContent {...props} />}
          initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeRoot} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
