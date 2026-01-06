import * as React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import type { FontTypes } from '@fonts';
//import {} from 'react-i18next';
import * as Fonts from '@fonts';
import { Pixelate } from '@utils';
//import { useTheme } from '@themes';

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
};

export const CommonText: React.FC<Props> = ({
  content,
  color = 'black', // Default to the key 'black'
  textAlign = 'left',
  fontSize = 14, // Default size
  lineHeight = fontSize + 5, // Default line height
  fontType = Fonts.Inter_18ptBold, // Default to VelaSans_Medium
  moreStyle = {},
  otherProps,
  children = null,
}) => {
  //const { theme } = useTheme();
  // const { selectedLang } = useSelector((state: RootState) => state.lang);
  // const updatedContent =
  //   selectedLang === 'en'
  //     ? content
  //     : LangList?.hasOwnProperty(content)
  //     ? LangList[content as keyof typeof LangList][
  //         selectedLang === 'en' ? 0 : 1
  //       ]
  //     : content;

  // const textColor = getColor(String(color ?? 'black'), theme);

  return (
    <Text
      style={[
        { color, textAlign, fontSize: Pixelate.fontPixel(fontSize), lineHeight: Pixelate.fontPixel(lineHeight),  },
        { fontFamily: Fonts[fontType as keyof typeof Fonts] || fontType },
        moreStyle,
      ]}
      {...otherProps}>
      {content}
      {children}
    </Text>
  );
};
