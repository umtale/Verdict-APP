import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { PostCard } from '../components/PostCard';

const Stack = createStackNavigator();

const headerSettings = {
  headerTitle: (props: any) => <LogoTitle {...props} />,
  headerLeft: () => <Hamburger />,
};

function Hamburger() {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={styles.hamburger}
      onPress={navigation.toggleDrawer}
      activeOpacity={0.5}>
      <Image
        width={27}
        height={27}
        source={require('./../static/hamburger.png')}
      />
    </TouchableOpacity>
  );
}

function LogoTitle() {
  return (
    <Image width={189} height={27} source={require('./../static/logo.jpg')} />
  );
}

export default function HomeRoot() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={headerSettings}
      />
    </Stack.Navigator>
  );
}

const post = {
  slug: 'university-rresident-truly-sorry-for-using-admirals-quote-in-sreesh-failing-to-site-him-3322',
  id: '3322',
  title:
    "University  рresident  'truly  sоrry'  fоr  using  аdmirаl's  quоte  in  sрeeсh,  fаiling  tо  сite  him",
  status: 'Published',
  viewsCount: '1',
  category: {
    slug: 'us',
    id: '10',
    name: 'U.S.',
    url: 'https://verdict.org/us/',
  },
  featured: {
    id: '3690',
    name: 'b27756e4f3684db5a20448d01ab76151.jpg',
    path: '/uploads/2021/41/b27756e4f3684db5a20448d01ab76151.jpg',
    source: 'https://ibb.co/kGvd2KM',
    size: {
      width: 1500,
      height: 788,
    },
    url: 'https://cdn.verdict.org/uploads/2021/41/b27756e4f3684db5a20448d01ab76151.jpg',
  },
  shortContent:
    "The University of South Carolina's president issued an apology after part of his commencement address was pulled almost...",
  author: {
    id: 'd2ff715f-85a5-4b56-927e-ba79a0cfc4b8',
    slug: 'mohd-adnan-d2ff715f-85a5-4b56-927e-ba79a0cfc4b8',
    firstName: 'MOHD',
    lastName: 'ADNAN',
    follow: false,
    displayName: 'MOHD ADNAN',
    url: 'https://verdict.org/m/mohd-adnan-d2ff715f-85a5-4b56-927e-ba79a0cfc4b8/posts/',
  },
  publishedAt: '2021-05-13T17:03:37-04:00',
  publishedAtDate: '2021-05-13T21:03:37.000Z',
  commentsCount: 0,
  verdictValue: 0,
  verdictUpdated: null,
  votesCount: 0,
  url: 'https://verdict.org/university-rresident-truly-sorry-for-using-admirals-quote-in-sreesh-failing-to-site-him-3322/',
};

function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic">
      <PostCard post={post} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburger: {
    marginLeft: 15,
  },
});
