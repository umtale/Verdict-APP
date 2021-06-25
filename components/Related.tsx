import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { Post, PostFull } from '../types';
import { PostCard } from './PostCard';
import WidgetTitle from './WidgetTitle';

type RelatedProps = {
  post: PostFull | Post;
};

export function Related({ post }: RelatedProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`${Config.API_URL}posts/${post.slug}/related`)
      .then((response: any) => response.json())
      .then((json: { data: Post[] }) => setPosts(json.data))
      .catch((error: any) => console.error(error));
  }, [post.slug]);

  return (
    <View>
      <WidgetTitle text="related" />
      <View>
        {posts.map(item => (
          <PostCard key={item.id} post={item} />
        ))}
      </View>
    </View>
  );
}
