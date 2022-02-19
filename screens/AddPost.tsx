import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Editor from '../components/Editor';
import { LimitedField } from '../components/LimitedField';
import TagsInput from '../components/TagsInput';
import Api from '../helpers/api';

export default class PostEditor extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    Api.get('categories').then(response => {
      // response.data
      console.log(
        '🚀 ~ file: AddPost.tsx ~ line 20 ~ response.data',
        response.data,
      );
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}>
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
        <Text style={styles.label}>Tags</Text>
        <TagsInput />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
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
