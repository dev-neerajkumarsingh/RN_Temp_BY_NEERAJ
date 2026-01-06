import React from 'react';
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

export const Tab: React.FC<Props> = ({
  item = '',
  activeTab = false,
  tabType = 1,
  onPress,
  tabsLength = 0,
}) => {
  const styles = useCommonTabStyles();
  const actualWidth = Pixelate.screenWidth / 1.05;

  return (
    <Pressable
      style={[
        { width: actualWidth / tabsLength },
        activeTab
          ? tabType === 1
            ? styles.activeTab
            : styles.activeTab2
          : tabType === 1
          ? styles.inactiveTab
          : styles.inactiveTab2,
      ]}
      onPress={() => onPress(item)}>
      <CommonText
        content={item}
        size={activeTab ? 15 : 14}
        fontType={activeTab ? 'VelaSans_Bold' : 'VelaSans_Light'}
        moreStyle={activeTab ? styles.activeText : styles.inactiveText}
      />
    </Pressable>
  );
};
