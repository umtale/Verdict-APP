import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Text } from 'react-native';

export function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <Text>This is bottom text.</Text>
    </DrawerContentScrollView>
  );
}
