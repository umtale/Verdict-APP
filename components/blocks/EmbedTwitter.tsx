import React, { Component } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text } from 'react-native';
import WebView from 'react-native-webview';
import { EmbedBlock } from '../../types';

type EmbedProps = {
  block: EmbedBlock;
};

type TwitWidget = {
  author_name: string;
  author_url: string;
  cache_age: string;
  height: number;
  html: string;
  provider_name: string;
  provider_url: string;
  type: string;
  url: string;
  version: string;
  width: 550;
};

export default class EmbedTwitter extends Component<
  EmbedProps,
  { widget?: TwitWidget; height: number }
> {
  constructor(props: EmbedProps) {
    super(props);
    this.state = {
      widget: undefined,
      height: 300,
    };
  }

  componentDidMount() {
    fetch(
      `https://publish.twitter.com/oembed?url=${this.props.block.data.source}`,
    )
      .then((response: any) => response.json())
      .then((result: TwitWidget) => {
        this.setState({ widget: result });
      });
  }

  render(): any {
    const script = `
      window.addEventListener('load', () => {
        twttr.events.bind(
          'loaded',
          (e) => {
            window.ReactNativeWebView.postMessage(document.scrollingElement.scrollHeight);
          },
        );
      });
    `;

    let source = `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body style="margin: 0">
        ${this.state.widget?.html}
      </body>
      </html>
    `;

    const onWebViewMessage = (e: any) => {
      this.setState({ height: parseInt(e.nativeEvent.data, 10) });
    };

    return this.state.widget ? (
      <WebView
        useWebKit={true}
        scrollEnabled={false}
        source={{ html: source }}
        style={{ height: this.state.height }}
        onMessage={onWebViewMessage}
        javaScriptEnabled={true}
        injectedJavaScript={script}
      />
    ) : (
      <Pressable
        style={styles.loader}
        onPress={() => {
          Linking.openURL(this.props.block.data.source);
        }}>
        <Image
          source={require('./../../static/twitter-logo.png')}
          style={styles.loaderImage}
        />
        <Text style={styles.loaderText}>Open tweet in browser</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    maxWidth: 550,
    height: 300,
    borderWidth: 1,
    borderColor: '#c4cfd6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderImage: {
    width: 70,
    height: 57,
  },
  loaderText: {
    color: '#1da1f2',
    fontWeight: '700',
    marginTop: 10,
  },
});
