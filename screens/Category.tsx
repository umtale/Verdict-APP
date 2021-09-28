import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostCard } from '../components/PostCard';
import { Post } from '../types';
import { usePostsList } from '../hooks/posts';
import { EventRegister } from 'react-native-event-listeners';
import PostScreen from './Post';

const Stack = createNativeStackNavigator();

export default function CategoryRoot() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={CategoryScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}

function CategoryScreen(props: any) {
  const [posts, fetchMore, refreshing, refresh] = usePostsList(
    props.route.params.path,
  );
  const renderItem = ({ item }: { item: Post }) => {
    return <PostCard post={item} screen="CategoryRoot" />;
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
