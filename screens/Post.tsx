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
import Comments from '../components/Comments';
import { EditorContent } from '../components/EditorContent';
import Footer from '../components/Footer';
import PostCounters from '../components/PostCounters';
import PostTags from '../components/PostTags';
import PrevNextPost from '../components/PrevNextPost';
import { Related } from '../components/Related';
import { TopLatest } from '../components/TopLatest';
import { cdnUrl } from '../helpers/url';
import { usePost } from '../hooks/posts';
import { Post } from '../types';
// const data = {
//   slug: 'real-life-guardians-of-the-galaxy-announced-with-us-space-force-1758',
//   id: '1758',
//   verdictOption: 'AGREE/DISAGREE',
//   title: 'Real Life “Guardians” Of The Galaxy Announced With US Space Force',
//   subtitle: null,
//   status: 'Published',
//   viewsCount: '56',
//   category: {
//     slug: 'us',
//     id: '10',
//     name: 'U.S.',
//     taxonomy: 'Category',
//     url: 'https://verdict.org/us/',
//   },
//   tags: [
//     {
//       slug: 'united-states',
//       id: '5766',
//       name: 'united states',
//       taxonomy: 'Tag',
//       url: 'https://verdict.org/l/united-states/',
//     },
//     {
//       slug: 'space-force',
//       id: '8470',
//       name: 'space force',
//       taxonomy: 'Tag',
//       url: 'https://verdict.org/l/space-force/',
//     },
//     {
//       slug: 'vice-president-pence',
//       id: '8957',
//       name: 'vice president pence',
//       taxonomy: 'Tag',
//       url: 'https://verdict.org/l/vice-president-pence/',
//     },
//     {
//       slug: 'gur',
//       id: '8964',
//       name: 'gur',
//       taxonomy: 'Tag',
//       url: 'https://verdict.org/l/gur/',
//     },
//   ],
//   tagsSequence: null,
//   cropData: null,
//   featured: {
//     id: '1912',
//     name: '1de4d9def5e20ad857280468508c0083.jpg',
//     path: '/uploads/2021/01/1de4d9def5e20ad857280468508c0083.jpg',
//     source: 'Pixabay',
//     size: { width: 460, height: 460 },
//     url: 'https://cdn.verdict.org/uploads/2021/01/1de4d9def5e20ad857280468508c0083.jpg',
//   },
//   shortContent:
//     'The United States now has its own "Guardians of the Galaxy."  No, not the type with characters such as Groot or Rocket...',
//   author: {
//     id: 'c9c478da-49bf-4f2b-a69f-6505a1cfef75',
//     slug: 'tracy-few-c9c478da-49bf-4f2b-a69f-6505a1cfef75',
//     firstName: 'Tracy',
//     lastName: 'Few',
//     medal: null,
//     points: 0,
//     rank: 'Member',
//     avatar: {
//       id: '135',
//       name: '2bfcb8539109ae8ce228f702411e142b-c9c478da-49bf-4f2b-a69f-6505a1cfef75.jpg',
//       path: '/uploads/avatar/2bfcb8539109ae8ce228f702411e142b-c9c478da-49bf-4f2b-a69f-6505a1cfef75.jpg',
//       source: 'Tracy Few',
//       size: { width: 460, height: 460 },
//       url: 'https://cdn.verdict.org/uploads/avatar/2bfcb8539109ae8ce228f702411e142b-c9c478da-49bf-4f2b-a69f-6505a1cfef75.jpg',
//     },
//     verdictsCount: 0,
//     postsCount: 0,
//     followersCount: 0,
//     commentsCount: 0,
//     follow: false,
//     displayName: 'Tracy Few',
//     url: 'https://verdict.org/m/tracy-few-c9c478da-49bf-4f2b-a69f-6505a1cfef75/posts/',
//   },
//   publishedAt: '2020-12-18T13:23:00-05:00',
//   publishedAtDate: '2020-12-18T18:23:00.000Z',
//   commentsCount: 4,
//   verdictValue: 37,
//   verdictUpdated: '2021-01-27T04:16:31.000Z',
//   votesCount: 27,
//   reaction: 'DISAGREE',
//   displayInFeed: true,
//   url: 'https://verdict.org/real-life-guardians-of-the-galaxy-announced-with-us-space-force-1758/',
// };

export default function PostScreen({ route }: any) {
  const window = useWindowDimensions();
  const [controlsOpened, setControlsOpened] = useState(false);
  const post: Post = route.params.post;
  // const post: Post = data;
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
      <Comments post={post} />
      <TopLatest post={post} />
      <Footer />
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
