import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { PostCard } from '../components/PostCard';
import { Post } from '../types';
import { usePostsList } from '../hooks/posts';
import { EventRegister } from 'react-native-event-listeners';

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
  const navigation: any = useNavigation();
  const route = useRoute();

  return (
    <Pressable
      onPress={() => {
        navigation.emit({
          type: 'scrollToTop',
          target: route.key,
          canPreventDefault: false,
        });
      }}>
      <Image width={189} height={27} source={require('./../static/logo.jpg')} />
    </Pressable>
  );
}

export default function HomeRoot() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={headerSettings}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={headerSettings}
      />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const [posts, fetchMore, refreshing, refresh] = usePostsList();
  const renderItem = ({ item }: { item: Post }) => {
    return <PostCard post={item} />;
  };
  const ref = React.useRef<FlatList>(null);
  useEffect(() => {
    const listener = EventRegister.addEventListener('ScrollToTop', () => {
      ref.current?.scrollToOffset({ offset: 0, animated: true });
    });

    return () => {
      if (typeof listener === 'string') {
        EventRegister.removeEventListener(listener);
      }
    };
  });

  return (
    <FlatList
      refreshing={refreshing}
      removeClippedSubviews
      ref={ref}
      data={posts?.data}
      renderItem={renderItem}
      onEndReachedThreshold={0.8}
      onEndReached={fetchMore}
      onRefresh={refresh}
    />
  );
}

function CategoryScreen(props: any) {
  const [posts, fetchMore, refreshing, refresh] = usePostsList(
    props.route.params.path,
  );
  const renderItem = ({ item }: { item: Post }) => {
    return <PostCard post={item} />;
  };
  const ref = React.useRef<FlatList>(null);
  useEffect(() => {
    const listener = EventRegister.addEventListener('ScrollToTop', () => {
      ref.current?.scrollToOffset({ offset: 0, animated: true });
    });

    return () => {
      if (typeof listener === 'string') {
        EventRegister.removeEventListener(listener);
      }
    };
  });

  useEffect(() => {
    ref.current?.scrollToOffset({ offset: 0, animated: false });
  }, [props.route.params.path]);

  return (
    <FlatList
      refreshing={refreshing}
      removeClippedSubviews
      ref={ref}
      data={posts?.data}
      renderItem={renderItem}
      onEndReachedThreshold={0.8}
      onEndReached={fetchMore}
      onRefresh={refresh}
    />
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
