import {PixelRatio, Dimensions} from 'react-native';

// https://medium.com/nerd-for-tech/react-native-styles-normalization-e8ce77a3110c

const ScreenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const screenWidth = ScreenDimensions.width > ScreenDimensions.height ? ScreenDimensions.height : ScreenDimensions.width;
const screenHeight = ScreenDimensions.height > ScreenDimensions.width ? ScreenDimensions.height : ScreenDimensions.width;

const scaleFactor = 0.9;
const viewPortX = 414 * scaleFactor;
const viewPortY = 896 * scaleFactor;
const widthBaseScale = screenWidth / viewPortX;
const heightBaseScale = screenHeight / viewPortY;
const guidelineBaseHeight = 680;
const guidelineBaseWidth = 350;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// for bootstrapping size in different devices
const scale = (size: number) => (ScreenDimensions.width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (screenHeight / guidelineBaseHeight) * size;
const horizontalScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// for width  pixel
const widthNormalizer = (size: number) => normalize(size, 'width');
// for height  pixel
const heightNormalizer = (size: number) => normalize(size, 'height');
// for font  pixel
const fontPixel = (size: number) => heightNormalizer(size);
// for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => heightNormalizer(size);
// for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => widthNormalizer(size);

export const Pixelate = {
  widthNormalizer,
  heightNormalizer,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  screenWidth,
  screenHeight,
  verticalScale,
  horizontalScale,
};
