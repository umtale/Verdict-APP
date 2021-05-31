import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { Author } from '../types';

export function useAuthor(slug: string): [Author | null] {
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    let apiUrl = `${Config.API_URL}author/${slug}`;

    fetch(apiUrl)
      .then((response: any) => response.json())
      .then((response: { data: Author; success: boolean }) => {
        return setAuthor(response.data);
      });
  }, [slug]);

  return [author];
}
