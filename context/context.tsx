import React from 'react';
import { AuthData, UserProfile } from '../types';

export type GlobalContextState = {
  auth: AuthData | null;
  headerLeftMode: 'menu' | 'back';
  profile?: UserProfile;
  headerBackCallback: null | (() => void);
  setHeaderBackCallback: (c: null | (() => void)) => void;
  setHeaderLeftMode: (c: 'menu' | 'back') => void;
  setAuth: (c: AuthData | null) => void;
  setProfile: (c: UserProfile) => void;
  getProfile: () => Promise<UserProfile | null>;
};

const AppContext = React.createContext<GlobalContextState>({
  auth: null,
  profile: undefined,
  headerLeftMode: 'menu',
  headerBackCallback: () => {},
  setHeaderBackCallback: () => {},
  setHeaderLeftMode: () => {},
  setAuth: () => {},
  setProfile: () => {},
  getProfile: () => {
    return new Promise(() => null);
  },
});

export default AppContext;
