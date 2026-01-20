import React, { useMemo, useCallback } from 'react';
import { Pressable } from 'react-native';
import { CommonText } from '@components';
import { useCommonTabStyles } from '../Styles';
import { Pixelate } from '@utils';

type Props = {
  item: string;
  activeTab: boolean;
  onPress: (val: string) => void;
  tabType?: number;
  tabsLength: number;
};

const TabComponent: React.FC<Props> = ({
  item,
  activeTab = false,
  tabType = 1,
  onPress,
  tabsLength,
}) => {
  const styles = useCommonTabStyles();

  // Memoize tab width calculation - auto width for tabType 2 (scrollable)
  const tabWidth = useMemo(() => {
    if (tabType === 2) {
      return undefined; // Auto width for scrollable tabs
    }
    const actualWidth = Pixelate.screenWidth / 1.05;
    return actualWidth / tabsLength;
  }, [tabsLength, tabType]);

  // Memoize tab style based on active state and type
  const tabStyle = useMemo(() => {
    // For tabType 2, use auto width with padding; for tabType 1, use fixed width
    const baseStyle =
      tabType === 2 ? { paddingHorizontal: 16 } : { width: tabWidth };
    let stateStyle;

    if (activeTab) {
      stateStyle = tabType === 1 ? styles.activeTab : styles.activeTab2;
    } else {
      stateStyle = tabType === 1 ? styles.inactiveTab : styles.inactiveTab2;
    }

    return [baseStyle, stateStyle];
  }, [tabWidth, activeTab, tabType, styles]);

  // Memoize press handler
  const handlePress = useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  return (
    <Pressable style={tabStyle} onPress={handlePress}>
      <CommonText
        content={item}
        fontSize={activeTab ? 15 : 14}
        fontType={activeTab ? 'InterExtraBold' : 'InterLight'}
        moreStyle={activeTab ? styles.activeText : styles.inactiveText}
        numberOfLines={1}
      />
    </Pressable>
  );
};

// Export memoized component to prevent unnecessary re-renders in tab lists
export const Tab = React.memo(TabComponent);
