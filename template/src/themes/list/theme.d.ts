// themes/theme.d.ts or types/theme.d.ts

/**
 * Defines the structure for a single theme object in your application.
 * This ensures consistency across different themes (light, dark, etc.).
 */
export type AppTheme = {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    senary: string;
    septenary: string;
    octonary: string;
    nonary: string;
    denary: string;
    transparent0: string;
    transparent8: string;
    error: string;
    warning: string;
    info: string;
    success: string;
    disabledBtn: string;
    white: string;
    black: string;
    // Add all other color properties you define in your theme files
    [key: string]: string; // Allows for additional, less explicitly typed colors
  };
};