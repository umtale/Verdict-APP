import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Editor from '../components/Editor';
import { LimitedField } from '../components/LimitedField';

export default class PostEditor extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>
          Title
          <Text style={styles.required}>*</Text>
        </Text>
        <LimitedField
          min={50}
          max={120}
          value={''}
          placeholder="Minimum title length: 50 characters"
          onChange={value => {
            console.log('🚀 ~ file: AddPost.tsx ~ line 25 ~ value', value);
          }}
        />
        <Text style={styles.label}>Subtitle</Text>
        <LimitedField
          min={80}
          max={160}
          value={''}
          placeholder="Minimum subtitle length: 80 characters"
          onChange={value => {
            console.log('🚀 ~ file: AddPost.tsx ~ line 25 ~ value', value);
          }}
        />
        <Text style={styles.label}>
          Post Content
          <Text style={styles.required}>*</Text>
        </Text>
        <Editor />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  required: {
    color: '#ff4242',
  },
  editor: {
    marginBottom: 15,
  },
});
