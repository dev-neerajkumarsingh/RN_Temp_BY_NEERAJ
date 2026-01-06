import { useTheme } from '@themes';
import { StyleSheet } from 'react-native';
import { Pixelate, SCREEN_WIDTH } from '@utils';

export const useInpuptStyles = () => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.borderColor1,
      height: Pixelate.heightNormalizer(50),
      width: SCREEN_WIDTH / 1.1,
      alignSelf: 'center',
      overflow: 'hidden',
      backgroundColor: colors.transparent0,
    },
    leftContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    textInputContainer: {
      flex: 1,
      color: colors.transparent0,
    },
    textInputContainerLeft: {
      marginLeft: Pixelate.widthNormalizer(5),
      height: Pixelate.heightNormalizer(6),
    },
    rightContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: Pixelate.widthNormalizer(20),
      height: Pixelate.widthNormalizer(20),
    },
    errorText: {
      width: SCREEN_WIDTH / 1.12,
      marginLeft: Pixelate.widthNormalizer(5),
      marginTop: Pixelate.heightNormalizer(0.5),
    },
    disabledContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.transparent8,
    },
    leftIconContainer: {
      marginHorizontal: 10,
    },

    // CommonOtpInput.tsx
    otpContainer1: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: Pixelate.heightNormalizer(5),
      marginLeft: Pixelate.widthNormalizer(20),
    },
    otpContainer2: {
      paddingVertical: Pixelate.heightNormalizer(10),
      paddingHorizontal: Pixelate.widthNormalizer(12),
      borderRadius: Pixelate.widthNormalizer(6),
      borderColor: colors.borderColor1,
      borderWidth: Pixelate.widthNormalizer(1),
      marginRight: Pixelate.widthNormalizer(5),
      textAlign: 'center',
      color: colors.black,
    },
    otpInputFocused: {
      borderColor: colors.senary,
    },
    otpInputFilled: {
      borderColor: colors.black,
    },
    otpInputError: {
      borderColor: colors.error,
    },
  });
};
