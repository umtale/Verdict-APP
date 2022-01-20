import { HtmlParseAndView } from '@react-native-html/renderer';
import { useNavigation } from '@react-navigation/core';
import jwtDecode from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../components/Button';
import AppContext from '../context/context';
import { globalStyles } from '../helpers/globalStyles';
import { AuthData } from '../types';

export default function LoginForm() {
  const { setAuth } = useContext(AppContext);
  const navigation = useNavigation();
  const [login, setLogin] = useState('resurgent11@gmail.com');
  const [password, setPassword] = useState('gR4MejnCDBinRUS');
  const terms = `<p>By proceeding, you agree to Verdict's
    <a href="https://verdict.org/terms-of-service/" title="Terms of Service">Terms of Service</a>
    &amp;
    <a href="https://verdict.org/privacy-policy/" title="Privacy Policy">Privacy Policy</a>
  </p>`;
  const termsStyles = StyleSheet.create({
    text: {
      fontSize: 16,
      lineHeight: 20,
    },
    p: {
      marginBottom: 10,
    },
    link: {
      color: '#ff4242',
      textDecorationLine: 'none',
    },
  });

  return (
    <View>
      <Text style={styles.title}>Sign In for Verdict</Text>
      <View>
        <Pressable style={styles.socialButton}>
          <View style={[styles.iconContainer, styles.googleIconContainer]}>
            <Image
              style={[styles.socialIcon]}
              width={25}
              height={25}
              source={require('./../static/google.png')}
            />
          </View>
          <Text style={[styles.socialText, styles.googleText]}>
            Using Google
          </Text>
        </Pressable>
        <Pressable style={styles.socialButton}>
          <View style={[styles.iconContainer, styles.twitterIconContainer]}>
            <Image
              style={[styles.socialIcon]}
              width={25}
              height={25}
              source={require('./../static/twitter.png')}
            />
          </View>
          <Text style={[styles.socialText, styles.twitterText]}>
            Using Twitter
          </Text>
        </Pressable>
        <Pressable style={styles.socialButton}>
          <View style={[styles.iconContainer, styles.linkedinIconContainer]}>
            <Image
              style={[styles.socialIcon]}
              width={25}
              height={25}
              source={require('./../static/linkedin-in.png')}
            />
          </View>
          <Text style={[styles.socialText, styles.linkedinText]}>
            Using LinkedIn
          </Text>
        </Pressable>
      </View>
      <View style={styles.separator}>
        <View style={styles.separatorDash} />
        <Text style={styles.separatorText}>or by email</Text>
        <View style={styles.separatorDash} />
      </View>

      <TextInput
        style={globalStyles.input}
        autoCapitalize="none"
        placeholder="Email"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="username"
        onChangeText={text => setLogin(text)}
      />
      <TextInput
        style={globalStyles.input}
        autoCapitalize="none"
        placeholder="Password"
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      <Pressable>
        <Text style={styles.link}>Forgot password?</Text>
      </Pressable>

      <HtmlParseAndView
        containerStyle={styles.terms}
        rawHtml={terms}
        htmlStyles={termsStyles}
      />
      <View style={styles.formSubmit}>
        <Button
          text="Login"
          pressable={{
            onPress: () => {
              let apiUrl = `${Config.API_URL}auth/login`;
              fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: login,
                  password: password,
                }),
              })
                .then((response: any) => response.json())
                .then(
                  (
                    response:
                      | { success: true; token: string }
                      | { success: false; code: number; message: string },
                  ) => {
                    if (response.success) {
                      const data: AuthData = jwtDecode(response.token);
                      data.token = response.token;
                      setAuth(data);
                      navigation.goBack();
                    } else {
                      Alert.alert('Error!', response.message);
                    }
                  },
                );
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#505050',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    marginBottom: 15,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    marginRight: 15,
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
  socialText: {
    fontWeight: '700',
    fontSize: 16,
  },
  googleText: {
    color: '#e94435',
  },
  googleIconContainer: {
    backgroundColor: '#e94435',
  },
  twitterText: {
    color: '#55acee',
  },
  twitterIconContainer: {
    backgroundColor: '#55acee',
  },
  linkedinText: {
    color: '#0e76a8',
  },
  linkedinIconContainer: {
    backgroundColor: '#0e76a8',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  separatorDash: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    fontWeight: '700',
    marginHorizontal: 10,
    color: '#7d7d7d',
  },
  terms: {
    marginVertical: 15,
  },
  link: {
    color: '#ff4242',
    fontSize: 16,
  },
  formSubmit: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    marginTop: 15,
  },
});
