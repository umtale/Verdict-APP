import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Image, View } from 'react-native';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <Image
        width={188}
        height={27}
        source={require('./../static/logo-white.png')}
      />
      <Text style={styles.slogan}>
        your opinion on latest news, events, and society developments
      </Text>
      <Text style={styles.copyright}>
        Copyright © 2018-{year} VERDICT, LLC - All Rights Reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6a6a6a',
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  slogan: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  copyright: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    marginTop: 15,
  },
});
