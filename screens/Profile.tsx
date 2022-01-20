import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { cdnUrl } from '../helpers/url';
import ProfilePosts from './profile/Posts';
import { useNavigation } from '@react-navigation/core';
import { ProfileSettings } from './profile/Settings';
import AppContext from '../context/context';

const Stack = createNativeStackNavigator();

export default function ProfileRoot() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileHome" component={ProfileHome} />
      <Stack.Screen name="ProfilePosts" component={ProfilePosts} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
    </Stack.Navigator>
  );
}

function ProfileHome() {
  const { profile } = useContext(AppContext);
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: cdnUrl(
                profile?.avatar?.path ||
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
      <View style={styles.navigationContainer}>
        <Pressable
          style={styles.navLink}
          onPress={() => {
            navigation.navigate('ProfileRoot', {
              screen: 'ProfilePosts',
            });
          }}>
          <Image
            style={styles.navLinkIcon}
            width={18}
            height={18}
            source={require('./../static/posts.png')}
          />
          <Text style={styles.navLinkText}>Posts</Text>
        </Pressable>
        <Pressable style={styles.navLink}>
          <Image
            style={styles.navLinkIcon}
            width={18}
            height={18}
            source={require('./../static/comments.png')}
          />
          <Text style={styles.navLinkText}>Comments</Text>
        </Pressable>
        <Pressable style={styles.navLink}>
          <Image
            style={styles.navLinkIcon}
            width={18}
            height={18}
            source={require('./../static/bookmarks.png')}
          />
          <Text style={styles.navLinkText}>Bookmarks</Text>
        </Pressable>
        <Pressable style={styles.navLink}>
          <Image
            style={styles.navLinkIcon}
            width={18}
            height={18}
            source={require('./../static/followers.png')}
          />
          <Text style={styles.navLinkText}>Followers</Text>
        </Pressable>
        <Pressable style={styles.navLink}>
          <Image
            style={styles.navLinkIcon}
            width={18}
            height={18}
            source={require('./../static/following.png')}
          />
          <Text style={styles.navLinkText}>Following</Text>
        </Pressable>
        <Pressable style={styles.navLink}>
          <Image
            style={styles.navLinkIcon}
            width={18}
            height={18}
            source={require('./../static/notiffications.png')}
          />
          <Text style={styles.navLinkText}>Notifications</Text>
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => {
            navigation.navigate('ProfileRoot', {
              screen: 'ProfileSettings',
            });
          }}>
          <Image
            style={styles.navLinkIcon}
            width={18}
            height={18}
            source={require('./../static/settings.png')}
          />
          <Text style={styles.navLinkText}>Settings</Text>
        </Pressable>
        <Pressable style={styles.navLink}>
          <Image
            style={styles.navLinkIcon}
            width={18}
            height={18}
            source={require('./../static/sign-out.png')}
          />
          <Text style={styles.navLinkText}>Logout</Text>
        </Pressable>
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
    marginBottom: 20,
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
  navigationContainer: {
    padding: 10,
  },
  navLink: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  navLinkIcon: {
    marginRight: 6,
  },
  navLinkText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 18,
    color: '#1c1c1c',
  },
});
