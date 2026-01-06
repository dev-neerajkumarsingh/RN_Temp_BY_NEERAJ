import * as React from 'react';
import { View, ActivityIndicator, StyleSheet, ColorValue } from 'react-native';
import { useTheme, GlobalStyles } from '@themes';
import { useSelector } from 'react-redux';
import type { RootState } from '@redux';
import { useLoaderStyles } from './Styles';

type LoaderVariant = 'primary' | 'secondary';

type BaseLoaderProps = {
  visible: boolean;
  color?: ColorValue;
  size?: 'small' | 'large';
  variant?: LoaderVariant;
};

/**
 * BaseLoader - Reusable loader component
 * Can be used standalone or through Loader/Shimmer exports
 */
const BaseLoaderComponent: React.FC<BaseLoaderProps> = ({
  visible,
  color,
  size = 'large',
  variant = 'primary',
}) => {
  const { theme } = useTheme();
  const loaderStyles = useLoaderStyles();
  const themedStyles = GlobalStyles(theme);

  // Memoize container style
  const containerStyle = React.useMemo(
    () => [
      StyleSheet.absoluteFillObject,
      themedStyles.commonModalBox,
      themedStyles.centerContent,
    ],
    [themedStyles.commonModalBox, themedStyles.centerContent]
  );

  // Memoize loader box style
  const loaderBoxStyle = React.useMemo(
    () => [loaderStyles.loaderBox, themedStyles.centerContent],
    [loaderStyles.loaderBox, themedStyles.centerContent]
  );

  // Determine color based on variant or explicit color prop
  const indicatorColor = React.useMemo(() => {
    if (color) return color;
    return variant === 'primary' ? theme.colors.primary : theme.colors.secondary;
  }, [color, variant, theme.colors.primary, theme.colors.secondary]);

  if (!visible) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <View style={loaderBoxStyle}>
        <ActivityIndicator size={size} color={indicatorColor} />
      </View>
    </View>
  );
};

export const BaseLoader = React.memo(BaseLoaderComponent);

/**
 * Loader - Redux-connected global loader
 * Automatically shows/hides based on Redux loader state
 */
export const Loader: React.FC = (): React.ReactElement | null => {
  const loaderState = useSelector((state: RootState) => state.loader.status);

  return <BaseLoader visible={loaderState} variant="primary" />;
};
