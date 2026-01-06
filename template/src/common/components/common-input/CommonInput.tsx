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
// import { LangList } from '@constants';
import { CommonText, CommonImage } from '@components';
import { useInpuptStyles } from './Styles';
import { responsiveFontSize, responsiveWidth } from '@utils';
import type { IconTypes } from '@icons';
import type { FontTypes } from '@fonts';

// type LangListType = {
//   [key: string]: string[];
// };
// const langList: LangListType = LangList;

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
  // Customization props
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

export const CommonInput: React.FC<Props> = ({
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
  textAlignVertical,
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
  containerStyle,
  inputStyle,
  errorTextStyle,
  disableError = false,
  renderLeftIcon,
  renderRightIcon,
}) => {
  // const { selectedLang } = useSelector((state: RootState) => state.lang);
  // const updatedPlaceholder =
  //   selectedLang === 'en'
  //     ? placeholder
  //     : LangList?.hasOwnProperty(placeholder)
  //     ? langList[placeholder][selectedLang === 'en' ? 0 : 1]
  //     : placeholder;
  const { theme } = useTheme();
  const inputStyles = useInpuptStyles();

  return (
    <>
      <View
        style={[
          inputStyles.container,
          {
            borderColor:
              !disableError && msgError?.length > 0
                ? theme.colors.error
                : value?.length > 0
                ? theme.colors.senary
                : theme?.colors.borderColor1,
            backgroundColor: theme.colors.primary,
          },
          moreContainerStyle,
          containerStyle,
        ]}>
        <View style={[inputStyles.leftContainer, moreInputStyle]}>
          {renderLeftIcon ? (
            renderLeftIcon()
          ) : leftIcon ? (
            <CommonImage
              sourceType="localSvg"
              svgSource={leftIcon}
              moreStyles={inputStyles.leftIconContainer}
              width={responsiveWidth(leftIconWidth)}
              height={responsiveWidth(leftIconHeight)}
              color={theme.colors.secondary}
            />
          ) : (
            <View style={inputStyles.textInputContainerLeft} />
          )}
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
            // textAlignVertical={textAlignVertical}
            onChangeText={onChangeText}
            style={[
              inputStyles.textInputContainer,
              {
                color: inputColor || theme.colors.secondary,
                fontFamily,
                fontSize: responsiveFontSize(2),
              },
              inputStyle,
            ]}
            onFocus={onFocus}
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
                    sourceType="localSvg"
                    svgSource={rightIcon}
                    width={responsiveWidth(rightIconWidth)}
                    height={responsiveWidth(rightIconHeight)}
                    color={theme.colors.secondary}
                  />
                )}
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
