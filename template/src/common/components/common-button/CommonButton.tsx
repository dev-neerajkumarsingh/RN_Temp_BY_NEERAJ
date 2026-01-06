import * as React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { CommonText, CommonImage } from '@components';
import { GlobalStyles } from '@themes';
import type { FontTypes } from '@fonts';
import type { IconTypes } from '@icons';
import { responsiveHeight } from '@utils';
import { useTheme } from '@themes';

type ButtonStyles = {
  container: (
    width: any,
    height: any,
    backgroundColor: string,
  ) => StyleProp<ViewStyle>;
};

// Create a function to generate the styles
const createButtonStyles = (
  width: any,
  height: any,
  backgroundColor: string,
): StyleProp<ViewStyle> => ({
  width,
  height,
  borderRadius: 12,
  backgroundColor,
});

const styles: ButtonStyles = {
  container: (
    width: any,
    height: any,
    backgroundColor: string,
  ) => createButtonStyles(width, height, backgroundColor),
};

type Props = {
  width?: any;
  height?: any;
  moreButtonStyle?: StyleProp<ViewStyle>[] | StyleProp<ViewStyle>;
  contentType?: 'text' | 'localSvg' | 'localNonSvg' | 'uri';
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'auto';
  fontSize?: number;
  lineHeight?: number;
  fontType?: FontTypes;
  label?: string;
  moreTextStyle?: {};
  imgWidth?: string | number;
  imgHeight?: string | number;
  imgSource?: string;
  svgType?: IconTypes;
  svgColor?: string;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  loader?: boolean;
};

export const CommonButton: React.FC<Props> = ({
  width = '100%',
  height = responsiveHeight(6),
  moreButtonStyle,
  contentType = 'text',
  label,
  textColor = '#fff',
  textAlign = 'center',
  fontSize = 14,
  lineHeight = (fontSize ?? 14) + 5,
  moreTextStyle,
  svgType,
  svgColor,
  imgWidth,
  imgHeight,
  imgSource,
  disabled = false,
  onPress,
  onLongPress,
  loader,
  fontType = 'Clash_MEDIUM',
}): React.JSX.Element => {
  const { theme } = useTheme();
  const Colors = theme.colors;
  const themedStyles = GlobalStyles(theme);

  return (
    <Pressable
      style={[
        styles.container(width, height, theme.colors.secondary), // Pass button width, height and background color
        themedStyles.centerContent,
        moreButtonStyle,
        disabled && { opacity: 0.5 }, // Apply opacity to disabled button
      ]}
      onPress={onPress}
      disabled={disabled}
      onLongPress={onLongPress}>
      {!loader && contentType === 'text' ? (
        <CommonText
          content={label || ''}
          color={textColor}
          fontSize={fontSize}
          textAlign={textAlign}
          fontType={fontType as FontTypes | undefined}
          lineHeight={lineHeight}
          moreStyle={moreTextStyle}
        />
      ) : !loader && contentType === 'localNonSvg' ? (
        <CommonImage
          source={imgSource}
          sourceType={contentType}
          width={imgWidth || '100%'}
          height={imgHeight || '100%'}
          resizeMode={'contain'}
        />
      ) : (
        !loader &&
        contentType === 'localSvg' && (
          <CommonImage
            svgSource={svgType}
            sourceType={contentType}
            width={imgWidth || '100%'}
            height={imgHeight || '100%'}
            color={svgColor}
            resizeMode={'contain'}
          />
        )
      )}
      {loader && <ActivityIndicator size={'small'} color={Colors.primary} />}
    </Pressable>
  );
};
