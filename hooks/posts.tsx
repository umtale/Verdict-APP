import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Api from '../helpers/api';
import { Post, PostFull, PostsList } from '../types';

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

    let apiUrl = `${category}`;

    if (page > 1) {
      apiUrl += `?page=${page}`;
    }

    setShouldFetch(false);

    Api.get(apiUrl).then((response: AxiosResponse<PostsList>) => {
      if (response.data.pagination.pagesCount === page) {
        setMaxReached(true);
      }

      setRefreshing(false);

      return setPosts(oldList => {
        if (oldList) {
          response.data.data = [...oldList.data, ...response.data.data];
        }

        return response.data;
      });
    });

    setPage(page + 1);
  }, [category, maxReached, page, shouldFetch, refreshing]);

  return [posts, fetchMore, refreshing, refresh];
}

export function usePost(slug: string): [PostFull | null] {
  const [post, setPost] = useState<PostFull | null>(null);

  useEffect(() => {
    let isMounted = true;
    let apiUrl = `${slug}`;
    Api.get(apiUrl).then(
      (
        response: AxiosResponse<{
          data: PostFull;
          previous: Post;
          next: Post;
          success: boolean;
        }>,
      ) => {
        response.data.data.previous = response.data.previous;
        response.data.data.next = response.data.next;

        if (isMounted) {
          setPost(response.data.data);
        }
      },
    );

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return [post];
}
