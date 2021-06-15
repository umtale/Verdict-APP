import React from 'react';
import { Text } from 'react-native';
import blocksStyles from './styles';

type HeadingProps = {
  block: {
    type: string;
    data: {
      level: 3 | 4 | 5;
      text: string;
    };
  };
};

export function Heading({ block }: HeadingProps) {
  let style: {};

  switch (block.data.level) {
    case 4:
      style = blocksStyles.h4;
      break;

    case 5:
      style = blocksStyles.h5;
      break;

    default:
      style = blocksStyles.h3;
      break;
  }
  return <Text style={style}>{block.data.text}</Text>;
}
