import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export default function WidgetTitle({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.decoration} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: '#696969',
    fontWeight: '700',
    fontSize: 24,
    marginRight: 10,
  },
  decoration: {
    height: 1,
    backgroundColor: '#696969',
    flex: 1,
  },
});
