import React, { Component } from 'react';
import WebView from 'react-native-webview';
import { EmbedBlock } from '../../types';

type EmbedProps = {
  block: EmbedBlock;
};

export default class EmbedFacebook extends Component<
  EmbedProps,
  { height: number }
> {
  constructor(props: EmbedProps) {
    super(props);
    this.state = {
      height: 300,
    };
  }

  render(): any {
    const script = `
      const container = document.querySelector('#facebook-embed');
      const resizeObserver = new ResizeObserver(entries => {
        window.ReactNativeWebView.postMessage(document.scrollingElement.scrollHeight);
      });
      resizeObserver.observe(container);
    `;

    let source = `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body style="margin: 0">
      <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0"></script>
      <div id="facebook-embed">
        <div class="fb-post" data-href="${this.props.block.data.source}" data-width="500" data-show-text="true">
          <blockquote cite="${this.props.block.data.source}" class="fb-xfbml-parse-ignore"></blockquote>
        </div>
      </div>
      </body>
      </html>
    `;

    const onWebViewMessage = (e: any) => {
      this.setState({ height: parseInt(e.nativeEvent.data, 10) });
    };

    return (
      <WebView
        useWebKit={true}
        scrollEnabled={false}
        source={{ html: source }}
        style={{ height: this.state.height }}
        onMessage={onWebViewMessage}
        javaScriptEnabled={true}
        injectedJavaScript={script}
      />
    );
  }
}
