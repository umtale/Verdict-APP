import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

export default function Button(props: {
  pressable: PressableProps;
  text: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable style={[styles.button, props.style]} {...props.pressable}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff4242',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 18,
  },
});
