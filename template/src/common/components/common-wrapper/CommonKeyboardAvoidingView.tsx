import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { KeyboardAvoidingView, KeyboardToolbar, KeyboardController, AndroidSoftInputModes } from 'react-native-keyboard-controller';
import { useWrapperStyles } from './Styles';
import {useFocusEffect} from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
  behavior?: 'height' | 'position' | 'padding' | 'translate-with-padding';
  keyboardVerticalOffset?: number;
  moreStyle?: StyleProp<ViewStyle>[] | StyleProp<ViewStyle>;
}

export const CommonKeyboardAvoidingView: React.FC<Props> = ({
  children = <></>,
  behavior = 'padding',
  keyboardVerticalOffset = 50,
  moreStyle = {},
}) => {
  const styles = useWrapperStyles();

  useFocusEffect(
    React.useCallback(() => {
      console.log("ChatScreen AndroidSoftInputModes");
      KeyboardController.setInputMode(
        AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
      );
    }, []),
  );

  return (
    <>
      <KeyboardAvoidingView
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={[styles.keyboardAvoidingViewcontainer, moreStyle]}>
        {children}
      </KeyboardAvoidingView>
      <KeyboardToolbar />
    </>
  );
};
