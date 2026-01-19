// themes/context/ThemeContext.tsx

import * as React from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { lightTheme } from '../list/lightTheme';
import { darkTheme } from '../list/darkTheme';

// Types
export type ThemeMode = 'light' | 'dark' | 'system';
type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

// Context
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

// Provider Props
interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
}

// Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'system',
}) => {
  // Get system color scheme using the hook (automatically updates)
  const systemColorScheme = useColorScheme();
  
  // Track user's theme preference
  const [themeMode, setThemeModeState] = React.useState<ThemeMode>(initialMode);

  // Determine if dark mode is active
  const isDark = React.useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  // Get the actual theme object
  const theme = React.useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  // Set theme mode
  const setThemeMode = React.useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  // Toggle between light/dark (useful for quick toggle button)
  const toggleTheme = React.useCallback(() => {
    setThemeModeState(prev => {
      if (prev === 'system') {
        // If on system, toggle to opposite of current system theme
        return systemColorScheme === 'dark' ? 'light' : 'dark';
      }
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, [systemColorScheme]);

  // Update status bar based on theme
  React.useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);
    if (StatusBar.setBackgroundColor) {
      StatusBar.setBackgroundColor(theme.colors.background, true);
    }
  }, [isDark, theme.colors.background]);

  // Memoize context value
  const contextValue = React.useMemo(
    () => ({
      theme,
      themeMode,
      isDark,
      setThemeMode,
      toggleTheme,
    }),
    [theme, themeMode, isDark, setThemeMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook
export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};