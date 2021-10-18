import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Button from './Button';

export default function AvatarUpload(props: {
  // options: RadioOptions;
  onChange?: (key: string | number) => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.preview} />
      <View style={styles.buttons}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Upload new</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.removeButtonText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  preview: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 50,
    marginRight: 15,
  },
  buttons: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ff4242',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 15,
  },
  removeButtonText: {
    color: '#ff4242',
    paddingBottom: 10,
  },
});
