import { useCallback, useEffect, useState } from 'react';
import Config from 'react-native-config';
import { PostsList } from '../types';

export function usePostsList(
  category = 'posts',
): [PostsList | null, () => void] {
  const [posts, setPosts] = useState<PostsList | null>(null);
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [maxReached, setMaxReached] = useState(false);
  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    if (!shouldFetch || maxReached) {
      return;
    }

    let apiUrl = `${Config.API_URL}${category}`;

    if (page > 1) {
      apiUrl += `?page=${page}`;
    }

    setShouldFetch(false);

    fetch(apiUrl)
      .then((response: any) => response.json())
      .then((list: PostsList) => {
        if (list.pagination.pagesCount === page) {
          setMaxReached(true);
        }

        return setPosts(oldList => {
          if (oldList) {
            list.data = [...oldList.data, ...list.data];
          }

          return list;
        });
      });

    setPage(page + 1);
  }, [category, maxReached, page, shouldFetch]);

  return [posts, fetchMore];
}
