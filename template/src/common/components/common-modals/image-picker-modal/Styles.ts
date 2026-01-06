//import * as FONTS from '@fonts';
import { StyleSheet } from 'react-native';
import { useTheme, GlobalStyles } from '@themes';
import { responsiveHeight, responsiveWidth, Pixelate } from '@utils';

export const useStyles = () => {
  const { theme } = useTheme();
  const styles = GlobalStyles(theme);

  return StyleSheet.create({
    container: { ...styles.commonModalBox, justifyContent: 'flex-end' },
    bottomContainer: {
      width: Pixelate.screenWidth,
      paddingVertical: responsiveHeight(3),
      backgroundColor: theme.colors.primary,
      borderTopLeftRadius: responsiveHeight(3),
      borderTopRightRadius: responsiveHeight(3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: responsiveWidth(10),
    },
    cameraContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsiveHeight(2),
      marginTop: responsiveHeight(5),
      // alignSelf: 'center',
    },
    cameraIconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsiveHeight(2),
      marginTop: responsiveHeight(5),
      width: responsiveWidth(20),
      height: responsiveWidth(20),
      borderRadius: responsiveWidth(20),
      backgroundColor: theme.colors.grey1,
    },
    galleryContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsiveHeight(2),
      marginTop: responsiveHeight(5),
      alignSelf: 'center',
    },
    galleryIconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsiveHeight(2),
      marginTop: responsiveHeight(5),
      alignSelf: 'center',
      width: responsiveWidth(20),
      height: responsiveWidth(20),
      borderRadius: responsiveWidth(20),
      backgroundColor: theme.colors.grey1,
    },
    btnContainer: {
      width: responsiveWidth(10),
      height: responsiveHeight(5),
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: { marginTop: responsiveHeight(5) },
  });
};
