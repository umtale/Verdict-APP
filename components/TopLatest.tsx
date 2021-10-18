import React, { useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { Post, PostFull } from '../types';
import { PostCard } from './PostCard';
import WidgetTitleSwitch from './WidgetTitleSwitch';

type TopLatestProps = {
  post: Post | PostFull;
};

export function TopLatest({ post }: TopLatestProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [type, setType] = useState('top');

  useEffect(() => {
    let isMounted = true;
    fetch(
      `${Config.API_URL}posts/query/sidebar?termSlug=${post.category.slug}&type=${type}`,
    )
      .then((response: any) => response.json())
      .then((json: { data: Post[] }) => {
        if (isMounted) {
          setPosts(json.data);
        }
      })
      .catch((error: any) => console.error(error));

    return () => {
      isMounted = false;
    };
  }, [post.category.slug, type]);

  return (
    <View>
      <WidgetTitleSwitch
        options={[
          { text: 'top', value: 'top' },
          { text: 'latest', value: 'latest' },
        ]}
        onChange={value => {
          setType(value);
        }}
      />
      <View>
        {posts.map(item => (
          <PostCard key={item.id} post={item} />
        ))}
      </View>
    </View>
  );
}
