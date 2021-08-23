import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Config from 'react-native-config';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Follow from './follow';

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
      <View style={styles.authBlock}>
        <Pressable
          onPress={() => {
            props.navigation.navigate('AuthModal');
          }}
          style={styles.authLink}>
          <View style={styles.authIconWrap}>
            <Image
              style={styles.authIcon}
              width={15}
              height={15}
              source={require('./../static/user.png')}
            />
          </View>
          <Text style={styles.authText}>Login / Register</Text>
        </Pressable>
      </View>
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
  authBlock: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
  },
  authLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    padding: 10,
  },
  authText: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#696969',
  },
  authIconWrap: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#696969',
    padding: 7,
    marginRight: 7,
  },
  authIcon: {
    opacity: 0.5,
  },
});
