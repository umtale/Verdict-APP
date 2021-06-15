import React, { Component } from 'react';
import WebView from 'react-native-webview';
import { EmbedBlock } from '../../types';

type EmbedProps = {
  block: EmbedBlock;
};

class EmbedTwitterComponent extends Component<EmbedProps> {
  render(): any {
    // useEffect(() => {
    //   fetch(`${Config.API_URL}menu/header`)
    //     .then((response: any) => response.json())
    //     .then((json: MenuData) => setMenu(json))
    //     .catch((error: any) => console.error(error));
    // }, []);
    const script = `
      const frame = document.getElementById('embed');
      frame.addEventListener('load', () => {
        window.ReactNativeWebView.postMessage('Load');
      });
  `;

    let source = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </head>
    <body>
      <iframe id="embed" border="0" frameborder="0" height="400" width="800" src="${this.props.block.data.embed}"></iframe>
    </body>
    </html>`;

    const onWebViewMessage = (e) => {
      console.log(`🚀 ~ file: Embed.tsx ~ line 62 ~ e`, e);

      // var message = parseMessage(e.nativeEvent.data);
      // if (message && message.height) {
      //     this.setState({
      //         height: message.height,
      //         aspectRatio: null
      //     });
      // }
    };

    return (
      <WebView
        useWebKit={true}
        scrollEnabled={false}
        source={{ html: source }}
        style={{ height: 400 }}
        onMessage={onWebViewMessage}
        javaScriptEnabled={true}
        injectedJavaScript={script}
      />
    );
  }
}

export default function EmbedTwitter(props: { block: EmbedBlock }) {
  return <EmbedTwitterComponent {...props} />;
}
