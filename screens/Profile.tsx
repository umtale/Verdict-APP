import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useProfile } from '../hooks/profile';
import { cdnUrl } from '../helpers/url';

const Stack = createNativeStackNavigator();

export default function ProfileRoot() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileHome" component={ProfileHome} />
    </Stack.Navigator>
  );
}

function ProfileHome() {
  const [profile] = useProfile();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: cdnUrl(
                'assets/img/default/default-avatar-big.png',
                150,
                150,
              ),
            }}
            style={styles.avatarImg}
          />
        </View>
        <Text style={styles.name}>
          {profile?.firstName} {profile?.lastName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 35,
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 75,
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    marginBottom: 10,
    overflow: 'hidden',
  },
  avatarImg: {
    width: 146,
    height: 146,
    borderRadius: 75,
  },
  name: {
    fontWeight: '700',
    fontSize: 25,
  },
});
