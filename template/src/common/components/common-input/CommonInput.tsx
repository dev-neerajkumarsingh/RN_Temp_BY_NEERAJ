import * as React from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
  NativeSyntheticEvent,
  FocusEvent,
} from 'react-native';
import { useTheme } from '@themes';
import { CommonText, CommonImage } from '@components';
import { useInpuptStyles } from './Styles';
import { Pixelate, responsiveFontSize } from '@utils';
import type { IconTypes } from '@icons';

type Props = {
  placeholder?: string;
  placeholderTextColor?: string;
  value: string;
  inputColor?: string;
  onChangeText: (text: string) => void;
  moreInputStyle?: StyleProp<ViewStyle>;
  moreRightContainerStyle?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  cursorColor?: string;
  fontFamily?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  maxLength?: number;
  size?: number;
  textInputRef?: any;
  mainTitleStyle?: StyleProp<TextStyle>;
  moreContainerStyle?: StyleProp<ViewStyle>;
  returnKeyType?: any;
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words';
  leftIcon?: IconTypes;
  leftIconSource?: 'url' | 'localNonSvg' | 'localSvg';
  leftIconWidth?: number;
  leftIconHeight?: number;
  leftIconColor?: string;
  rightIcon?: IconTypes;
  rightIconSource?: 'url' | 'localNonSvg' | 'localSvg';
  rightIconWidth?: number;
  rightIconHeight?: number;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  onPressRightIcon?: (text: string) => void;
  msgError?: string;
  onFocus?: (event: NativeSyntheticEvent<FocusEvent>) => void;
  onBlur?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  disableError?: boolean;
  inputMode?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';
  renderLeftIcon?: () => React.ReactNode;
  renderRightIcon?: () => React.ReactNode;
  // New props for X-style animation
  enableFloatingLabel?: boolean;
  //floatingLabelColor?: string;
  focusedBorderColor?: string;
  imgSource?: string;
  leftEmptyBoxStyle?: ViewStyle;
  disabledContainerStyle?: ViewStyle;
  onSubmitEditing?: () => void;
};

export const CommonInput: React.FC<Props> = ({
  moreContainerStyle,
  placeholder,
  placeholderTextColor,
  value,
  size = 16,
  onChangeText,
  moreInputStyle,
  secureTextEntry,
  onSubmitEditing,
  cursorColor,
  keyboardType,
  moreRightContainerStyle,
  multiline,
  editable = true,
  numberOfLines,
  maxLength = 100,
  inputMode,
  textInputRef,
  returnKeyType,
  autoCapitalize = 'none',
  textAlignVertical,
  fontFamily = 'Poppins_Regular',
  leftIcon,
  leftIconSource = 'localSvg',
  leftIconWidth = 3.5,
  leftIconHeight = 3.5,
  leftIconColor = '#000',
  rightIcon,
  rightIconSource = 'localSvg',
  rightIconWidth = 3.5,
  rightIconHeight = 3.5,
  inputColor,
  onPressRightIcon,
  msgError = '',
  onFocus,
  onBlur,
  containerStyle,
  inputStyle,
  errorTextStyle,
  disableError = false,
  renderLeftIcon,
  renderRightIcon,
  // New props
  enableFloatingLabel = false,
  //floatingLabelColor = '#000',
  focusedBorderColor,
  imgSource,
  leftEmptyBoxStyle,
  disabledContainerStyle,
}) => {
  const { theme } = useTheme();
  const inputStyles = useInpuptStyles();

  // Animation values
  const labelAnimation = React.useRef(
    new Animated.Value(value ? 1 : 0),
  ).current;
  const [isFocused, setIsFocused] = React.useState(false);

  // Handle focus animation
  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);
    if (enableFloatingLabel) {
      Animated.timing(labelAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onFocus && onFocus(event as any);
  };

  // Handle blur animation
  const handleBlur = () => {
    setIsFocused(false);
    if (enableFloatingLabel && !value) {
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur && onBlur();
  };

  // Update animation when value changes externally
  const runLabelAnimation = React.useCallback(() => {
    if (!enableFloatingLabel) {
      return;
    }

    Animated.timing(labelAnimation, {
      toValue: value || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocused, enableFloatingLabel, labelAnimation]);

  React.useEffect(() => {
    runLabelAnimation();
  }, [runLabelAnimation]);

  // Animated styles for floating label
  const labelStyle = {
    position: 'absolute' as const,
    left: leftIcon ? 50 : 12,
    color: placeholderTextColor || theme.colors.textSecondary,
    backgroundColor:
      isFocused || value ? theme.colors.primary : theme.colors.transparent0,
    paddingHorizontal: 3,
    borderRadius: 5,
    // zIndex: 10,
  };

  const animatedLabelStyle = {
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [responsiveFontSize(2), responsiveFontSize(1.4)],
    }),
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
  };

  const getBorderColor = () => {
    if (!disableError && msgError?.length > 0) {
      return theme.colors.error;
    }
    if (isFocused) {
      return focusedBorderColor || theme.colors.senary;
    }
    if (value?.length > 0) {
      return theme.colors.senary;
    }
    return theme?.colors.borderColor;
  };

  return (
    <>
      <View
        style={[
          inputStyles.container,
          {
            borderColor: getBorderColor(),
            backgroundColor: theme.colors.primary,
          },
          moreContainerStyle,
          containerStyle,
        ]}>
        {/* Floating Label */}
        {enableFloatingLabel && placeholder && (
          <Animated.Text
            style={[labelStyle, animatedLabelStyle, { fontFamily }]}>
            {placeholder}
          </Animated.Text>
        )}

        <View style={[inputStyles.leftContainer, moreInputStyle]}>
          {renderLeftIcon ? (
            renderLeftIcon()
          ) : leftIcon ? (
            leftIcon === 'tick' ? (
              imgSource ? (
                <CommonImage
                  sourceType={leftIconSource}
                  source={imgSource}
                  moreStyles={inputStyles.leftIconContainer}
                  width={leftIconWidth}
                  height={leftIconHeight}
                  // color={theme.colors.voidBlack}
                />
              ) : (
                <CommonImage
                  width={leftIconWidth}
                  height={leftIconHeight}
                  sourceType={'localSvg'}
                  svgSource="tick"
                />
              )
            ) : (
              <CommonImage
                sourceType={leftIconSource}
                svgSource={leftIcon}
                moreStyles={inputStyles.leftIconContainer}
                width={leftIconWidth}
                height={leftIconHeight}
                color={leftIconColor ? leftIconColor : theme.colors.black}
              />
            )
          ) : (
            <View
              style={[inputStyles.textInputContainerLeft, leftEmptyBoxStyle]}
            />
          )}

          <TextInput
            ref={textInputRef}
            autoComplete="off"
            placeholder={enableFloatingLabel ? undefined : placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry}
            cursorColor={cursorColor}
            keyboardType={keyboardType}
            editable={editable}
            textAlignVertical={textAlignVertical}
            inputMode={inputMode}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            value={value}
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            style={[
              inputStyles.textInputContainer,
              {
                color: inputColor || theme.colors.secondary,
                fontFamily,
                fontSize: Pixelate.fontPixel(size),
                lineHeight: Pixelate.fontPixel(size) + 5,
                // marginTop:
                // paddingTop: enableFloatingLabel ? 24 : 15,
                // paddingBottom: enableFloatingLabel ? 8 : 15,
                // marginTop: enableFloatingLabel ? 4 : 0,
              },
              inputStyle,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </View>

        {(renderRightIcon || rightIcon) && (
          <Pressable
            style={[inputStyles.rightContainer, moreRightContainerStyle]}
            onPress={() => {
              onPressRightIcon &&
                rightIcon &&
                onPressRightIcon(rightIcon.toString());
            }}>
            {renderRightIcon
              ? renderRightIcon()
              : rightIcon && (
                  <CommonImage
                    sourceType={rightIconSource}
                    svgSource={rightIcon}
                    width={rightIconWidth}
                    height={rightIconHeight}
                    color={theme.colors.black}
                  />
                )}
          </Pressable>
        )}

        {Boolean(!editable) && (
          <View
            style={[inputStyles.disabledContainer, disabledContainerStyle]}
          />
        )}
      </View>

      {!disableError && msgError && (
        <CommonText
          content={msgError}
          color={theme.colors.error}
          fontSize={12}
          fontType={'InterBold'}
          moreStyle={[inputStyles.errorText, errorTextStyle]}
        />
      )}
    </>
  );
};
