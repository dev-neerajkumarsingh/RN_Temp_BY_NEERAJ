import * as React from 'react';
import { ColorValue } from 'react-native';
import { BaseLoader } from './Loader';

type Props = {
  loaderStatus: boolean;
  color?: ColorValue;
  size?: 'small' | 'large';
};

/**
 * Shimmer - Standalone loader component
 * Uses secondary variant by default, controlled via props
 */
export const Shimmer: React.FC<Props> = ({
  loaderStatus,
  color,
  size = 'large',
}): React.ReactElement | null => {
  return (
    <BaseLoader
      visible={loaderStatus}
      variant="secondary"
      color={color}
      size={size}
    />
  );
};
