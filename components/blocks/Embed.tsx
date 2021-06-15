import React, { Component } from 'react';
import { View } from 'react-native';
import { EmbedBlock } from '../../types';
import EmbedTwitter from './EmbedTwitter';
import EmbedYoutube from './EmbedYoutube';

type EmbedProps = {
  block: EmbedBlock;
};

export default class Embed extends Component<EmbedProps> {
  render() {
    let embed;
    console.log(
      '🚀 ~ file: Embed.tsx ~ service',
      this.props.block.data.service,
    );
    switch (this.props.block.data.service) {
      case 'youtube':
        embed = <EmbedYoutube block={this.props.block} />;
        break;

      case 'twitter':
        embed = <EmbedTwitter block={this.props.block} />;
        break;

      default:
        break;
    }

    return <View>{embed}</View>;
  }
}
