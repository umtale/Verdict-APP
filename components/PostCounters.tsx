import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Post } from '../types';

type PostCountersProps = {
  post: Post;
  size?: number;
};

export default function PostCounters({ post, size }: PostCountersProps) {
  return (
    <View style={styles.counters}>
      <View style={styles.counter}>
        <Image
          style={{ width: size, height: size }}
          width={size || 15}
          height={size || 15}
          source={require('./../static/comment.png')}
        />
        <Text style={styles.counterText}>{post.votesCount}</Text>
      </View>
      <View style={styles.counter}>
        <Image
          style={{ width: size, height: size }}
          width={size || 15}
          height={size || 15}
          source={require('./../static/vote.png')}
        />
        <Text style={styles.counterText}>{post.commentsCount}</Text>
      </View>
      <View style={styles.counter}>
        <Image
          style={{ width: size, height: size }}
          width={size || 15}
          height={size || 15}
          source={require('./../static/eye.png')}
        />
        <Text style={styles.counterText}>{post.viewsCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counters: {
    display: 'flex',
    flexDirection: 'row',
  },
  counter: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 7,
    alignItems: 'center',
  },
  counterText: {
    fontWeight: '700',
    lineHeight: 14,
    fontSize: 12,
    paddingLeft: 3,
  },
});
