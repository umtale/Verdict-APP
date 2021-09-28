import { NavigationProp } from '@react-navigation/core';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import LoginForm from '../components/LoginForm';

export default function Auth({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.close}
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={[styles.closeDash, styles.closeDashFirst]} />
        <View style={[styles.closeDash]} />
      </Pressable>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  close: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 10,
    right: 10,
    padding: 10,
    transform: [
      {
        rotateZ: '45deg',
      },
    ],
    zIndex: 5,
  },
  closeDash: {
    width: 25,
    height: 3,
    backgroundColor: '#ff4242',
  },
  closeDashFirst: {
    top: 3,
    transform: [
      {
        rotateZ: '90deg',
      },
    ],
  },
});
