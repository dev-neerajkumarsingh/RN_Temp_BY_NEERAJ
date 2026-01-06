import { useTheme } from '@themes';
import { Pixelate, SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils';
import { StatusBar, StyleSheet } from 'react-native';

export const useCommonBottomSheetStyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },

    dimOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.79)',
    },
    backdropTouchable: {
      ...StyleSheet.absoluteFillObject,
    },
    container: {
      flex: 1,
    },
    close: {
      flex: 1,
    },
    card: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.primary,
      borderTopLeftRadius: Pixelate.fontPixel(24),
      borderTopRightRadius: Pixelate.fontPixel(24),
      paddingHorizontal: SCREEN_WIDTH / 25,
      // paddingBottom: 50,
      maxHeight: SCREEN_HEIGHT / 1.04,
      minHeight: SCREEN_HEIGHT / 5,
      marginTop: StatusBar.currentHeight,
      overflow: 'hidden',
    },
    down: {
      height: 4,
      backgroundColor: 'grey',
      width: SCREEN_WIDTH / 4,
      marginTop: 10,
      borderRadius: 2,
      alignSelf: 'center',
    },

    box: {
      flex: 1,
    },
    scroll: { width: '100%', height: 25 },
  });
};
