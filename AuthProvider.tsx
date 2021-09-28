import React from 'react';
import { createContext, useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Api from './helpers/api';

export type AuthData = {
  exp: number;
  iat: number;
  type: string;
  userId: string;
  userRole: string;
  username: string;
  token: string;
  refreshToken: string;
};

export type GlobalAuthState = {
  auth: AuthData | null;
  setAuth: (c: AuthData | null) => void;
};

// Create a context
const AuthContext = createContext<GlobalAuthState>({
  auth: null,
  setAuth: () => {},
});

const AuthProvider = ({ children }: any) => {
  const [auth, setAuthState] = useState<AuthData | null>(null);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await EncryptedStorage.getItem('auth');

      if (authDataString) {
        const authData = JSON.parse(authDataString || '{}');
        // Configure axios headers
        Api.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
        setAuthState(authData);
      } else {
        setAuthState(null);
      }
    } catch (err) {
      setAuthState(null);
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (authState: AuthData | null) => {
    try {
      if (!authState) {
        EncryptedStorage.removeItem('auth');
        delete Api.defaults.headers.common.Authorization;
        setAuthState(null);
      } else {
        await EncryptedStorage.setItem('auth', JSON.stringify(authState));
        // Configure axios headers
        Api.defaults.headers.common.Authorization = `Bearer ${authState.token}`;
        setAuthState(authState);
      }
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
