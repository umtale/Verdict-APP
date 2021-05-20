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
import CategoryRoot from './screens/Category';
import HomeRoot from './screens/Home';

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
  // const navigation: any = useNavigation();
  // const route = useRoute();

  return (
    <Pressable
      onPress={() => {
        EventRegister.emit('ScrollToTop');
        // navigation.emit({
        //   type: 'scrollToTop',
        //   target: route.key,
        //   canPreventDefault: false,
        // });
      }}>
      <Image width={189} height={27} source={require('./static/logo.jpg')} />
    </Pressable>
  );
}

const App = () => {
  const isDarkMode = false;
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props: any) => <CustomDrawerContent {...props} />}
          initialRouteName="HomeRoot">
          <Drawer.Screen
            name="HomeRoot"
            component={HomeRoot}
            options={headerSettings}
          />
        </Drawer.Navigator>
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
