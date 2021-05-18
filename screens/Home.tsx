import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { PostCard } from '../components/PostCard';
import { Post } from '../types';
import { usePostsList } from '../hooks/posts';

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

function HomeScreen() {
  const [posts, fetchMore] = usePostsList();
  const renderItem = ({ item }: { item: Post }) => {
    return <PostCard post={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts?.data}
        renderItem={renderItem}
        onEndReachedThreshold={0.8}
        onEndReached={fetchMore}
      />
    </View>
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
