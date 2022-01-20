import React from 'react';
import { AuthData, UserProfile } from '../types';

export type GlobalState = {
  auth: AuthData | null;
  profile?: UserProfile;
  setAuth: (c: AuthData | null) => void;
  setProfile: (c: UserProfile) => void;
  getProfile: () => Promise<UserProfile | null>;
};

const AppContext = React.createContext<GlobalState>({
  auth: null,
  profile: undefined,
  setAuth: () => {},
  setProfile: () => {},
  getProfile: () => {
    return new Promise(() => null);
  },
});

export default AppContext;
