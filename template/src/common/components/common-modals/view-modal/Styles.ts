import { useTheme } from '@themes';
import { StyleSheet } from 'react-native';
import { responsiveHeight, Pixelate } from '@utils';

export const useModalStyles = () => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.transparent8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonContainer: {
      position: 'absolute',
      top: Pixelate.heightNormalizer(65),
      right: Pixelate.widthNormalizer(18),
      width: Pixelate.widthNormalizer(45),
      height: Pixelate.widthNormalizer(45),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: Pixelate.widthNormalizer(8),
    },

    // WebViewModal.tsx
    webcontainer: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    webcloseButtonContainer: {
      position: 'absolute',
      top: Pixelate.heightNormalizer(25),
      right: Pixelate.widthNormalizer(18),
      width: Pixelate.widthNormalizer(45),
      height: Pixelate.widthNormalizer(45),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: Pixelate.widthNormalizer(8),
      shadowColor: colors.black,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    webdownloadButtonContainer: {
      position: 'absolute',
      bottom: Pixelate.heightNormalizer(35),
      // right: Pixelate.widthNormalizer(18),
      // left: Pixelate.widthNormalizer(18),
      alignSelf: 'center',
      width: Pixelate.widthNormalizer(45),
      height: Pixelate.widthNormalizer(45),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: Pixelate.widthNormalizer(8),
      shadowColor: colors.black,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
};
