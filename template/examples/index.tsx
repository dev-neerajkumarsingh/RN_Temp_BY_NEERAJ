import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { CommonBox, CommonText, CommonButton } from '@components';
import { useNavs } from '@hooks';
import { useTheme } from '@themes';

const exampleScreens = [
  { name: 'CommonBoxEx', label: 'CommonBox', description: 'Screen wrapper component' },
  { name: 'CommonTextEx', label: 'CommonText', description: 'Text component' },
  { name: 'CommonButtonEx', label: 'CommonButton', description: 'Button component' },
  { name: 'CommonInputEx', label: 'CommonInput', description: 'Text input component' },
  { name: 'CommonImageEx', label: 'CommonImage', description: 'Image & icon component' },
  { name: 'CommonDropDownEx', label: 'CommonDropDown', description: 'Dropdown selector' },
  { name: 'CommonTopTabsEx', label: 'CommonTopTabs', description: 'Tab navigation' },
  { name: 'CommonBottomSheetEx', label: 'CommonBottomSheet', description: 'Bottom sheet modal' },
];

export const Examples = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  return (
    <CommonBox useScrollView scrollEnabled>
      <View style={styles.header}>
        <CommonText
          content={'Component Examples'}
          fontSize={24}
          fontType={'InterExtraBold'}
          color={Colors.text}
        />
        <CommonText
          content={'Tap on any component to see its usage examples'}
          fontSize={14}
          color={Colors.text}
          moreStyle={styles.subtitle}
        />
      </View>

      <View style={styles.buttonContainer}>
        {exampleScreens.map((screen, index) => (
          <CommonButton
            key={screen.name}
            label={screen.label}
            onPress={() => useNavs.navigate(screen.name)}
            moreButtonStyle={[
              styles.exampleButton,
              { backgroundColor: Colors.secondary },
            ]}
          />
        ))}
      </View>
    </CommonBox>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? 60 : Number(StatusBar.currentHeight) + 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 8,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  exampleButton: {
    marginTop: 12,
    width: '100%',
  },
});
