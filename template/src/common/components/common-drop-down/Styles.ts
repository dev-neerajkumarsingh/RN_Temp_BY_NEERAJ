import { StyleSheet, ViewStyle } from 'react-native';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';

type Style = {
  container: ViewStyle;
  containerRadius: ViewStyle;
  rotableRightIcon: ViewStyle;
  itemSeparator: ViewStyle;
  imgContainer: ViewStyle;
  pressStyle: ViewStyle;
  // Card Styles...
  cardContainer: ViewStyle;
  borderRadius: ViewStyle;
};

export const useDropDownStyles = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  return StyleSheet.create<Style>({
    container: {
      marginTop: Pixelate.heightNormalizer(2),
      width: Pixelate.screenWidth / 1.1,
      height: Pixelate.heightNormalizer(50),
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.tertiary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.primary,
      alignSelf: 'center',
    },
    containerRadius: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
    rotableRightIcon: {
      marginRight: Pixelate.widthNormalizer(10),
      width: 18,
      height: 18,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: 'red',
    },
    itemSeparator: {
      alignSelf: 'center',
      width: '100%',
      height: 1,
      backgroundColor: '#70707024',
    },
    imgContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: 13,
    },
    rightIcon: {
      marginRight: Pixelate.widthNormalizer(10),
    },
    // img: size => [
    //   {
    //     height: widthPixel(size),
    //     width: heightPixel(size),
    //   },
    // ],
    pressStyle: {
      backgroundColor: 'transparent',
      maxWidth: 30,
      minWidth: 10,
      minHeight: 10,
      maxHeight: 50,
    },

    // Card Styles...
    cardContainer: {
      width: Pixelate.screenWidth / 1.11,
      height: Pixelate.heightNormalizer(45),
      backgroundColor: Colors.primary,
      alignItems: 'flex-start',
      justifyContent: 'center',
      alignSelf: 'center',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#70707024',
      shadowColor: theme.colors.secondary,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowRadius: 5,
      elevation: 5,
      zIndex: 1000,
      shadowOpacity: 0.1,
    },
    borderRadius: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomWidth: 1,
    },
  });
};
