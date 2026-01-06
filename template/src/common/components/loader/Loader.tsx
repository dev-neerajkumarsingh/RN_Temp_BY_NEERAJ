import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme, GlobalStyles } from '@themes';
import { useSelector } from 'react-redux';
import type { RootState } from '@redux';
import { useLoaderStyles } from './Styles';

export const Loader: React.FC = (): React.ReactElement | null => {
  const [loaderStatus, setLoaderStatus] = React.useState(false);
  const loaderState = useSelector((state: RootState) => state.loader.status);
  const { theme } = useTheme();
  const loaderStyles = useLoaderStyles();
  const themedStyles = GlobalStyles(theme);

  React.useEffect(() => {
    setLoaderStatus(loaderState);
  }, [loaderState]);

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
        <ActivityIndicator size={'large'} color={theme.colors.primary} />
      </View>
    </View>
  );
};
