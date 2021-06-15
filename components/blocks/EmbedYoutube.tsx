import React, { Component } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Config from 'react-native-config';
import YouTube from 'react-native-youtube';
import { EmbedBlock, EmbedProps } from '../../types';

class EmbedYoutubeComponent extends Component<EmbedProps> {
  render() {
    const Player: any = YouTube; // fix for react-native-youtube v2.0.1. Incorrect props types
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\S\/|embed\/|watch))(?:(?:[?&][\w%-;]*=?[\w%-;]*)*(?:v=))?([\w-]*)?((?:[?&][\w%-;]*=?[\w%-;]*)*)/gim;
    const match = regex.exec(this.props.block.data.source);
    let youtubeId = '';

    if (match && match[1]) {
      youtubeId = match[1];
      return (
        <Player
          videoId={youtubeId}
          apiKey={Config.YOUTUBE_API_KEY}
          style={{ height: this.props.window.width * 0.5625 }}
        />
      );
    }

    return <View />;
  }
}

export default function EmbedYoutube(props: { block: EmbedBlock }) {
  const window = useWindowDimensions();
  return <EmbedYoutubeComponent window={window} {...props} />;
}
