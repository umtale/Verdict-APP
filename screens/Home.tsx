import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

const Stack = createStackNavigator();

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
        source={require('./../static/hamburger.png')}
      />
    </TouchableOpacity>
  );
}

function LogoTitle() {
  return (
    <Image width={189} height={27} source={require('./../static/logo.jpg')} />
  );
}

export default function HomeRoot() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={headerSettings}
      />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.container}>
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
  },
  hamburger: {
    marginLeft: 15,
  },
});
