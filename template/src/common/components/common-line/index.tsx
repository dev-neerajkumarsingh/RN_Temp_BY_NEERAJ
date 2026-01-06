import { useTheme } from '@themes';
import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  marginVertical?: number;
  marginHorizontal?: number;
  color?: string;
  height?: number;
  moreDesign?: {};
};

export const HorizontalLine: React.FC<Props> = ({
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

export default HorizontalLine;
