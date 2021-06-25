import React from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export default function WidgetTitleSwitch({
  options,
  onChange = () => {},
}: {
  options: {
    text: string;
    value: string;
  }[];
  onChange: (v: string) => void;
}) {
  const [selected, setSelected] = useState(options[0].value);

  return (
    <View style={styles.container}>
      {options.map((option, key) => {
        return (
          <React.Fragment key={key}>
            <Pressable
              onPress={() => {
                setSelected(option.value);
                onChange(option.value);
              }}>
              <Text
                style={[
                  styles.text,
                  selected === option.value ? styles.selected : null,
                ]}>
                {option.text}
              </Text>
            </Pressable>
            {key + 1 < options.length && <View style={styles.decoration} />}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: '#696969',
    fontWeight: '700',
    fontSize: 24,
  },
  selected: {
    color: '#ff4242',
  },
  decoration: {
    height: 1,
    backgroundColor: '#696969',
    flex: 1,
    marginHorizontal: 10,
  },
});
