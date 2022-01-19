import { AxiosResponse } from 'axios';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PhoneNumberUtil } from 'google-libphonenumber';
import PhoneInput from 'react-native-phone-number-input';
import AvatarUpload from '../../components/AvatarUpload';
import RadioButton from '../../components/RadioButton';
import Api from '../../helpers/api';
import { wp } from '../../helpers/functions';
import { globalStyles } from '../../helpers/globalStyles';
import { UserProfile } from '../../types';

interface ProfileSettingsState {
  loading: boolean;
  data: UserProfile;
}

export class ProfileSettings extends React.Component<{}, ProfileSettingsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      data: {
        avatar: undefined,
        email: '',
        firstName: '',
        lastName: '',
        bio: '',
        settings: {
          email_visibility: '',
          email_recive_point: '',
          profile_visibility: '',
          email_user_follow: '',
          email_post_replies: '',
          email_post_published: '',
          email_verdict_replies: '',
        },
        twitterLink: '',
        facebookLink: '',
        linkedinLink: '',
      },
    };

    this.loadProfile();
  }

  loadProfile() {
    Api.get('profile/full', { data: null })
      .then((response: AxiosResponse<{ data: UserProfile }>) => {
        this.setState({ data: response.data.data, loading: false });
      })
      .catch(_error => {});
  }

  render() {
    const phoneUtil = PhoneNumberUtil.getInstance();
    if (this.state.loading) {
      return <View />;
    }

    const phone = phoneUtil.parse(
      `+${this.state.data.countryCode}${this.state.data.phone}`,
    );
    const code: any = phoneUtil.getRegionCodeForNumber(phone);

    return (
      <ScrollView style={styles.container}>
        <AvatarUpload
          value={this.state.data.avatar?.path}
          onUploadSuccess={this.loadProfile.bind(this)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize="none"
          placeholder="Your email"
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="username"
          value={this.state.data.email}
          onChangeText={text =>
            this.setState({ data: { ...this.state.data, email: text } })
          }
        />
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Your First Name"
          value={this.state.data.firstName}
          onChangeText={text =>
            this.setState({ data: { ...this.state.data, firstName: text } })
          }
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Your Last Name"
          value={this.state.data.lastName}
          onChangeText={text =>
            this.setState({ data: { ...this.state.data, lastName: text } })
          }
        />
        <Text style={styles.label}>About me</Text>
        <TextInput
          style={[globalStyles.input, globalStyles.textarea]}
          multiline={true}
          textAlignVertical="top"
          placeholder="Tell something about yourself..."
          value={this.state.data.bio}
          onChangeText={text =>
            this.setState({ data: { ...this.state.data, bio: text } })
          }
        />
        <Text style={styles.label}>Profile visibility</Text>
        <RadioButton
          options={{ '1': 'public', '0': 'private' }}
          value={this.state.data.settings.profile_visibility}
          onChange={(value: any) => {
            this.setState({
              data: {
                ...this.state.data,
                settings: {
                  ...this.state.data.settings,
                  profile_visibility: value,
                },
              },
            });
          }}
        />
        <Text style={styles.sectionTitle}>Security</Text>
        <Text style={styles.label}>Phone</Text>
        <PhoneInput
          defaultValue={''}
          defaultCode={code}
          layout="first"
          value={this.state.data.phone}
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
          autoCapitalize="none"
          placeholder="https://facebook.com/profile"
          value={this.state.data.facebookLink}
          onChangeText={text =>
            this.setState({ data: { ...this.state.data, facebookLink: text } })
          }
        />
        <Text style={styles.label}>Twitter Profile</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize="none"
          placeholder="https://twitter.com/profile"
          value={this.state.data.twitterLink}
          onChangeText={text =>
            this.setState({ data: { ...this.state.data, twitterLink: text } })
          }
        />
        <Text style={styles.label}>LinkedIn Profile</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize="none"
          placeholder="https://linkedin.com/profile"
          value={this.state.data.linkedinLink}
          onChangeText={text =>
            this.setState({ data: { ...this.state.data, linkedinLink: text } })
          }
        />
        <Text style={styles.sectionTitle}>Following Categories</Text>
        <Text style={styles.sectionTitle}>Notification settings</Text>
        <Text style={styles.label}>
          Send me notifications when someone replies to my post
        </Text>
        <RadioButton
          value={this.state.data.settings.email_post_replies}
          options={{
            '1': 'immediately',
            '2': 'daily',
            '4': 'weekly',
            '3': 'never',
          }}
        />
        <Text style={styles.label}>someone replies to my verdict/reply</Text>
        <RadioButton
          value={this.state.data.settings.email_verdict_replies}
          options={{
            '1': 'immediately',
            '2': 'daily',
            '4': 'weekly',
            '3': 'never',
          }}
        />
        <Text style={styles.label}>someone follows me</Text>
        <RadioButton
          value={this.state.data.settings.email_user_follow}
          options={{
            '1': 'immediately',
            '2': 'daily',
            '4': 'weekly',
            '3': 'never',
          }}
        />
        <Text style={styles.label}>my post is published</Text>
        <RadioButton
          value={this.state.data.settings.email_post_published}
          options={{
            '1': 'immediately',
            '2': 'daily',
            '4': 'weekly',
            '3': 'never',
          }}
        />
        <Text style={styles.label}>gained V-rep</Text>
        <RadioButton
          value={this.state.data.settings.email_recive_point}
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
}

export default function ProfileSettingsas() {}

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
