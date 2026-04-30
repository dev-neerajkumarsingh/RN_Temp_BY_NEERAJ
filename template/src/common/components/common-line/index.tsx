import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ColorKey } from '@themes';

type Props = {
  marginVertical?: number;
  marginHorizontal?: number;
  color?: ColorKey | (string & {});
  height?: number;
  moreDesign?: {};
};

const HorizontalLine: React.FC<Props> = ({
  marginVertical = 0,
  marginHorizontal = 0,
  color = '#000', // default black
  height = 1,
  moreDesign,
}) => {
  return (
    <View
      style={[
        styles.line,
        {
          marginHorizontal: marginHorizontal,
          marginVertical: marginVertical,
          backgroundColor: color,
          height: height,
        },
        moreDesign,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    alignSelf: 'center',
  },
});

export const CommonButton = React.memo(HorizontalLine);
