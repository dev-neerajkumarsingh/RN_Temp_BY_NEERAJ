// themes/GlobalStyles.ts (or themes/styles.ts if you prefer)
import { StyleSheet } from 'react-native';
import { AppTheme } from '@themes'; // Assuming your AppTheme type is here
import { responsiveHeight } from '@utils';

// This function will take the theme object and return a StyleSheet
export const GlobalStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    commonBox: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    commonModalBox: {
      flex: 1,
      backgroundColor: theme.colors.transparent8,
    },
    commonBottomBox: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      marginTop: responsiveHeight(-3),
      borderTopLeftRadius: responsiveHeight(3),
      borderTopRightRadius: responsiveHeight(3),
    },
    commonScrollBox: { paddingBottom: responsiveHeight(20) },
    commonShadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 100,
    },
    // Add any other common styles that might depend on the theme
  });
};
