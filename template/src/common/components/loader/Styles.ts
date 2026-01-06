import { useTheme } from '@themes';
import { StyleSheet } from 'react-native';

export const useLoaderStyles = () => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return StyleSheet.create({
    loaderBox: {
      width: 100,
      height: 100,
      backgroundColor: colors.primary,
      borderRadius: 15,
    },
  });
};
