import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import Moment from 'react-moment';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { cdnUrl } from '../helpers/url';
import { Post } from '../types';
import CategoryLink from './CategoryLink';
import PostCounters from './PostCounters';

type PoscCardProps = {
  post: Post;
  screen?: string;
};

export function PostCard({ post }: PoscCardProps) {
  const window = useWindowDimensions();
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          const pushAction = StackActions.push('Post', {
            post,
          });
          navigation.dispatch(pushAction);
        }}>
        <Image
          source={{
            uri: cdnUrl(post.featured.url, window.width, window.width * 0.625),
          }}
          style={[
            styles.image,
            { width: window.width, height: window.width * 0.625 },
          ]}
        />
      </Pressable>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <CategoryLink category={post.category} />
          <PostCounters post={post} />
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <View>
          <Text style={styles.author}>
            By: {post.author.displayName} on{' '}
            <Moment element={Text} format="MMM D, YYYY HH:mm a">
              {post.publishedAt}
            </Moment>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  content: {
    padding: 10,
  },
  image: {
    backgroundColor: '#ddd',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counters: {
    display: 'flex',
    flexDirection: 'row',
  },
  counter: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 7,
  },
  counterText: {
    fontWeight: '700',
    lineHeight: 14,
    fontSize: 12,
    paddingLeft: 3,
  },
  author: {
    fontWeight: '700',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 10,
  },
});
