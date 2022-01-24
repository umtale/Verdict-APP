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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomDrawerContent } from './components/CustomDrawerContent';
import AppContext from './context/context';
import AddPost from './screens/AddPost';
import Auth from './screens/Auth';
import CategoryRoot from './screens/Category';
import HomeRoot from './screens/Home';
import ProfileRoot from './screens/Profile';
import TagRoot from './screens/Tag';

const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const headerSettings = {
  headerTitle: (props: any) => <LogoTitle {...props} />,
  headerLeft: () => <Hamburger />,
  headerRight: () => <HeaderRight />,
};

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

function Hamburger() {
  const navigation: any = useNavigation();
  const context = useContext(AppContext);

  if (context.headerLeftMode === 'menu') {
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
  } else {
    return (
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => {
          context.setHeaderLeftMode('menu');
          if (context.headerBackCallback) {
            context.headerBackCallback();
            context.setHeaderBackCallback(null);
          } else {
            navigation.goBack();
          }
        }}
        activeOpacity={0.5}>
        <Text style={styles.headerLink}>Back</Text>
      </TouchableOpacity>
    );
  }
}

function HeaderRight() {
  const context = useContext(AppContext);

  if (context.headerRightCallback) {
    return (
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => {
          if (context.headerRightCallback) {
            context.headerRightCallback();
          }
        }}
        activeOpacity={0.5}>
        <Text style={[styles.headerLink, styles.saveLink]}>Save</Text>
      </TouchableOpacity>
    );
  } else {
    return <></>;
  }
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
      <Drawer.Screen
        name="AddPost"
        component={AddPost}
        options={headerSettings}
      />
    </Drawer.Navigator>
  );
};

const baseNavigatorLoggedIn = () => {
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
      <Drawer.Screen
        name="ProfileRoot"
        component={ProfileRoot}
        options={headerSettings}
      />
    </Drawer.Navigator>
  );
};

export default class AppArea extends React.Component {
  static contextType = AppContext;

  constructor(props: any) {
    super(props);
  }

  render() {
    const isDarkMode = false;
    const { auth } = this.context;

    return (
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <RootStack.Navigator>
            {auth?.token ? (
              <RootStack.Group>
                <RootStack.Screen
                  name="Root"
                  component={baseNavigatorLoggedIn}
                  options={{ headerShown: false }}
                />
              </RootStack.Group>
            ) : (
              <>
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
              </>
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburger: {
    marginLeft: 15,
  },
  headerLink: {
    color: '#ff4242',
    fontWeight: '600',
    fontSize: 17,
  },
  saveLink: {
    marginRight: 15,
  },
});
