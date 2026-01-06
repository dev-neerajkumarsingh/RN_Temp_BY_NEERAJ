//import * as FONTS from '@fonts';
import { StyleSheet } from 'react-native';
import { useTheme } from '@themes';
import { Pixelate, responsiveHeight } from '@utils';

export const useCommonTabStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      marginTop: responsiveHeight(2),
      width: Pixelate.screenWidth / 1.05,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.grey2,
      alignSelf: 'center',
    },
    container2: {
      marginTop: responsiveHeight(2),
      width: Pixelate.screenWidth / 1.0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    activeTab: {
      paddingVertical: responsiveHeight(1),
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.secondary,
    },
    activeTab2: {
      paddingVertical: responsiveHeight(1),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      marginHorizontal: 5,
      borderColor: theme.colors.secondary,
      borderRadius: 20,
    },
    inactiveTab: {
      paddingVertical: responsiveHeight(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    inactiveTab2: {
      paddingVertical: responsiveHeight(1),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      marginHorizontal: 5,
      borderColor: theme.colors.grey2,
      borderRadius: 20,
    },
    activeText: {
      textAlign: 'center',
      color: theme.colors.octonary,
    },
    inactiveText: {
      textAlign: 'center',
      color: theme.colors.secondary,
    },
  });
};
