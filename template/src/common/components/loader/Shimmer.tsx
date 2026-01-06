import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme, GlobalStyles } from '@themes';
import { useLoaderStyles } from './Styles';

type Props = {
  loaderStatus: Boolean;
};

export const Shimmer: React.FC<Props> = ({
  loaderStatus,
}): React.ReactElement | null => {
  const { theme } = useTheme();
  const themedStyles = GlobalStyles(theme);
  const loaderStyles = useLoaderStyles();

  if (!loaderStatus) {
    return null;
  }

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        themedStyles.commonModalBox,
        themedStyles.centerContent,
      ]}>
      <View style={[loaderStyles.loaderBox, themedStyles.centerContent]}>
        <ActivityIndicator size={'large'} color={theme.colors.secondary} />
      </View>
    </View>
  );
};
