import React from 'react';
import { Platform } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

const offset = { closed: 0, opened: Platform.OS === 'android' ? -5 : 10 };

interface Props {
  children: React.ReactNode;
}

export const CommonKeyboardStickyView: React.FC<Props> = ({
  children = <></>,
}) => {
  return <KeyboardStickyView offset={offset}>{children}</KeyboardStickyView>;
};
