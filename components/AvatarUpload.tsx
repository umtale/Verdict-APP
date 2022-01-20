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

interface AvatarUploadState {
  loading: boolean;
  url?: string;
  value?: string;
}
interface AvatarUploadProps {
  value?: string;
  onUploadSuccess?: () => void;
  onDelete?: () => void;
}

export default class AvatarUpload extends React.Component<
  AvatarUploadProps,
  AvatarUploadState
> {
  private rotateValue;

  constructor(props: AvatarUploadProps) {
    super(props);
    const avatar = props.value || 'assets/img/default/default-avatar-big.png';
    this.state = {
      loading: false,
      value: props.value,
      url: cdnUrl(avatar, 86, 86),
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

            Api.put('profile/update-avatar', data).then(() => {
              this.setState({ loading: false, value: asset.uri });

              if (this.props.onUploadSuccess) {
                this.props.onUploadSuccess();
              }
            });
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

  deleteAvatar() {
    this.setState({ loading: true });
    this._startAnimation();

    Api.post('profile/remove-avatar', {}).finally(() => {
      this.setState({
        loading: false,
        value: undefined,
        url: cdnUrl('assets/img/default/default-avatar-big.png', 86, 86),
      });

      if (this.props.onDelete) {
        this.props.onDelete();
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
          {!!this.state.value && (
            <Pressable onPress={this.deleteAvatar.bind(this)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          )}
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
