import React, { useMemo, useCallback } from 'react';
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
  highLightSelectedValue?: boolean;
  onChangeSelect: (val: string) => void;
  moreLabelContainerStyle?: StyleProp<ViewStyle>;
  moreLabelStyle?: StyleProp<TextStyle>;
};

const CardComponent: React.FC<Props> = ({
  currentIndex,
  lastIndex,
  item,
  selectedValue,
  highLightSelectedValue = true,
  onChangeSelect,
  moreLabelContainerStyle,
  moreLabelStyle,
}) => {
  const { theme } = useTheme();
  const styles = useDropDownStyles();

  const isSelected = highLightSelectedValue && item === selectedValue;
  const isLastItem = currentIndex === lastIndex;

  // Memoize container style
  const containerStyle = useMemo(
    () =>
      isLastItem
        ? [styles.cardContainer, styles.borderRadius, moreLabelContainerStyle]
        : [styles.cardContainer, moreLabelContainerStyle],
    [isLastItem, styles.cardContainer, styles.borderRadius, moreLabelContainerStyle]
  );

  // Memoize text style
  const textStyle = useMemo(
    () => ({
      marginLeft: Pixelate.widthNormalizer(20),
      ...((moreLabelStyle as object) || {}),
    }),
    [moreLabelStyle]
  );

  // Memoize press handler
  const handlePress = useCallback(() => {
    onChangeSelect(item);
  }, [onChangeSelect, item]);

  return (
    <Pressable style={containerStyle} onPress={handlePress}>
      <CommonText
        content={item}
        color={isSelected ? theme.colors.secondary : theme.colors.denary}
        fontSize={isSelected ? 16 : 15}
        fontType={isSelected ? 'InterExtraBold' : 'InterMedium'}
        moreStyle={textStyle}
      />
    </Pressable>
  );
};

// Export memoized component to prevent unnecessary re-renders in lists
export const Card = React.memo(CardComponent);
