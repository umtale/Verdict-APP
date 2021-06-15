import { useCallback, useEffect, useState } from 'react';
import Config from 'react-native-config';
import { PostFull, PostsList } from '../types';

export function usePostsList(
  category = 'posts',
): [PostsList | null, () => void, boolean, () => void] {
  const [posts, setPosts] = useState<PostsList | null>(null);
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [maxReached, setMaxReached] = useState(false);
  const fetchMore = useCallback(() => setShouldFetch(true), []);
  const refresh = useCallback(() => {
    setShouldFetch(false);
    setMaxReached(false);
    setPosts(null);
    setShouldFetch(true);
    setRefreshing(true);
    return setPage(1);
  }, []);

  useEffect(() => {
    setShouldFetch(false);
    setMaxReached(false);
    setPosts(null);
    setShouldFetch(true);
    return setPage(1);
  }, [category]);

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

        setRefreshing(false);

        return setPosts(oldList => {
          if (oldList) {
            list.data = [...oldList.data, ...list.data];
          }

          return list;
        });
      });

    setPage(page + 1);
  }, [category, maxReached, page, shouldFetch, refreshing]);

  return [posts, fetchMore, refreshing, refresh];
}

export function usePost(slug: string): [PostFull | null] {
  const [post, setPost] = useState<PostFull | null>(null);

  useEffect(() => {
    let apiUrl = `${Config.API_URL}${slug}`;

    fetch(apiUrl)
      .then((response: any) => response.json())
      .then((response: { data: PostFull; success: boolean }) => {
        return setPost(response.data);
      });
  }, [slug]);

  return [post];
}
