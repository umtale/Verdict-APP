import React from 'react';
import { AuthData, UserProfile } from '../types';

export type GlobalState = {
  auth: AuthData | null;
  profile?: UserProfile;
  setAuth: (c: AuthData | null) => void;
  setProfile: (c: UserProfile) => void;
};

const AppContext = React.createContext<GlobalState>({
  auth: null,
  profile: undefined,
  setAuth: () => {},
  setProfile: () => {},
});

export default AppContext;
