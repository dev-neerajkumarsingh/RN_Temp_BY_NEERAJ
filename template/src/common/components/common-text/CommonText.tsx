import * as React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import type { FontTypes } from '@fonts';
import * as Fonts from '@fonts';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';

type Props = {
  content: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'auto';
  fontSize?: number;
  lineHeight?: number;
  fontType?: FontTypes;
  moreStyle?: StyleProp<TextStyle>[] | StyleProp<TextStyle>;
  otherProps?: any;
  children?: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
};

const CommonTextComponent: React.FC<Props> = ({
  content,
  color,
  textAlign = 'left',
  fontSize = 14,
  lineHeight = fontSize + 5,
  fontType = Fonts.Inter_18ptBold,
  moreStyle = {},
  otherProps,
  children = null,
  numberOfLines,
  ellipsizeMode,
}) => {
  const { theme } = useTheme();
  const Colors = theme.colors;
  // Memoize text styles to prevent recalculation on every render
  const textStyle = React.useMemo(
    () => [
      {
        color: color || Colors.text,
        textAlign,
        fontSize: Pixelate.fontPixel(fontSize),
        lineHeight: Pixelate.fontPixel(lineHeight),
      },
      { fontFamily: Fonts[fontType as keyof typeof Fonts] || fontType },
      moreStyle,
    ],
    [color, textAlign, fontSize, lineHeight, fontType, moreStyle],
  );

  return (
    <Text
      style={textStyle}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...otherProps}>
      {content}
      {children}
    </Text>
  );
};

// Export memoized component to prevent unnecessary re-renders
export const CommonText = React.memo(CommonTextComponent);
