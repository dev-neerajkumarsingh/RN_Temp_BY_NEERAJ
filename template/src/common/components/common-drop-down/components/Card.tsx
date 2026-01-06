import React from 'react';
import { Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { CommonText } from '@components';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';
import { useDropDownStyles } from '../Styles';

type Props = {
  currentIndex: number;
  lastIndex: number;
  item: string;
  selectedValue: string;
  highLightSelectedValue: boolean;
  onChangeSelect: (val: string) => void;
  moreLabelContainerStyle: StyleProp<ViewStyle>;
  moreLabelStyle: StyleProp<TextStyle>;
};

export const Card: React.FC<Props> = ({
  currentIndex = 0,
  lastIndex = 0,
  item = '',
  selectedValue = '',
  highLightSelectedValue = true,
  onChangeSelect = _val => {},
  moreLabelContainerStyle = {},
  moreLabelStyle = {},
}) => {
  const { theme } = useTheme();
  const styles = useDropDownStyles();

  return (
    <Pressable
      style={
        currentIndex === lastIndex
          ? [styles.cardContainer, styles.borderRadius, moreLabelContainerStyle]
          : [styles.cardContainer, moreLabelContainerStyle]
      }
      onPress={() => onChangeSelect(item)}>
      <CommonText
        content={item}
        color={
          highLightSelectedValue && item === selectedValue
            ? theme.colors.secondary
            : theme.colors.denary
        }
        size={highLightSelectedValue && item === selectedValue ? 16 : 15}
        fontType={
          highLightSelectedValue && item === selectedValue
            ? 'VelaSans_Bold'
            : 'VelaSans_Medium'
        }
        moreStyle={{
          marginLeft: Pixelate.widthNormalizer(20),
          moreLabelStyle,
        }}
      />
    </Pressable>
  );
};
