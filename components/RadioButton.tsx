import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface RadioOptions {
  [index: number | string]: number | string;
}

export default function RadioButton(props: {
  options: RadioOptions;
  value?: string | number;
  onChange?: (key: string | number) => void;
}) {
  const [state, setState] = useState<string | number | undefined>(props.value);
  console.log(`🚀 ~ file: RadioButton.tsx ~ line 14 ~ props.value`, props.value);
  const options = [];

  for (const key in props.options) {
    if (Object.prototype.hasOwnProperty.call(props.options, key)) {
      const element = props.options[key];

      options.push(
        <Pressable
          key={key}
          style={styles.button}
          onPress={() => {
            setState(key);
            if (props.onChange) {
              props.onChange(key);
            }
          }}>
          <View
            style={
              state === key ? [styles.radio, styles.radioCurrent] : styles.radio
            }>
            <View style={styles.radioDot} />
          </View>
          <Text style={styles.text}>{element}</Text>
        </Pressable>,
      );
    }
  }

  return <View style={styles.container}>{options}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 25,
  },
  text: {
    color: '#333',
    fontWeight: '700',
    fontSize: 14,
  },
  radio: {
    width: 21,
    height: 21,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 7,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  radioCurrent: {
    backgroundColor: '#ff4242',
  },
  radioDot: {
    width: 9,
    height: 9,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
