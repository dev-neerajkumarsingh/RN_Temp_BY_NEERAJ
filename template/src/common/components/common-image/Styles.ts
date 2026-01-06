import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { useTheme } from '@themes';

type Style = {
  container: ViewStyle;
  image: ImageStyle;
};

export const useImageStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create<Style>({
    container: {
      backgroundColor: theme.colors.grey2,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
  });
};
