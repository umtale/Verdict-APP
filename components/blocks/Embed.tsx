import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { EmbedBlock } from '../../types';
import EmbedFacebook from './EmbedFacebook';
import EmbedInstagram from './EmbedInstagram';
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

      case 'instagram':
        embed = <EmbedInstagram block={this.props.block} />;
        break;

      case 'facebook':
        embed = <EmbedFacebook block={this.props.block} />;
        break;

      default:
        break;
    }

    return <View style={styles.container}>{embed}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
