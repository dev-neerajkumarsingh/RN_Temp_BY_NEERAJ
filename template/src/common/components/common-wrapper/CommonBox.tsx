import * as React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StatusBar,
  ScrollView,
} from 'react-native';
import { CommonKeyboardAvoidingView, Shimmer } from '@components';
import { useTheme, GlobalStyles } from '@themes';
import { useWrapperStyles } from './Styles';

type Props = {
  children: React.ReactNode;
  loaderStatus?: boolean;
  moreStyles?: StyleProp<ViewStyle>[] | StyleProp<ViewStyle>;
  isModal?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content';
  useKeyboardAvoidingView?: boolean;
  useScrollView?: boolean;
  keyboardVerticalOffset?: number;
  showsVerticalScrollIndicator?: boolean;
  scrollEnabled?: boolean;
};

export const CommonBox: React.FC<Props> = ({
  children,
  loaderStatus = false,
  moreStyles,
  isModal,
  statusBarStyle = 'dark-content',
  useKeyboardAvoidingView = false,
  useScrollView = false,
  keyboardVerticalOffset = 50,
  showsVerticalScrollIndicator = false,
  scrollEnabled = true,
}): React.JSX.Element => {
  const { theme, currentThemeName } = useTheme();
  const Colors = theme.colors;
  const themedStyles = GlobalStyles(theme);
  const styles = useWrapperStyles();

  return (
    <View
      style={[
        !isModal ? themedStyles.commonBox : themedStyles.commonModalBox,
        moreStyles,
      ]}>
      <StatusBar
        barStyle={
          statusBarStyle.length > 0
            ? statusBarStyle
            : currentThemeName === 'light'
            ? 'light-content'
            : 'light-content'
        }
        backgroundColor={Colors.transparent0}
        translucent
      />
      {useKeyboardAvoidingView ? (
        <CommonKeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            contentContainerStyle={styles.scrollViewContainer}
            style={styles.scrollStyle}
            scrollEnabled={scrollEnabled}>
            {children}
          </ScrollView>
        </CommonKeyboardAvoidingView>
      ) : useScrollView ? (
        <ScrollView
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.scrollStyle}
          scrollEnabled={scrollEnabled}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
      {loaderStatus && <Shimmer loaderStatus={loaderStatus} />}
    </View>
  );
};
