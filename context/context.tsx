import React from 'react';
import { AuthData, UserProfile } from '../types';

export type GlobalContextState = {
  auth: AuthData | null;
  headerLeftMode: 'menu' | 'back';
  profile?: UserProfile;
  headerBackCallback: null | (() => void);
  headerRightCallback: null | (() => void);
  setHeaderBackCallback: (c: null | (() => void)) => void;
  setHeaderLeftMode: (c: 'menu' | 'back') => void;
  showRightButton: (c: () => void) => void;
  hideRightButton: () => void;
  setAuth: (c: AuthData | null) => void;
  setProfile: (c: UserProfile) => void;
  getProfile: () => Promise<UserProfile | null>;
};

const AppContext = React.createContext<GlobalContextState>({
  auth: null,
  profile: undefined,
  headerLeftMode: 'menu',
  headerBackCallback: () => {},
  headerRightCallback: () => {},
  setHeaderBackCallback: () => {},
  setHeaderLeftMode: () => {},
  showRightButton: () => {},
  hideRightButton: () => {},
  setAuth: () => {},
  setProfile: () => {},
  getProfile: () => {
    return new Promise(() => null);
  },
});

export default AppContext;
