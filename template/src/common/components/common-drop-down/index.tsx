import React, { useState, useRef, useEffect } from 'react';
import {
  Pressable,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Keyboard,
} from 'react-native';
import { CommonImage, CommonText } from '@components';
import { useTheme } from '@themes';
import { useDropDownStyles } from './Styles';
import { Card } from './components/Card';
import type { IconTypes } from '@icons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type Props = {
  initialData: any[];
  selectedValue: string;
  onPressSelected: (val: string) => void;
  highLightSelectedValue?: true;
  moreContainerStyles?: {};
  moreLabelContainerStyle?: {};
  moreIconStyle?: {};
  moreLabelStyle?: {};
  labelIconPath?: IconTypes;
  iconType?: IconTypes;
  width?: number;
  height?: number;
  iconStyle?: {};
  down?: false;
  initialRotationOutput1?: '-90deg';
  isLead?: false;
};

export const CommonDropDown: React.FC<Props> = ({
  initialData = [],
  selectedValue = '',
  onPressSelected,
  highLightSelectedValue = true,
  moreContainerStyles = {},
  moreLabelContainerStyle = {},
  moreIconStyle = {},
  moreLabelStyle = {},
  labelIconPath = 'gender',
  iconType = 'arrowUp',
  width = 14,
  height = 14,
  iconStyle = {},
  initialRotationOutput1 = '-180deg',
  isLead = false,
}) => {
  const [states, setStates] = useState({
    animationStatus: false,
    data: initialData,
  });
  const spinValue = useRef(new Animated.Value(0));
  const roationValue = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [initialRotationOutput1, '-90deg'], //['-90deg', '-180deg'],
  });
  const { theme } = useTheme();
  const styles = useDropDownStyles();

  const startRotation = (val = 1) => {
    Animated.timing(spinValue.current, {
      toValue: val,
      duration: 300,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  };

  useEffect(() => {
    setStates(prev => ({ ...prev, data: initialData }));
  }, [initialData, selectedValue]);

  return (
    <>
      <Pressable
        style={
          states.animationStatus
            ? [
                styles.container,
                moreContainerStyles,
                styles.containerRadius,
                isLead && {
                  borderColor: theme.colors.secondary,
                  borderWidth: 1,
                },
              ]
            : [styles.container, moreContainerStyles]
        }
        onPress={() => {
          if (initialData?.length > 0) {
            Keyboard.dismiss();
            startRotation(states?.animationStatus ? 0 : 1);
            setStates(prev => ({
              ...prev,
              animationStatus: !prev.animationStatus,
            }));
          }
        }}>
        <View style={styles.imgContainer}>
          {labelIconPath?.length > 0 && (
            <CommonImage
              sourceType="localSvg"
              svgSource={labelIconPath as IconTypes} // labelIconPath prop here...
              width={width}
              height={height}
              color={theme.colors.secondary}
              resizeMode="contain"
              moreStyles={iconStyle}
            />
          )}
          <CommonText
            content={selectedValue}
            color={
              initialData.find(item => item === selectedValue)
                ? theme.colors.secondary
                : theme.colors.text1
            }
            size={15}
            fontType="InterMedium"
            moreStyle={[{ marginLeft: 10 }, moreLabelStyle]}
          />
        </View>
        {iconType.length > 0 ? (
          <Animated.View
            style={[
              styles.rotableRightIcon,
              moreIconStyle,
              {
                transform: [
                  {
                    rotate: roationValue,
                  },
                ],
              },
            ]}>
            {iconType.length > 0 && (
              <CommonImage
                sourceType="localSvg"
                svgSource={iconType as IconTypes} // iconType prop here...
                width={width}
                height={height}
                color={theme.colors.secondary}
                resizeMode="contain"
                moreStyles={iconStyle}
              />
            )}
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              styles.rotableRightIcon,
              moreIconStyle,
              {
                transform: [
                  {
                    rotate: roationValue,
                  },
                ],
              },
            ]}>
            <CommonImage
              sourceType="localSvg"
              svgSource="arrowleft" // By default pass Arrow icon from assets here...
              width={width}
              height={height}
              color={theme.colors.secondary}
              resizeMode="contain"
              moreStyles={iconStyle}
            />
          </Animated.View>
        )}
      </Pressable>
      {Boolean(states?.animationStatus) && (
        <>
          {states?.data?.map((item, index) => {
            return (
              <Card
                key={index?.toString()}
                currentIndex={index}
                lastIndex={states?.data?.length - 1}
                item={item}
                selectedValue={selectedValue}
                highLightSelectedValue={highLightSelectedValue}
                onChangeSelect={(val: string) => {
                  onPressSelected(val);
                  startRotation(0);
                  setStates(prev => ({ ...prev, animationStatus: false }));
                }}
                moreLabelContainerStyle={moreLabelContainerStyle}
                moreLabelStyle={moreLabelStyle}
              />
            );
          })}
        </>
      )}
    </>
  );
};
