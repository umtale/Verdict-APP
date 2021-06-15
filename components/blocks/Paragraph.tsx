import { HtmlParseAndView } from '@react-native-html/renderer';
import React from 'react';
import { View } from 'react-native';
import blocksStyles from './styles';

type ParagraphProps = {
  block: {
    type: string;
    data: {
      text: string;
    };
  };
};

export function Paragraph({ block }: ParagraphProps) {
  return (
    <View style={blocksStyles.p}>
      <HtmlParseAndView rawHtml={block.data.text} htmlStyles={blocksStyles} />
    </View>
  );
}
