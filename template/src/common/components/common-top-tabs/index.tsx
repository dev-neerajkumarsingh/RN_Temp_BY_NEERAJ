import React from 'react';
import { View } from 'react-native';
import { useCommonTabStyles } from './Styles';
import { Tab } from './components/Tab';

type Props = {
  tabs: string[];
  activeTab: string;
  tabType?: number;
  onChangeTab: (val: string) => void;
};

export const CommonTopTabs: React.FC<Props> = ({
  tabs,
  activeTab = '',
  tabType = 1,
  onChangeTab,
}) => {
  const styles = useCommonTabStyles();

  return (
    <View style={tabType === 1 ? styles.container : styles.container2}>
      {tabs.map((item: string, index: number) => {
        return (
          <Tab
            tabType={tabType}
            key={index?.toString()}
            item={item}
            activeTab={item === activeTab}
            onPress={(val: string) => onChangeTab(val)}
            tabsLength={tabs.length}
          />
        );
      })}
    </View>
  );
};
