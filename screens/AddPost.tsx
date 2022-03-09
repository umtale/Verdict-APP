import { AxiosResponse } from 'axios';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Editor from '../components/Editor';
import { LimitedField } from '../components/LimitedField';
import Select from '../components/Select';
import TagsInput from '../components/TagsInput';
import Api from '../helpers/api';
import { PostCategory } from '../types';

interface PostEditorState {
  categories: PostCategory[];
}

export default class PostEditor extends React.Component<{}, PostEditorState> {
  constructor(props: any) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    Api.get('categories').then(
      (response: AxiosResponse<{ data: PostCategory[] }>) => {
        this.setState({ categories: response.data.data });
      },
    );
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
        <Text style={styles.label}>Category</Text>
        <Select
          options={this.state.categories.map(category => {
            return {
              label: category.name,
              value: category.id,
            };
          })}
        />
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
