// themes/theme.d.ts or types/theme.d.ts

/**
 * Defines the structure for a single theme object in your application.
 * This ensures consistency across different themes (light, dark, etc.).
 */
export type AppColors = {
  // Core
  primary: string;
  secondary: string;
  background: string;
  surface: string;

  // Text
  text: string;
  textSecondary: string;

  // Accent
  tertiary: string;
  quaternary: string;
  quinary: string;
  senary: string;
  septenary: string;
  octonary: string;
  nonary: string;
  denary: string;

  // Transparency
  transparent0: string;
  transparent8: string;
  overlay: string;

  // Status
  error: string;
  warning: string;
  info: string;
  success: string;
  lightError: string;
  lightWarning: string;
  lightInfo: string;
  lightSuccess: string;

  // UI Elements
  disabledBtn: string;
  disabledText: string;
  white: string;
  black: string;
  borderColor: string;
  grey: string;

  // Input
  inputBackground: string;
  inputBorder: string;
  inputBorderFocused: string;
  placeholder: string;
};

export type ColorKey = keyof AppColors;

export type AppTheme = {
  // Known keys stay narrow for `keyof`; index signature keeps dynamic-key support.
  colors: AppColors & { [key: string]: string };
};