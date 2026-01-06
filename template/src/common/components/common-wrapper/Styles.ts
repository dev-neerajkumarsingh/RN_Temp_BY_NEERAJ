import { StyleSheet } from 'react-native';
import { useTheme } from '@themes';

export const useWrapperStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    keyboardAvoidingViewcontainer: {
      flex: 1,
    },
    scrollViewContainer: { paddingBottom: 20 },
    scrollStyle: { width: '100%' },
  });
};
