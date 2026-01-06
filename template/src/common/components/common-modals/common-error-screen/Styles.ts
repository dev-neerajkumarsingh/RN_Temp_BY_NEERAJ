import { useTheme } from '@themes';
import { StyleSheet } from 'react-native';
import { Pixelate } from '@utils';

export const useErrorScreenStyles = () => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonContainer: {
      marginTop: Pixelate.heightNormalizer(58),
      marginRight: Pixelate.widthNormalizer(18),
      alignSelf: 'flex-end',
      width: Pixelate.widthNormalizer(45),
      height: Pixelate.widthNormalizer(45),
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonText: {
      marginLeft: Pixelate.widthNormalizer(10),
    },
    errorImgContainer: {
      width: Pixelate.widthNormalizer(50),
      height: Pixelate.widthNormalizer(50),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Pixelate.heightNormalizer(16),
    },
    title: {
      marginTop: Pixelate.heightNormalizer(20),
      marginHorizontal: Pixelate.widthNormalizer(30),
      textAlign: 'center',
    },
    msgContainer: {
      flex: 1, // reduce flex volume, if you want to decrease from margin top value of center content
      alignItems: 'center',
      justifyContent: 'center',
    },
    msg: {
      marginTop: Pixelate.heightNormalizer(10),
      marginHorizontal: Pixelate.widthNormalizer(20),
      textAlign: 'center',
    },
    subMsgContainer: {
      marginTop: Pixelate.heightNormalizer(5),
    },
    buttonContainer: {
      alignSelf: 'center',
      marginBottom: Pixelate.heightNormalizer(50),
    },
  });
};
