import React, { useState } from 'react';
import Moment from 'react-moment';
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import blocksStyles from '../components/blocks/styles';
import CategoryLink from '../components/CategoryLink';
import { EditorContent } from '../components/EditorContent';
import PostCounters from '../components/PostCounters';
import PostTags from '../components/PostTags';
import PrevNextPost from '../components/PrevNextPost';
import { Related } from '../components/Related';
import { TopLatest } from '../components/TopLatest';
import { cdnUrl } from '../helpers/url';
import { usePost } from '../hooks/posts';
import { Post } from '../types';

export default function PostScreen({ route }: any) {
  const window = useWindowDimensions();
  const [controlsOpened, setControlsOpened] = useState(false);
  const post: Post = route.params.post;
  const [postData] = usePost(post.slug);
  let authorRank = <View style={styles.authorRankLoading} />;
  let authorAvatar = <View style={styles.avatar} />;

  const onShare = async () => {
    try {
      await Share.share({
        title: post.title,
        message: post.shortContent,
        url: post.url,
      });
    } catch (error) {}
  };

  if (postData?.author) {
    authorRank = <Text>{postData?.author?.rank}</Text>;
    if (postData?.author.avatar?.url) {
      authorAvatar = (
        <Image
          source={{
            uri: cdnUrl(
              postData?.author.avatar.url,
              40 * window.scale,
              40 * window.scale,
            ),
          }}
          style={styles.avatar}
        />
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <CategoryLink category={post.category} />
        <Text style={styles.title}>{post.title}</Text>
      </View>
      <View style={styles.authorCard}>
        <View style={styles.author}>
          {authorAvatar}
          <View style={styles.authorContent}>
            <Text style={styles.authorName}>{post.author.displayName}</Text>
            {authorRank ? authorRank : ''}
            <Moment element={Text} format="MMM D, YYYY HH:mm a">
              {post.publishedAt}
            </Moment>
          </View>
        </View>
        <Pressable
          style={[styles.followButton, styles.button]}
          onPress={() => {}}>
          <Text style={styles.buttonText}>Follow</Text>
        </Pressable>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: cdnUrl(post.featured.url, window.width, window.width * 0.625),
          }}
          style={[
            styles.image,
            { width: window.width, height: window.width * 0.625 },
          ]}
        />
        <Text style={styles.imageSource}>source: {post.featured.source}</Text>
      </View>

      <View style={[styles.controls, styles.topControls]}>
        <PostCounters post={post} size={17} />
        <View style={styles.controlDivider} />
        <View style={styles.controlGroup}>
          <Pressable style={styles.control} onPress={onShare}>
            <Image
              style={styles.buttonIcon}
              width={15}
              height={15}
              source={require('./../static/share.png')}
            />
            <Text style={styles.controlText}>Share</Text>
          </Pressable>
          <Pressable
            style={styles.dropdownTrigger}
            onPress={() => {
              setControlsOpened(!controlsOpened);
            }}>
            <Image
              style={styles.buttonIcon}
              width={15}
              height={15}
              source={require('./../static/dots.png')}
            />
          </Pressable>
          {controlsOpened && (
            <View style={[styles.dropdownMenu]}>
              <Pressable style={styles.control} onPress={() => {}}>
                <Image
                  style={styles.buttonIcon}
                  width={15}
                  height={15}
                  source={require('./../static/flag.png')}
                />
                <Text style={styles.controlText}>Report</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {postData ? (
          <EditorContent post={postData} />
        ) : (
          <Text style={blocksStyles.text}>{post.shortContent}</Text>
        )}
      </View>

      <View style={[styles.controls, styles.bottomControls]}>
        <View style={styles.controlGroup}>
          <Pressable style={styles.control} onPress={onShare}>
            <Image
              style={styles.buttonIcon}
              width={15}
              height={15}
              source={require('./../static/share.png')}
            />
            <Text style={styles.controlText}>Share</Text>
          </Pressable>
          <Pressable style={styles.control} onPress={() => {}}>
            <Image
              style={styles.buttonIcon}
              width={15}
              height={15}
              source={require('./../static/flag.png')}
            />
            <Text style={styles.controlText}>Report</Text>
          </Pressable>
        </View>
      </View>

      {postData && <PostTags post={postData} />}
      {postData && <PrevNextPost post={postData} />}

      <Related post={post} />
      <TopLatest post={post} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 15,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 26,
    marginBottom: 15,
    marginTop: 10,
  },
  image: {
    backgroundColor: '#ddd',
  },
  imageContainer: {
    marginBottom: 7,
  },
  imageSource: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'right',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  authorCard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingBottom: 10,
  },
  followButton: {
    marginBottom: 10,
  },
  authorContent: {
    paddingLeft: 10,
  },
  authorName: {
    fontWeight: '700',
    fontSize: 18,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
  },
  authorRankLoading: {
    height: 17,
    width: 100,
    backgroundColor: '#ddd',
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ff4242',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 3,
    flexDirection: 'row',
  },
  buttonIcon: {
    width: 15,
    height: 15,
    marginRight: 7,
  },
  buttonText: {
    color: '#ff4242',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  topControls: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ff4242',
    zIndex: 5,
  },
  bottomControls: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ff4242',
    zIndex: 5,
  },
  controlGroup: {
    flexDirection: 'row',
  },
  control: {
    flexDirection: 'row',
    marginLeft: 7,
    paddingVertical: 10,
  },
  controlText: {
    color: '#ff4242',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginRight: 7,
  },
  controlDivider: {
    height: 15,
  },
  dropdownTrigger: {
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ translateY: 45 }],
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 10,
    zIndex: 4,
  },
});
