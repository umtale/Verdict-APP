import { AxiosResponse } from 'axios';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
              <Pressable
                key={index}
                style={styles.tagListItem}
                onPress={() => {
                  this.addSavedTag(tag);
                }}>
                <Text style={styles.tagListItemTextOccurence}>
                  {occurrence}
                </Text>
                <Text>{tag.name.replace(occurrence, '')}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      );
    } else {
      return <></>;
    }
  }

  addSavedTag(tag: PostTag) {
    const alreadySelected = this.state.selected.find(selectedTag => {
      return selectedTag.name.toLowerCase() === tag.name.toLowerCase();
    });

    if (alreadySelected) {
      this.setState({ value: '', showTagList: false, tagsList: [] });
    } else {
      const selected = [
        ...this.state.selected,
        { id: parseInt(tag.id, 10), name: tag.name },
      ];

      this.setState({ selected, value: '', showTagList: false, tagsList: [] });
    }
  }

  addNewTag() {
    const existedTag = this.state.tagsList.find(tag => {
      return tag.name.toLowerCase() === this.state.value.toLowerCase();
    });

    const alreadySelected = this.state.selected.find(tag => {
      return tag.name.toLowerCase() === this.state.value.toLowerCase();
    });

    if (alreadySelected) {
      this.setState({
        value: '',
        message: null,
      });
    } else {
      const newTag = {
        id: existedTag ? parseInt(existedTag.id, 10) : undefined,
        name: existedTag ? existedTag.name : this.state.value,
      };

      this.setState({
        selected: [...this.state.selected, newTag],
        value: '',
        message: null,
      });
    }
  }

  deleteTag(index: number) {
    let selected = this.state.selected;
    delete selected[index];
    this.setState({ selected });
  }

  render(): React.ReactNode {
    return (
      <View>
        <View style={styles.selectedList}>
          {this.state.selected.map((tag, index) => {
            return (
              <View key={index} style={styles.selectedTag}>
                <Text style={styles.selectedTagText}>{tag.name}</Text>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    this.deleteTag(index);
                  }}>
                  <View
                    style={[
                      styles.deleteButtonDash,
                      styles.deleteButtonDashFirst,
                    ]}
                  />
                  <View
                    style={[
                      styles.deleteButtonDash,
                      styles.deleteButtonDashSecond,
                    ]}
                  />
                </Pressable>
              </View>
            );
          })}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.tagsContainer} />
          <TextInput
            style={styles.input}
            placeholder="Type term and press Enter"
            value={this.state.value}
            onChangeText={this.onInputChange.bind(this)}
            blurOnSubmit={false}
            autoCorrect={false}
            onBlur={() => {
              this.setState({
                value: '',
                message: null,
                tagsList: [],
                showTagList: false,
              });
            }}
            onSubmitEditing={this.addNewTag.bind(this)}
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
  selectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 12,
    backgroundColor: '#ff4242',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTagText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  deleteButton: {
    width: 35,
    height: 25,
    borderLeftColor: '#fdaeae',
    borderLeftWidth: 1,
  },
  deleteButtonDash: {
    width: 16,
    height: 2,
    position: 'absolute',
    top: 11,
    left: 8,
    backgroundColor: '#fff',
  },
  deleteButtonDashFirst: {
    transform: [
      {
        rotateZ: '45deg',
      },
    ],
  },
  deleteButtonDashSecond: {
    transform: [
      {
        rotateZ: '-45deg',
      },
    ],
  },
});
