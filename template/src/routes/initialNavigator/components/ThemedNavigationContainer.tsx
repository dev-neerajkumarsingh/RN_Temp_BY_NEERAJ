import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@themes';
import { navigationRef } from '@hooks';

export const ThemedNavigationContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme, isDark } = useTheme();

  // Navigation theme for React Navigation
  const navigationTheme = React.useMemo(
    () => ({
      dark: isDark,
      colors: {
        primary: theme.colors.senary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.text,
        border: theme.colors.borderColor,
        notification: theme.colors.error,
      },
      fonts: {
        regular: {
          fontFamily: 'Inter_18ptLight',
          fontWeight: '400' as const,
        },
        medium: {
          fontFamily: 'Inter_18ptMedium',
          fontWeight: '500' as const,
        },
        bold: {
          fontFamily: 'Inter_18ptBold',
          fontWeight: '700' as const,
        },
        heavy: {
          fontFamily: 'Inter_18ptExtraBold',
          fontWeight: '900' as const,
        },
      },
    }),
    [theme, isDark],
  );

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      {children}
    </NavigationContainer>
  );
};
