import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';

type Style = {
  title: TextStyle;
  input1: ViewStyle;
  input2: ViewStyle;
  btnStyle: ViewStyle;
};

export const useLoginStyles = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  return StyleSheet.create<Style>({
    title: { marginTop: 120 },
    input1: { marginTop: Pixelate.heightNormalizer(50), marginBottom: Pixelate.heightNormalizer(5) },
    input2: { marginTop: Pixelate.heightNormalizer(20), marginBottom: Pixelate.heightNormalizer(5) },
    btnStyle: {
      position: 'absolute',
      bottom: Pixelate.heightNormalizer(20),
      alignSelf: 'center',
    },
  });
};
