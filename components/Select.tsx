import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface SelectProps {
  options: {
    value: any;
    label: string;
  }[];
  placeholder?: string;
  value?: any;
}

interface SelectState {
  selected: {
    value: any;
    label: string;
  };
  options: {
    value: any;
    label: string;
  }[];
  loading: boolean;
  message: string | null;
  showDropdown: boolean;
}

export default class Select extends React.Component<SelectProps, SelectState> {
  constructor(props: SelectProps) {
    super(props);

    this.state = {
      selected: {
        value: '',
        label: '',
      },
      loading: false,
      options: props.options,
      message: null,
      showDropdown: true,
    };
  }

  renderOptionsList() {
    if (this.state.showDropdown && this.state.options.length) {
      return (
        <ScrollView style={styles.listContainer}>
          {this.state.options.map((option, index) => {
            return (
              <Pressable
                key={index}
                style={styles.tagListItem}
                onPress={() => {
                  this.select(option);
                }}>
                <Text>{option.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      );
    } else {
      return <></>;
    }
  }

  select(option: { value: any; label: string }) {
    this.setState({ selected: option, showDropdown: false });
  }

  onPress() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Pressable style={styles.control} onPress={this.onPress.bind(this)}>
          <Text
            style={[
              styles.value,
              this.state.selected.label
                ? styles.selectedValue
                : styles.placeholder,
            ]}>
            {this.state.selected.label || this.props.placeholder || 'Select...'}
          </Text>
          <View>
            <Image
              width={12}
              height={7}
              source={require('./../static/select-indicator.png')}
            />
          </View>
        </Pressable>
        <View style={styles.listContainerWrapper}>
          {this.state.message && (
            <View style={styles.listContainer}>
              <Text style={styles.listMessage}>{this.state.message}</Text>
            </View>
          )}
          {this.renderOptionsList()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    zIndex: 20,
  },
  value: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  placeholder: {
    color: '#b0b0b0',
  },
  selectedValue: {
    color: '#000',
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  listContainerWrapper: {
    position: 'relative',
  },
  listContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
    maxHeight: 300,
    position: 'absolute',
    top: 1,
    left: -1,
    right: -1,
    // width: '100%',
    backgroundColor: '#fff',
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
});
