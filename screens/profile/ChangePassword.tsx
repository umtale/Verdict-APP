import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../../helpers/globalStyles';
import Button from '../../components/Button';

interface ChangePasswordState {
  oldPassword: {
    value: string;
    error: string;
    valid: boolean;
  };
  newPassword: {
    value: string;
    error: string;
    valid: boolean;
  };
  newConfirmPassword: {
    value: string;
    error: string;
    valid: boolean;
  };
}

export class ChangePassword extends React.Component<
  { navigation: NavigationProp<any> },
  ChangePasswordState
> {
  constructor(props: { navigation: NavigationProp<any> }) {
    super(props);
    this.state = {
      oldPassword: {
        value: '',
        error: '',
        valid: false,
      },
      newPassword: {
        value: '',
        error: '',
        valid: false,
      },
      newConfirmPassword: {
        value: '',
        error: '',
        valid: false,
      },
    };
  }

  validate() {
    let valid = false;

    if (
      this.state.oldPassword.value === '' ||
      this.state.newPassword.value === '' ||
      this.state.newConfirmPassword.value === ''
    ) {
      valid = false;
    } else {
      valid = true;
    }

    return valid;
  }

  submit() {
    if (this.validate()) {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.close}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <View style={[styles.closeDash, styles.closeDashFirst]} />
          <View style={[styles.closeDash]} />
        </Pressable>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.label}>Current password</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder=""
          textContentType="password"
          onChangeText={text =>
            this.setState({
              oldPassword: { ...this.state.oldPassword, value: text },
            })
          }
        />
        <Text style={styles.label}>New password</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder=""
          textContentType="newPassword"
          onChangeText={text =>
            this.setState({
              newPassword: { ...this.state.newPassword, value: text },
            })
          }
        />
        <Text style={styles.label}>Repeat new password</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder=""
          textContentType="newPassword"
          onChangeText={text =>
            this.setState({
              newConfirmPassword: {
                ...this.state.newConfirmPassword,
                value: text,
              },
            })
          }
        />
        <Button
          text="Change Password"
          pressable={{
            onPress: this.submit.bind(this),
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  title: {
    fontWeight: '700',
    fontSize: 25,
    marginBottom: 25,
  },
  close: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 10,
    right: 10,
    padding: 10,
    transform: [
      {
        rotateZ: '45deg',
      },
    ],
    zIndex: 5,
  },
  closeDash: {
    width: 25,
    height: 3,
    backgroundColor: '#ff4242',
  },
  closeDashFirst: {
    top: 3,
    transform: [
      {
        rotateZ: '90deg',
      },
    ],
  },
});
