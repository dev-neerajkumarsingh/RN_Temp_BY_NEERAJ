import * as React from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@themes';
import { CommonText, CommonImage } from '@components';
import { useInpuptStyles } from './Styles';
import { responsiveFontSize, responsiveWidth } from '@utils';
import type { IconTypes } from '@icons';
import type { FontTypes } from '@fonts';

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
  fontFamily?: FontTypes;
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
  leftIconWidth?: number;
  leftIconHeight?: number;
  rightIcon?: IconTypes;
  rightIconWidth?: number;
  rightIconHeight?: number;
  textAlignVertical?: 'top' | 'bottom' | 'left' | 'right';
  onPressRightIcon?: (text: string) => void;
  msgError?: string;
  onFocus?: () => void;
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
};

const CommonInputComponent: React.FC<Props> = ({
  moreContainerStyle,
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  moreInputStyle,
  secureTextEntry,
  cursorColor,
  keyboardType,
  moreRightContainerStyle,
  multiline,
  editable = true,
  numberOfLines,
  maxLength,
  inputMode,
  textInputRef,
  returnKeyType,
  autoCapitalize,
  fontFamily = 'InterMedium',
  leftIcon,
  leftIconWidth = 3.5,
  leftIconHeight = 3.5,
  rightIcon,
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
}) => {
  const { theme } = useTheme();
  const inputStyles = useInpuptStyles();

  // Memoize border color calculation
  const borderColor = React.useMemo(() => {
    if (!disableError && msgError?.length > 0) {
      return theme.colors.error;
    }
    if (value?.length > 0) {
      return theme.colors.senary;
    }
    return theme.colors.borderColor1;
  }, [disableError, msgError, value, theme.colors]);

  // Memoize container style
  const computedContainerStyle = React.useMemo(
    () => [
      inputStyles.container,
      {
        borderColor,
        backgroundColor: theme.colors.primary,
      },
      moreContainerStyle,
      containerStyle,
    ],
    [inputStyles.container, borderColor, theme.colors.primary, moreContainerStyle, containerStyle]
  );

  // Memoize text input style
  const computedInputStyle = React.useMemo(
    () => [
      inputStyles.textInputContainer,
      {
        color: inputColor || theme.colors.secondary,
        fontFamily,
        fontSize: responsiveFontSize(2),
      },
      inputStyle,
    ],
    [inputStyles.textInputContainer, inputColor, theme.colors.secondary, fontFamily, inputStyle]
  );

  // Memoize right icon press handler
  const handleRightIconPress = React.useCallback(() => {
    if (onPressRightIcon && rightIcon) {
      onPressRightIcon(rightIcon.toString());
    }
  }, [onPressRightIcon, rightIcon]);

  // Memoize left icon rendering
  const leftIconElement = React.useMemo(() => {
    if (renderLeftIcon) {
      return renderLeftIcon();
    }
    if (leftIcon) {
      return (
        <CommonImage
          sourceType="localSvg"
          svgSource={leftIcon}
          moreStyles={inputStyles.leftIconContainer}
          width={responsiveWidth(leftIconWidth)}
          height={responsiveWidth(leftIconHeight)}
          color={theme.colors.secondary}
        />
      );
    }
    return <View style={inputStyles.textInputContainerLeft} />;
  }, [renderLeftIcon, leftIcon, inputStyles, leftIconWidth, leftIconHeight, theme.colors.secondary]);

  // Memoize right icon rendering
  const rightIconElement = React.useMemo(() => {
    if (renderRightIcon) {
      return renderRightIcon();
    }
    if (rightIcon) {
      return (
        <CommonImage
          sourceType="localSvg"
          svgSource={rightIcon}
          width={responsiveWidth(rightIconWidth)}
          height={responsiveWidth(rightIconHeight)}
          color={theme.colors.secondary}
        />
      );
    }
    return null;
  }, [renderRightIcon, rightIcon, rightIconWidth, rightIconHeight, theme.colors.secondary]);

  return (
    <>
      <View style={computedContainerStyle}>
        <View style={[inputStyles.leftContainer, moreInputStyle]}>
          {leftIconElement}
          <TextInput
            ref={textInputRef}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor || theme.colors.secondary}
            secureTextEntry={secureTextEntry}
            cursorColor={cursorColor}
            keyboardType={keyboardType}
            editable={editable}
            inputMode={inputMode}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            value={value}
            onChangeText={onChangeText}
            style={computedInputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>
        {(renderRightIcon || rightIcon) && (
          <Pressable
            style={[inputStyles.rightContainer, moreRightContainerStyle]}
            onPress={handleRightIconPress}>
            {rightIconElement}
          </Pressable>
        )}
        {Boolean(!editable) && <View style={inputStyles.disabledContainer} />}
      </View>
      {!disableError && msgError && (
        <CommonText
          content={msgError}
          color={theme.colors.error}
          fontSize={13}
          fontType={'InterMedium'}
          moreStyle={[inputStyles.errorText, errorTextStyle]}
        />
      )}
    </>
  );
};

// Export memoized component to prevent unnecessary re-renders
export const CommonInput = React.memo(CommonInputComponent);
