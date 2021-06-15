import React from 'react';
import { View } from 'react-native';
import { PostFull } from '../types';
import Embed from './blocks/Embed';
import { Heading } from './blocks/Heading';
import { Paragraph } from './blocks/Paragraph';

type EditorContentProps = {
  post: PostFull | null;
};

const postContent: any = {
  time: 1623406629804,
  blocks: [
    {
      type: 'embed',
      data: {
        service: 'youtube',
        source: 'https://www.youtube.com/watch?v=ghOacpdHYEA',
        embed: 'https://www.youtube.com/embed/ghOacpdHYEA',
        width: 580,
        height: 320,
        caption: '',
      },
    },
    {
      type: 'embed',
      data: {
        service: 'twitter',
        source: 'https://twitter.com/v1lat/status/1403281077440073728',
        embed:
          'https://twitframe.com/show?url=https://twitter.com/v1lat/status/1403281077440073728',
        width: 600,
        height: 300,
        caption: '',
      },
    },
    {
      type: 'embed',
      data: {
        service: 'instagram',
        source:
          'https://www.instagram.com/p/CBsVQt1JcH4jtfgPSpDx5SJ3hFHaw4YYbFQbaU0/',
        embed:
          'https://www.instagram.com/p/CBsVQt1JcH4jtfgPSpDx5SJ3hFHaw4YYbFQbaU0/embed',
        width: 400,
        height: 505,
        caption: '',
      },
    },
  ],
  version: '2.19.1',
};

export function EditorContent({ post }: EditorContentProps) {
  let content: JSX.Element[] = [];

  postContent.blocks.forEach((block, index) => {
    console.log('🚀 ~ ~ block', block.type);
    switch (block.type) {
      case 'paragraph':
        content.push(<Paragraph key={index} block={block} />);
        break;

      case 'header':
        content.push(<Heading key={index} block={block} />);
        break;

      case 'embed':
        content.push(<Embed key={index} block={block} />);
        break;

      default:
        break;
    }
  });

  return <View>{content}</View>;
}
