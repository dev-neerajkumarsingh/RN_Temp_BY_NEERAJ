import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';

type Style = {
  title: TextStyle;
  input1: ViewStyle;
  input2: ViewStyle;
  btnStyle: ViewStyle;
};

export const useSignupStyles = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  return StyleSheet.create<Style>({
    title: { marginTop: 100, textAlign: 'center' },
    input1: { marginVertical: 20, marginTop: 50 },
    input2: { marginVertical: 20 },
    btnStyle: { marginTop: 50, alignSelf: 'center' },
  });
};
