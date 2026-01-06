import { StyleSheet, ViewStyle } from 'react-native';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';

type Style = {
  container: ViewStyle;
};

export const useProfileStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create<Style>({
    container: { alignItems: 'center', justifyContent: 'center' },
  });
};