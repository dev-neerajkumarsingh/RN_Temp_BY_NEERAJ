import { StyleSheet, Platform } from 'react-native';
import { useTheme } from '@themes';
import { Pixelate } from '@utils';

export const useStyles = () => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.transparent8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    popupContainer: {
      width: Pixelate.screenWidth / 1.2,
      paddingVertical: Pixelate.heightNormalizer(20),
      paddingHorizontal: Pixelate.widthNormalizer(20),
      backgroundColor: colors.primary,
      borderRadius: Pixelate.widthNormalizer(10),
      alignItems: 'center',
      justifyContent: 'center',
      shadowRadius: 5,
      shadowColor: colors.primary,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 3,
        height: Platform.OS === 'ios' ? 5 : 10,
      },
      elevation: 5,
      zIndex: 1,
    },
    title: {
      textAlign: 'center',
      width: Pixelate.screenWidth / 1.5,
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      marginTop: Pixelate.heightNormalizer(50),
    },
    buttonStyle: {
      paddingHorizontal: Pixelate.widthNormalizer(15),
      backgroundColor: colors.primary,
    },
  });
};
