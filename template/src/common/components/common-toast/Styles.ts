import { Pixelate } from '@utils';
import { useTheme } from '@themes';
import { StyleSheet } from 'react-native';

export const useToasterStyles = () => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return StyleSheet.create({
    mainContainer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1000,
      backgroundColor: colors.transparent0,
      flex: 1,
      justifyContent: 'flex-end',
    },
    toastContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopEndRadius: Pixelate.widthNormalizer(15),
      borderBottomEndRadius: Pixelate.widthNormalizer(15),
      borderTopStartRadius: Pixelate.widthNormalizer(15),
      borderBottomStartRadius: Pixelate.widthNormalizer(15),
      width: Pixelate.screenWidth / 1.11,
      paddingVertical: Pixelate.heightNormalizer(15),
      marginBottom: Pixelate.heightNormalizer(70),
      borderRadius: Pixelate.widthNormalizer(5),
      borderWidth: 1,
      alignSelf: 'center',
      //overflow: 'hidden',
    },
    toastContainerPosition: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginLeft: Pixelate.widthNormalizer(10),
      
    },
    toastContentContainer: { marginLeft: Pixelate.widthNormalizer(3) },
    toastTitle: {
      width: Pixelate.screenWidth / 1.45,
      //backgroundColor: 'green'
    },
    toastMessage: {
      width: Pixelate.screenWidth / 1.33,
      //backgroundColor: 'green'
    },
    toastMessageTop: { marginTop: Pixelate.heightNormalizer(3) },
    toastCloseButton: {
      position: 'absolute',
      right: Pixelate.widthNormalizer(12),
      top: Pixelate.heightNormalizer(12),
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: Pixelate.widthNormalizer(25),
      height: Pixelate.widthNormalizer(25),
      //backgroundColor: 'red'
    },
  });
};
