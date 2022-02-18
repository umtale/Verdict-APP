import { AxiosResponse } from 'axios';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Api from '../helpers/api';
import { PostTag } from '../types';

interface TagsInputState {
  selected: {
    id?: number;
    name: string;
  }[];
  value: string;
  loading: boolean;
  tagsList: PostTag[];
  message: string | null;
  showTagList: boolean;
}

export default class TagsInput extends React.Component<{}, TagsInputState> {
  private searchTimeout: NodeJS.Timeout | null = null;

  constructor(props: any) {
    super(props);

    this.state = {
      selected: [],
      value: '',
      loading: false,
      tagsList: [],
      message: null,
      showTagList: false,
    };
  }

  onInputChange(text: string) {
    if (text.length >= 3) {
      if (this.state.loading) {
        this.setState({ value: this.state.value, message: null });
      } else {
        this.setState({
          value: text,
          message: 'Loading...',
          showTagList: false,
        });
        this.search();
      }
    } else {
      let message = null;

      if (text.length > 0) {
        message = 'minimum allowed number of characters: 3';
      }

      this.setState({
        value: text,
        showTagList: false,
        message,
      });
    }
  }

  search() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.setState({
        loading: true,
        message: 'Loading...',
        showTagList: false,
      });

      Api.get('tags/list', { params: { search: this.state.value } }).then(
        (response: AxiosResponse<{ data: PostTag[] }>) => {
          if (response.data.data && response.data.data.length) {
            this.setState({
              loading: false,
              message: null,
              showTagList: true,
              tagsList: response.data.data,
            });
          } else {
            this.setState({
              loading: false,
              message: `Press Enter to create "${this.state.value}"`,
              showTagList: false,
              tagsList: [],
            });
          }
        },
      );
    }, 500);
  }

  renderTagsList() {
    if (this.state.showTagList && this.state.tagsList.length) {
      return (
        <ScrollView style={styles.listContainer}>
          {this.state.tagsList.map((tag, index) => {
            const start = tag.name
              .toLowerCase()
              .indexOf(this.state.value.toLowerCase());
            const occurrence = tag.name.substring(
              start,
              this.state.value.length,
            );

            return (
              <View key={index} style={styles.tagListItem}>
                <Text style={styles.tagListItemTextOccurence}>
                  {occurrence}
                </Text>
                <Text>{tag.name.replace(occurrence, '')}</Text>
              </View>
            );
          })}
        </ScrollView>
      );
    } else {
      return <></>;
    }
  }

  render(): React.ReactNode {
    return (
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.tagsContainer} />
          <TextInput
            style={styles.input}
            placeholder="Type term and press Enter"
            value={this.state.value}
            onChangeText={this.onInputChange.bind(this)}
            blurOnSubmit={false}
            onBlur={() => {
              this.setState({
                value: '',
                message: null,
                tagsList: [],
                showTagList: false,
              });
            }}
            onSubmitEditing={e => {
              console.log('🚀 ~ file: TagsInput.tsx ~ line 71 ~ e', e);
            }}
          />
        </View>
        {this.state.message && (
          <View style={styles.listContainer}>
            <Text style={styles.listMessage}>{this.state.message}</Text>
          </View>
        )}
        {this.renderTagsList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  listContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
    maxHeight: 300,
  },
  listMessage: {
    color: '#3c3c3c',
  },
  tagListItem: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  tagListItemTextOccurence: {
    fontWeight: '600',
  },
});
