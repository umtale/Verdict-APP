import { StackActions, useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { PostFull } from '../types';

export default function PrevNextPost({ post }: { post: PostFull }) {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      {post.previous && (
        <Pressable
          style={styles.link}
          onPress={() => {
            const pushAction = StackActions.push('Post', {
              post: post.previous,
            });
            navigation.dispatch(pushAction);
          }}>
          <Image
            style={[styles.arrow, styles.arrowLeft]}
            width={17}
            height={40}
            source={require('./../static/angle-left.png')}
          />
          <View style={styles.linkContent}>
            <Text style={styles.label}>Previous post</Text>
            <Text style={styles.postTitle}>{post.previous.title}</Text>
          </View>
        </Pressable>
      )}
      {post.next && (
        <Pressable
          style={styles.link}
          onPress={() => {
            const pushAction = StackActions.push('Post', {
              post: post.next,
            });
            navigation.dispatch(pushAction);
          }}>
          <View style={styles.linkContent}>
            <Text style={[styles.label, styles.alignRight]}>Next post</Text>
            <Text style={[styles.postTitle, styles.alignRight]}>
              {post.next.title}
            </Text>
          </View>
          <Image
            style={[styles.arrow, styles.arrowRight]}
            width={17}
            height={40}
            source={require('./../static/angle-right.png')}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  link: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  label: {
    color: '#7b7b7b',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 5,
  },
  linkContent: {
    flex: 1,
  },
  postTitle: {
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 25,
  },
  arrow: {
    width: 17,
    height: 40,
    marginTop: 26,
  },
  arrowLeft: {
    marginRight: 10,
  },
  arrowRight: {
    marginLeft: 10,
  },
  alignRight: {
    textAlign: 'right',
  },
});
