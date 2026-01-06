// context/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme } from '../list/lightTheme';
import { darkTheme } from '../list/darkTheme';

type ThemeName = 'light' | 'dark' | 'corporate';
type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  currentThemeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>(() => {
    // Initialize currentThemeName once
    const systemColorScheme = Appearance.getColorScheme();
    return systemColorScheme === 'dark' ? 'dark' : 'light';
  });

  const getTheme = (name: ThemeName): Theme => {
    switch (name) {
      case 'light':
        return lightTheme;
      case 'dark':
        return darkTheme;
      // case 'corporate':
      //   return corporateTheme;
      default:
        return lightTheme;
    }
  };

  const [theme, setThemeState] = useState<Theme>(getTheme(currentThemeName));

  // Memoize setTheme to ensure it's stable, though useState's setter is already stable
  // For other functions, useCallback would be needed
  const setTheme = React.useCallback(
    (name: ThemeName) => {
      //console.log('#>> setTheme :: ', name);
      setCurrentThemeName(name);
      setThemeState(getTheme(name));
    },
    []
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      //console.log('#>> colorScheme :: ', colorScheme);
      if (colorScheme) {
        // Use the memoized setTheme directly from the component scope
        setTheme(colorScheme === 'dark' ? 'dark' : 'light');
      }
    });
    return () => subscription.remove();
  }, [setTheme]);

  const contextValue = {
    theme,
    currentThemeName,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  //console.log('#>> context :: ', context);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};