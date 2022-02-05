import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

interface EditorState {
  height: number;
  counter: number;
  value: string;
  minValid: boolean;
}

export default class Editor extends React.Component<{}, EditorState> {
  constructor(props: any) {
    super(props);

    this.state = {
      height: 250,
      counter: 0,
      value: '',
      minValid: true,
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
    const config = `
      window.editorPlaceholder = "at least 350 words, 6-7 paragraphs, 1-3 sentences per paragraph, Verdict's Terms of Service compliant";
      window.editorMin = 350;
      window.editorContent = '';
      window.initEditor();
      true; // note: this is required, or you'll sometimes get silent failures
    `;

    return (
      <View>
        <WebView
          originWhitelist={['*']}
          source={{ uri: 'http://localhost:3001/app/editor/' }}
          style={[styles.editor, { height: this.state.height }]}
          incognito={true}
          onMessage={this.onMessage.bind(this)}
          injectedJavaScript={config}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editor: {
    borderColor: '#ddd',
    borderWidth: 1,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 3,
    backgroundColor: '#fff',
  },
  counterSeparator: {
    width: 2,
    height: 12,
    backgroundColor: '#909090',
    marginLeft: 4,
    marginRight: 4,
    marginTop: 1,
    transform: [
      {
        rotateZ: '20deg',
      },
    ],
  },
  counterNumber: {
    fontWeight: '600',
    fontSize: 12,
  },
  invalidColor: {
    color: '#ff4242',
  },
  validColor: {
    color: '#000',
  },
});
