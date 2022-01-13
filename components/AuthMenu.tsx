import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../AuthProvider';

export function AuthMenu() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigation: any = useNavigation();

  return (
    <View>
      <View style={styles.authBlock}>
        <Pressable
          onPress={() => {
            if (auth) {
              navigation.navigate('ProfileRoot', { screen: 'ProfileHome' });
            } else {
              navigation.navigate('AuthModal');
            }
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
          <Text style={styles.authText}>
            {auth ? 'Dashboard' : 'Login / Register'}
          </Text>
        </Pressable>
        {auth && (
          <Pressable
            onPress={() => {
              setAuth(null);
            }}
            style={styles.authLink}>
            <Text style={styles.authText}>Logout</Text>
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            navigation.navigate('Root', {
              screen: 'AddPost',
              initial: false,
            });
          }}
          style={styles.authLink}>
          <Text style={styles.authText}>add post</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authBlock: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    marginTop: 5,
  },
  authLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    padding: 15,
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
