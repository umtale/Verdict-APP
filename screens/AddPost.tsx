import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Editor from '../components/Editor';

export default function AddPost() {
  return (
    <View style={styles.container}>
      <Editor />
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
