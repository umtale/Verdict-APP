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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomDrawerContent } from './components/CustomDrawerContent';
import Auth from './screens/Auth';
import CategoryRoot from './screens/Category';
import HomeRoot from './screens/Home';
import TagRoot from './screens/Tag';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const headerSettings = {
  headerTitle: (props: any) => <LogoTitle {...props} />,
  headerLeft: () => <Hamburger />,
};

function Hamburger() {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={styles.hamburger}
      onPress={navigation.toggleDrawer}
      activeOpacity={0.5}>
      <Image
        width={27}
        height={27}
        source={require('./static/hamburger.png')}
      />
    </TouchableOpacity>
  );
}

function LogoTitle() {
  return (
    <Pressable
      onPress={() => {
        EventRegister.emit('ScrollToTop');
      }}>
      <Image width={189} height={27} source={require('./static/logo.jpg')} />
    </Pressable>
  );
}

const baseNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      initialRouteName="HomeRoot">
      <Drawer.Screen
        name="HomeRoot"
        component={HomeRoot}
        options={headerSettings}
      />
      <Drawer.Screen
        name="CategoryRoot"
        component={CategoryRoot}
        options={headerSettings}
      />
      <Drawer.Screen
        name="TagRoot"
        component={TagRoot}
        options={headerSettings}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  const isDarkMode = false;
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Group>
            <RootStack.Screen
              name="Root"
              component={baseNavigator}
              options={{ headerShown: false }}
            />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen
              name="AuthModal"
              component={Auth}
              options={{ headerShown: false }}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburger: {
    marginLeft: 15,
  },
});

export default App;
