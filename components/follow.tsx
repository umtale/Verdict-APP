import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Image, Pressable, View } from 'react-native';
import WidgetTitle from './WidgetTitle';

export default function Follow() {
  return (
    <View>
      <WidgetTitle text="follow verdict" />
      <View style={styles.links}>
        <Pressable
          style={[styles.link, styles.facebookBg]}
          onPress={() =>
            Linking.openURL('https://www.facebook.com/VerdictNews/')
          }>
          <Image
            style={styles.icon}
            width={30}
            height={30}
            source={require('./../static/facebook.png')}
          />
        </Pressable>
        <Pressable
          style={[styles.link, styles.twitterBg]}
          onPress={() => Linking.openURL('https://twitter.com/verdict_news/')}>
          <Image
            style={styles.icon}
            width={30}
            height={30}
            source={require('./../static/twitter.png')}
          />
        </Pressable>
        <Pressable
          style={[styles.link, styles.instagramBg]}
          onPress={() =>
            Linking.openURL('https://www.instagram.com/verdictnews/')
          }>
          <Image
            style={styles.icon}
            width={30}
            height={30}
            source={require('./../static/instagram.png')}
          />
        </Pressable>
      </View>
      <View style={styles.links}>
        <Pressable
          style={[styles.link, styles.pinterestBg]}
          onPress={() =>
            Linking.openURL('https://www.pinterest.com/VerdictNews/')
          }>
          <Image
            style={styles.icon}
            width={30}
            height={30}
            source={require('./../static/pinterest.png')}
          />
        </Pressable>
        <Pressable
          style={[styles.link, styles.feedburnerBg]}
          onPress={() =>
            Linking.openURL('https://feeds.feedburner.com/VerdictNews/')
          }>
          <Image
            style={styles.icon}
            width={30}
            height={30}
            source={require('./../static/feedburner.png')}
          />
        </Pressable>
        <Pressable
          style={[styles.link, styles.feedBg]}
          onPress={() => Linking.openURL('https://verdict.org/feed/')}>
          <Image
            style={styles.icon}
            width={30}
            height={30}
            source={require('./../static/feed.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  link: {
    borderRadius: 25,
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  facebookBg: {
    backgroundColor: '#3b5998',
  },
  twitterBg: {
    backgroundColor: '#55acee',
  },
  instagramBg: {
    backgroundColor: '#6a453b',
  },
  pinterestBg: {
    backgroundColor: '#cb2027',
  },
  feedburnerBg: {
    backgroundColor: '#0075bf',
  },
  feedBg: {
    backgroundColor: '#f26522',
  },
});
