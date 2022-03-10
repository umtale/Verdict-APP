import React from 'react';
import {
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Api from '../helpers/api';
import { cdnUrl } from '../helpers/url';

interface ImageUploadState {
  loading: boolean;
  url?: string;
  value?: string;
}
interface ImageUploadProps {
  value?: string;
  onUploadSuccess?: () => void;
  onDelete?: () => void;
}

export default class ImageUpload extends React.Component<
  ImageUploadProps,
  ImageUploadState
> {
  private rotateValue;

  constructor(props: ImageUploadProps) {
    super(props);
    const image = props.value;

    this.state = {
      loading: false,
      value: props.value,
      url: image ? cdnUrl(image, 86, 86) : undefined,
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
          if (asset.uri) {
            this.setState({ url: asset.uri, loading: true });
            this._startAnimation();
            const data = new FormData();
            data.append('avatar', {
              name: asset.fileName,
              type: asset.type,
              uri:
                Platform.OS === 'ios'
                  ? asset.uri?.replace('file://', '')
                  : asset.uri,
            });

            // Api.put('profile/update-avatar', data).then(() => {
            //   this.setState({ loading: false, value: asset.uri });

            //   if (this.props.onUploadSuccess) {
            //     this.props.onUploadSuccess();
            //   }
            // });
          }
        });
      }
    });
  }

  _rotateValue(value: any) {
    this.rotateValue.setValue(value);
  }

  _startAnimation() {
    this._rotateValue(0);
    Animated.timing(this.rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (this.state.loading) {
        this._startAnimation();
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.preview}>
          {this.state.loading && (
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    paddingBottom: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  previewImage: {
    width: 86,
    height: 86,
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
