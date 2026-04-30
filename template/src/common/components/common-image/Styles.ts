import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { useTheme } from '@themes';

type Style = {
  container: ViewStyle;
  image: ImageStyle;
};

export const useImageStyles = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  return StyleSheet.create<Style>({
    container: {
      backgroundColor: Colors.grey,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      ...StyleSheet.absoluteFill,
      width: '100%',
      height: '100%',
    },
  });
};
