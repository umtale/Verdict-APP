import React from 'react';
import { StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

interface EditorState {
  height: number;
}

export default class Editor extends React.Component<{}, EditorState> {
  constructor(props: any) {
    super(props);

    this.state = {
      height: 250,
    };
  }

  onMessage(event: WebViewMessageEvent) {
    const data: { event: string; data: any } = JSON.parse(
      event.nativeEvent.data,
    );

    if (data.event === 'setHeight') {
      this.setHeight(data.data);
    }
  }

  setHeight(height: number) {
    this.setState({ height });
  }

  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'http://localhost:3001/app/editor/' }}
        style={[styles.editor, { height: this.state.height }]}
        incognito={true}
        onMessage={this.onMessage.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  editor: {
    borderColor: '#ddd',
    borderWidth: 1,
  },
});
