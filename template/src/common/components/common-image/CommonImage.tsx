// CommonImage.js

import React from 'react';
import {
  DimensionValue,
  Image,
  ImageStyle,
  Animated,
  StyleProp,
} from 'react-native';
import { IconTypes } from '@icons'; // Assuming these are valid component imports
import { Pixelate } from '@utils'; // Assuming this is your utility for responsive sizing
import { useImageStyles } from './Styles';
import { SvgProps as SvgNativeProps } from 'react-native-svg';
import FastImage from '@d11/react-native-fast-image';
import { useTheme } from '@themes';
import type { ColorKey } from '@themes';
// import all local images...
import {
  ArrowLeft,
  Close,
  Download,
  ErrorNetwork,
  Error,
  EyeHide,
  EyeShow,
  Info,
  Tick,
  Warning,
  Placeholder,
  CameraIcon,
  FilledArrow,
  Gallery,
} from '@icons';

type SvgProps = SvgNativeProps & {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ImageStyle;
  color?: ColorKey | (string & {});
};

const ArrowLeftSvg: React.FC<SvgProps> = props => <ArrowLeft {...props} />;
const CloseSvg: React.FC<SvgProps> = props => <Close {...props} />;
const DownloadSvg: React.FC<SvgProps> = props => <Download {...props} />;
const ErrorNetworkSvg: React.FC<SvgProps> = props => (
  <ErrorNetwork {...props} />
);
const ErrorSvg: React.FC<SvgProps> = props => <Error {...props} />;
const EyeHideSvg: React.FC<SvgProps> = props => <EyeHide {...props} />;
const EyeShowSvg: React.FC<SvgProps> = props => <EyeShow {...props} />;
const InfoSvg: React.FC<SvgProps> = props => <Info {...props} />;
const TickSvg: React.FC<SvgProps> = props => <Tick {...props} />;
const WarningSvg: React.FC<SvgProps> = props => <Warning {...props} />;
const PlaceholderSvg: React.FC<SvgProps> = props => <Placeholder {...props} />;
const CameraSvg: React.FC<SvgProps> = props => <CameraIcon {...props} />;
const FilledArrowSvg: React.FC<SvgProps> = props => <FilledArrow {...props} />;
const GallerySvg: React.FC<SvgProps> = props => <Gallery {...props} />;

const SVG_COMPONENTS: Record<IconTypes, React.FC<any>> = {
  arrowleft: ArrowLeftSvg,
  close: CloseSvg,
  download: DownloadSvg,
  error_network: ErrorNetworkSvg,
  error: ErrorSvg,
  eye_hide: EyeHideSvg,
  eye_show: EyeShowSvg,
  info: InfoSvg,
  tick: TickSvg,
  warning: WarningSvg,
  placeholder: PlaceholderSvg,
  camera: CameraSvg,
  filledArrow: FilledArrowSvg,
  gallery: GallerySvg,
};

type Props = {
  sourceType: 'url' | 'localNonSvg' | 'localSvg';
  source?: string | any; // Can be a URL string or a require() number
  svgSource?: IconTypes;
  width: DimensionValue;
  height: DimensionValue;
  color?: ColorKey | (string & {});
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  moreStyles?: StyleProp<ImageStyle>; // Use ImageStyle for better type safety
  duration?: number;
};

const CommonImageComponent: React.FC<Props> = ({
  sourceType,
  source,
  svgSource,
  width,
  height,
  color,
  resizeMode = 'contain',
  moreStyles,
  duration = 500,
}): React.JSX.Element | null => {
  // --- Refactor 2: Memoize Animated.Value ---
  // Use useRef to ensure the animated value persists across re-renders.
  const imageAnimated = React.useRef(new Animated.Value(0)).current;
  const styles = useImageStyles();
  const { theme } = useTheme();
  const Colors = theme.colors;

  const onImageLoad = React.useCallback(() => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  // --- Refactor 3: Clean SVG Rendering ---
  if (sourceType === 'localSvg' && svgSource) {
    const SvgComponent = SVG_COMPONENTS[svgSource];
    if (!SvgComponent) {
      console.warn(`SVG source "${svgSource}" not found.`);
      return null;
    }
    return (
      <SvgComponent
        width={Pixelate.widthNormalizer(Number(width))}
        height={Pixelate.heightNormalizer(Number(height))}
        color={
          color && color in Colors
            ? Colors[color as keyof typeof Colors]
            : color || Colors.primary
        }
        style={moreStyles}
      />
    );
  }

  // Check for `uri` type and if a `thumbnailSource` is provided.
  if (sourceType === 'url' && source) {
    // const SvgComponent = SVG_COMPONENTS.placeholder;
    // return (
    //   <View
    //     style={[styles.container, { width, height } as ImageStyle, moreStyles]}>
    //     {/* Thumbnail Image */}
    //     <SvgComponent
    //       width={'90%'}
    //       height={'90%'}
    //       color={theme.colors.denary}
    //       style={moreStyles}
    //     />
    //     {/* High-Resolution Image (fades in on top) */}
    //     <Animated.Image
    //       source={{ uri: source as string }}
    //       style={[styles.image, { opacity: imageAnimated }]}
    //       onLoad={onImageLoad}
    //       resizeMode={resizeMode}
    //     />
    //   </View>
    // );

    const fastImageResizeMode =
      resizeMode === 'cover'
        ? FastImage.resizeMode.cover
        : resizeMode === 'contain'
        ? FastImage.resizeMode.contain
        : resizeMode === 'stretch'
        ? FastImage.resizeMode.stretch
        : resizeMode === 'center'
        ? FastImage.resizeMode.center
        : FastImage.resizeMode.contain;

    return (
      <Animated.View
        style={[
          {
            width: Pixelate.widthNormalizer(Number(width)),
            height: Pixelate.heightNormalizer(Number(height)),
            opacity: imageAnimated,
          },
          moreStyles,
        ]}>
        <FastImage
          style={styles.image as any}
          source={{
            uri: source as string,
            priority: FastImage.priority.normal,
          }}
          resizeMode={fastImageResizeMode}
          onLoadEnd={onImageLoad}
        />
      </Animated.View>
    );
  }

  // Handle local asset images (e.g., from require('./path/to/image.png'))
  if (sourceType === 'localNonSvg' && source) {
    return (
      <Image
        source={source as any} // Assets are resolved to numbers by the bundler
        resizeMode={resizeMode}
        style={[{ width, height } as ImageStyle, moreStyles]}
      />
    );
  }

  // Fallback if no valid condition is met
  return null;
};

export const CommonImage = React.memo(CommonImageComponent);
