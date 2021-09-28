import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Api from '../helpers/api';
import { UserProfile } from '../types';

export function useProfile(): [UserProfile | null] {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    Api.get('profile', { data: null })
      .then((response: AxiosResponse<UserProfile>) => {
        return setProfile(response.data);
      })
      .catch(error => {
        console.log('🚀 ~ file: profile.tsx ~ line 14 ~ error', error);
      });
  }, []);

  return [profile];
}
