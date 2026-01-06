import { StyleSheet, ViewStyle } from 'react-native';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';

type Style = {
  button: ViewStyle;
};

export const useOnboardStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create<Style>({
    button: { marginTop: Pixelate.heightNormalizer(10) },
  });
};