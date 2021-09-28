import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Config from 'react-native-config';
import { StyleSheet } from 'react-native';
import Follow from './follow';
import { AuthMenu } from './AuthMenu';

interface MenuData {
  data: {
    path: string;
    title: string;
  }[];
}

export function CustomDrawerContent(props: any) {
  const [menu, setMenu] = useState<MenuData | null>(null);

  useEffect(() => {
    fetch(`${Config.API_URL}menu/header`)
      .then((response: any) => response.json())
      .then((json: MenuData) => setMenu(json))
      .catch((error: any) => console.error(error));
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <AuthMenu />
      {menu?.data.map((item, index) => {
        return (
          <DrawerItem
            key={index}
            style={styles.menuItem}
            labelStyle={styles.menuItemText}
            label={item.title}
            onPress={() => {
              if (item.path === 'news') {
                props.navigation.navigate('HomeRoot', {
                  screen: 'Home',
                  key: item.path,
                  params: { path: item.path },
                  initial: false,
                });
              } else {
                props.navigation.navigate('CategoryRoot', {
                  screen: 'Index',
                  key: item.path,
                  params: { path: item.path },
                  initial: false,
                });
              }
            }}
          />
        );
      })}
      <Follow />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 0,
    marginVertical: 0,
  },
  menuItemText: {
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },
});
