import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native';
import { PostCard } from '../components/PostCard';
import { Post } from '../types';
import { usePostsList } from '../hooks/posts';
import { EventRegister } from 'react-native-event-listeners';
import PostScreen from './Post';

const Stack = createStackNavigator();

export default function HomeRoot() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const [posts, fetchMore, refreshing, refresh] = usePostsList();
  const renderItem = ({ item }: { item: Post }) => {
    return <PostCard post={item} screen="HomeRoot" />;
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
