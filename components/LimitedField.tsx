import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface LimitedFieldProps {
  max?: number;
  min?: number;
  onChange?: (value: string) => void;
  value: string;
  placeholder?: string;
}

interface LimitedFieldState {
  counter: number;
  value: string;
  minValid: boolean;
  maxValid: boolean;
}

export class LimitedField extends React.Component<
  LimitedFieldProps,
  LimitedFieldState
> {
  constructor(props: LimitedFieldProps) {
    super(props);

    this.state = {
      counter: 0,
      value: props.value,
      minValid: !(props.min && props.min > 0),
      maxValid: true,
    };
  }

  componentDidMount() {
    this.check(this.props.value);
  }

  getValueLength(s: string) {
    return [...s.trim()].length;
  }

  check(text: string) {
    let value = text.replace(/(?:\r\n|\r|\n)/g, '');
    let count = this.getValueLength(value);
    let minValid = true;

    if (this.props.min && this.props.min > count) {
      minValid = false;
    }

    if (this.props.max && this.props.max < count) {
      value = value.substring(0, this.props.max);
      count = this.getValueLength(value);
    }

    this.setState({
      value,
      counter: count,
      minValid,
    });

    return value;
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          multiline
          placeholder={this.props.placeholder}
          textAlignVertical="top"
          value={this.state.value}
          returnKeyType="next"
          onChangeText={text => {
            const value = this.check(text);

            if (this.props.onChange) {
              this.props.onChange(value);
            }
          }}
        />
        {(!!this.props.max || !!this.props.min) && (
          <View style={styles.counterContainer}>
            <Text
              style={[
                styles.counterNumber,
                this.state.minValid ? styles.validColor : styles.invalidColor,
              ]}>
              {this.state.counter}
            </Text>
            {!!this.props.max && (
              <>
                <View style={styles.counterSeparator} />
                <Text style={styles.counterNumber}>{this.props.max}</Text>
              </>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 3,
    backgroundColor: '#fff',
  },
  counterSeparator: {
    width: 2,
    height: 12,
    backgroundColor: '#909090',
    marginLeft: 4,
    marginRight: 4,
    marginTop: 1,
    transform: [
      {
        rotateZ: '20deg',
      },
    ],
  },
  counterNumber: {
    fontWeight: '600',
    fontSize: 12,
  },
  input: {
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal: 15,
  },
  invalidColor: {
    color: '#ff4242',
  },
  validColor: {
    color: '#000',
  },
});
