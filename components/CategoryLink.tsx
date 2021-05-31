import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Category } from '../types';

type CategoryLinkProps = {
  category: Category;
};

export default function CategoryLink({ category }: CategoryLinkProps) {
  const navigation: any = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('CategoryRoot', {
          screen: 'Index',
          key: category.slug,
          params: { path: category.slug },
          initial: false,
        });
      }}>
      <Text style={styles.category}>{category.name}</Text>
      <View style={styles.categoryDecoration} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  category: {
    fontWeight: '700',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  categoryDecoration: {
    width: 40,
    height: 3,
    backgroundColor: '#ff4242',
    marginBottom: 5,
  },
});
