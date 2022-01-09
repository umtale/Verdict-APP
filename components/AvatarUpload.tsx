import React from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

interface AvatarUploadState {
  loading: boolean;
  url?: string;
}

export default class AvatarUpload extends React.Component<
  {},
  AvatarUploadState
> {
  private rotateValue;

  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      url: '',
    };
    this.rotateValue = new Animated.Value(0);
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  onPress() {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options).then(result => {
      if (result.assets) {
        result.assets.forEach(asset => {
          this.setState({ url: asset.uri });
          this.setState({ loading: false });
          // richText.current?.insertImage(
          //   'https://cdn.verdict.org/uploads/2021/11/396cf2cf3dff4ab7447998e438485c65.jpg?format=webp%2Cjpg&w=1626',
          //   'background: gray;',
          // );
          console.log('🚀 ~ file: AvatarUpload.tsx ~ line 26 ~ asset', asset);
        });
      }
    });
  }

  _rotateValue(value: any) {
    this.rotateValue.setValue(value);
  }

  _startAnimation() {
    // this.setState({ loading: true });
    this._rotateValue(0);
    Animated.timing(this.rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (this.state.loading) {
        this._startAnimation();
      } else {
        // this.didAnimation = false;
      }
    });
  }

  render() {
    this._startAnimation();
    return (
      <View style={styles.container}>
        <View style={styles.preview}>
          {!!this.state.loading && (
            <Animated.View
              style={{
                ...styles.loader,
                transform: [
                  {
                    rotateZ: this.rotateValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }}
            />
          )}
          {!!this.state.url && (
            <Image
              style={styles.previewImage}
              source={{
                uri: this.state.url,
              }}
            />
          )}
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={this.onPress.bind(this)}>
            <Text style={styles.buttonText}>Upload new</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.removeButtonText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  preview: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 50,
    marginRight: 15,
    overflow: 'hidden',
  },
  previewImage: {
    width: 90,
    height: 90,
    zIndex: 1,
  },
  buttons: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ff4242',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 15,
  },
  removeButtonText: {
    color: '#ff4242',
    paddingBottom: 10,
  },
  loader: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#ddd',
    borderBottomColor: 'transparent',
    borderWidth: 3,
    borderRadius: 15,
    top: 28,
    left: 28,
    zIndex: 2,
  },
});
