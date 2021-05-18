import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Config from 'react-native-config';

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
      {menu?.data.map((item, index) => {
        return (
          <DrawerItem
            key={index}
            label={item.title}
            onPress={() => {
              props.navigation.navigate('Home', { path: item.path });
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}
