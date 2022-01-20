import { AxiosResponse } from 'axios';
import React from 'react';
import { Text } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Api from '../helpers/api';
import { AuthData, UserProfile } from '../types';
import Context from './context';

export default class GlobalState extends React.Component {
  state = {
    loading: true,
    auth: null,
    profile: undefined,
  };

  constructor(props: any) {
    super(props);
    this.getAuth();
  }

  async setAuth(auth: AuthData | null) {
    try {
      if (!auth) {
        EncryptedStorage.removeItem('auth');
        delete Api.defaults.headers.common.Authorization;
        this.setState({ auth: null });
      } else {
        await EncryptedStorage.setItem('auth', JSON.stringify(auth));
        // Configure axios headers
        Api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
        this.setState({ auth });
        await this.getProfile();
      }
    } catch (error) {
      Promise.reject(error);
    }
  }

  async getAuth() {
    if (!this.state.auth) {
      const authData = await EncryptedStorage.getItem('auth');

      if (authData) {
        const auth = JSON.parse(authData || '{}');
        // Configure axios headers
        Api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
        this.setState({ auth, loading: false });
        await this.getProfile();
      } else {
        this.setState({ auth: null, loading: false });
      }
    }

    return this.state.auth;
  }

  async getProfile() {
    if (this.state.auth) {
      return await Api.get('profile/full', { data: null }).then(
        (response: AxiosResponse<{ data: UserProfile }>) => {
          this.setState({ profile: response.data.data });
          return response.data.data;
        },
      );
    } else {
      return null;
    }
  }

  setProfile = (profile: UserProfile) => {
    this.setState({ profile });
  };

  render() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <Context.Provider
        value={{
          auth: this.state.auth,
          profile: this.state.profile,
          setAuth: this.setAuth.bind(this),
          setProfile: this.setProfile.bind(this),
          getProfile: this.getProfile.bind(this),
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
