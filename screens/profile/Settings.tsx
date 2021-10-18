import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';
import AvatarUpload from '../../components/AvatarUpload';
import RadioButton from '../../components/RadioButton';
import { wp } from '../../helpers/functions';
import { globalStyles } from '../../helpers/globalStyles';

export default function ProfileSettings() {
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <ScrollView style={styles.container}>
      <AvatarUpload />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={globalStyles.input}
        autoCapitalize="none"
        placeholder="Your email"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="username"
        // onChangeText={text => setLogin(text)}
      />
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={globalStyles.input}
        // autoCapitalize="none"
        placeholder="Your First Name"
        // autoCompleteType="email"
        // textContentType="username"
        // onChangeText={text => setLogin(text)}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={globalStyles.input}
        // autoCapitalize="none"
        placeholder="Your Last Name"
        // autoCompleteType="email"
        // textContentType="username"
        // onChangeText={text => setLogin(text)}
      />
      <Text style={styles.label}>About me</Text>
      <TextInput
        style={[globalStyles.input, globalStyles.textarea]}
        multiline={true}
        textAlignVertical="top"
        // autoCapitalize="none"
        placeholder="Tell something about yourself..."
        // autoCompleteType="email"
        // textContentType="username"
        // onChangeText={text => setLogin(text)}
      />
      <Text style={styles.label}>Profile visibility</Text>
      <RadioButton options={{ '1': 'public', '0': 'private' }} />
      <Text style={styles.sectionTitle}>Security</Text>
      <Text style={styles.label}>Phone</Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={''}
        defaultCode="DM"
        layout="first"
        containerStyle={phoneInputStyles.container}
        textContainerStyle={phoneInputStyles.textContainer}
        onChangeText={text => {
          console.log('🚀 ~ file: Settings.tsx ~ line 64 ~ text', text);
        }}
        onChangeFormattedText={text => {
          console.log('🚀 ~ file: Settings.tsx ~ line 67 ~ text', text);
          // setFormattedValue(text);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <Pressable style={styles.changePasswordButton}>
        <Text style={styles.smallButton}>Change password</Text>
      </Pressable>
      <Text style={styles.sectionTitle}>Social profiles</Text>
      <Text style={styles.label}>Facebook Profile</Text>
      <TextInput
        style={globalStyles.input}
        // autoCapitalize="none"
        placeholder="https://facebook.com/profile"
        // autoCompleteType="email"
        // textContentType="username"
        // onChangeText={text => setLogin(text)}
      />
      <Text style={styles.label}>Twitter Profile</Text>
      <TextInput
        style={globalStyles.input}
        // autoCapitalize="none"
        placeholder="https://twitter.com/profile"
        // autoCompleteType="email"
        // textContentType="username"
        // onChangeText={text => setLogin(text)}
      />
      <Text style={styles.label}>LinkedIn Profile</Text>
      <TextInput
        style={globalStyles.input}
        // autoCapitalize="none"
        placeholder="https://linkedin.com/profile"
        // autoCompleteType="email"
        // textContentType="username"
        // onChangeText={text => setLogin(text)}
      />
      <Text style={styles.sectionTitle}>Following Categories</Text>
      <Text style={styles.sectionTitle}>Notification settings</Text>
      <Text style={styles.label}>
        Send me notifications when someone replies to my post
      </Text>
      <RadioButton
        options={{
          '1': 'immediately',
          '2': 'daily',
          '4': 'weekly',
          '3': 'never',
        }}
      />
      <Text style={styles.label}>someone replies to my verdict/reply</Text>
      <RadioButton
        options={{
          '1': 'immediately',
          '2': 'daily',
          '4': 'weekly',
          '3': 'never',
        }}
      />
      <Text style={styles.label}>someone follows me</Text>
      <RadioButton
        options={{
          '1': 'immediately',
          '2': 'daily',
          '4': 'weekly',
          '3': 'never',
        }}
      />
      <Text style={styles.label}>my post is published</Text>
      <RadioButton
        options={{
          '1': 'immediately',
          '2': 'daily',
          '4': 'weekly',
          '3': 'never',
        }}
      />
      <Text style={styles.label}>gained V-rep</Text>
      <RadioButton
        options={{
          '1': 'immediately',
          '2': 'daily',
          '4': 'weekly',
          '3': 'never',
        }}
      />
    </ScrollView>
  );
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
  sectionTitle: {
    fontWeight: '700',
    fontSize: 24,
    marginTop: 25,
    marginBottom: 20,
  },
  changePasswordButton: {
    marginTop: 15,
    marginBottom: 20,
    flexDirection: 'row',
  },
  smallButton: {
    borderWidth: 1,
    borderColor: '#ff4242',
    color: '#ff4242',
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
});

const phoneInputStyles = StyleSheet.create({
  container: {
    width: wp(92),
    marginBottom: 20,
  },
  textContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
