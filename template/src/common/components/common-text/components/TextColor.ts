import {StyleSheet} from 'react-native';
import {AppTheme} from '@themes';

export const TextColor = (theme: AppTheme) =>
  StyleSheet.create({
    primary: {
      color: theme.colors.primary,
    },
    secondary: {
      color: theme.colors.secondary,
    },
    tertiary: {
      color: theme.colors.tertiary,
    },
    quaternary: {
      color: theme.colors.quaternary,
    },
    quinary: {
      color: theme.colors.quinary,
    },
    senary: {
      color: theme.colors.senary,
    },
    septenary: {
      color: theme.colors.septenary,
    },
    octonary: {
      color: theme.colors.octonary,
    },
    nonary: {
      color: theme.colors.nonary,
    },
    denary: {
      color: theme.colors.denary,
    },

  });
