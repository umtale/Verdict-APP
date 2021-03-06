import { AxiosResponse } from 'axios';
import React from 'react';
import { Text } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Api from '../helpers/api';
import { AuthData, UserProfile } from '../types';
import Context from './context';

type GlobalStateState = {
  auth: AuthData | null;
  profile?: UserProfile;
  loading: boolean;
  headerLeftMode: 'menu' | 'back';
  headerBackCallback: null | (() => void);
  headerRightCallback: null | (() => void);
};

export default class GlobalState extends React.Component<{}, GlobalStateState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      headerLeftMode: 'menu',
      auth: null,
      profile: undefined,
      headerBackCallback: null,
      headerRightCallback: null,
    };

    this.getAuth();

    Api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 401 && this.state.auth?.token) {
          this.setAuth(null);
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );
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
    try {
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
    } catch (error) {
      Promise.reject(error);
    }

    return this.state.auth;
  }

  async getProfile() {
    try {
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
    } catch (error) {
      Promise.reject(error);
      return null;
    }
  }

  setHeaderLeftMode(mode: GlobalStateState['headerLeftMode']) {
    this.setState({ headerLeftMode: mode });
  }

  setProfile = (profile: UserProfile) => {
    this.setState({ profile });
  };

  setHeaderBackCallback(cb: null | (() => void)) {
    this.setState({ headerBackCallback: cb });
  }

  showRightButton(cb: () => void) {
    this.setState({ headerRightCallback: cb });
  }

  hideRightButton() {
    this.setState({ headerRightCallback: null });
  }

  render() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <Context.Provider
        value={{
          auth: this.state.auth,
          profile: this.state.profile,
          headerLeftMode: this.state.headerLeftMode,
          headerBackCallback: this.state.headerBackCallback,
          headerRightCallback: this.state.headerRightCallback,
          setHeaderBackCallback: this.setHeaderBackCallback.bind(this),
          setAuth: this.setAuth.bind(this),
          setProfile: this.setProfile.bind(this),
          getProfile: this.getProfile.bind(this),
          setHeaderLeftMode: this.setHeaderLeftMode.bind(this),
          showRightButton: this.showRightButton.bind(this),
          hideRightButton: this.hideRightButton.bind(this),
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
