import { StyleSheet, ViewStyle } from 'react-native';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';

type Style = {
  container: ViewStyle;
};

export const useHomeStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create<Style>({
    container: { alignItems: 'center', justifyContent: 'center' },
  });
};