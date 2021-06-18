import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { PostFull } from '../types';
import Button from './Button';
import WidgetTitle from './WidgetTitle';

export default function PostTags({ post }: { post: PostFull }) {
  return (
    <View style={styles.container}>
      <WidgetTitle text="linked" />
      <View style={styles.tags}>
        {post.tags.map(tag => (
          <Button
            key={tag.id}
            style={styles.tag}
            text={tag.name}
            pressable={{ onPress: () => {} }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    margin: 8,
  },
});
