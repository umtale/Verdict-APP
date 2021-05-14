import React from 'react';
import Moment from 'react-moment';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { cdnUrl } from '../helpers/url';

type Post = {
  slug: string;
  id: string;
  title: string;
  status: string;
  viewsCount: string;
  category: {
    slug: string;
    id: string;
    name: string;
    url: string;
  };
  featured: {
    id: string;
    name: string;
    path: string;
    source: string;
    size: {
      width: number;
      height: number;
    };
    url: string;
  };
  shortContent: string;
  author: {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    follow: boolean;
    displayName: string;
    url: string;
  };
  publishedAt: string;
  publishedAtDate: string;
  commentsCount: number;
  verdictValue: number;
  verdictUpdated: boolean | null;
  votesCount: number;
  url: string;
};

type PoscCardProps = {
  post: Post;
};

export function PostCard({ post }: PoscCardProps) {
  const { width } = Dimensions.get('window');

  return (
    <View>
      <Image
        source={{ uri: cdnUrl(post.featured.url, width, width * 0.625) }}
        style={{ width, height: width * 0.625 }}
      />
      <View style={styles.content}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.category}>{post.category.name}</Text>
            <View style={styles.categoryDecoration} />
          </View>
          <View style={styles.counters}>
            <View style={styles.counter}>
              <Image
                width={15}
                height={15}
                source={require('./../static/comment.png')}
              />
              <Text style={styles.counterText}>{post.votesCount}</Text>
            </View>
            <View style={styles.counter}>
              <Image
                width={15}
                height={15}
                source={require('./../static/vote.png')}
              />
              <Text style={styles.counterText}>{post.commentsCount}</Text>
            </View>
            <View style={styles.counter}>
              <Image
                width={15}
                height={15}
                source={require('./../static/eye.png')}
              />
              <Text style={styles.counterText}>{post.viewsCount}</Text>
            </View>
          </View>
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
  content: {
    padding: 10,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    fontWeight: '700',
    marginBottom: 2,
  },
  categoryDecoration: {
    width: 40,
    height: 3,
    backgroundColor: '#ff4242',
    marginBottom: 5,
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
