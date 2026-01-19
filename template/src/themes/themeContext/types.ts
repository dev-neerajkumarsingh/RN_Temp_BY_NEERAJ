// themes/types.ts

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColors = typeof import('../list/lightTheme').lightTheme.colors;

export interface Theme {
  name: string;
  colors: ThemeColors;
}

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}