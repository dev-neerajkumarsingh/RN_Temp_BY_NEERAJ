import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Pressable, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, GlobalStyles } from '@themes';
import { RootState, hideToast } from '@redux';
import { CommonText, CommonImage } from '@components';
import { useToasterStyles } from './Styles';
import type { IconTypes } from '@icons';

type ToastType = 'error' | 'success' | 'info' | 'warn';

// Configuration map for toast types - improves reusability and maintainability
const TOAST_CONFIG: Record<ToastType, { icon: IconTypes; colorKey: 'error' | 'success' | 'info' | 'warning'; bgKey: 'lightError' | 'lightSuccess' | 'lightInfo' | 'lightWarning' }> = {
  error: { icon: 'error', colorKey: 'error', bgKey: 'lightError' },
  success: { icon: 'tick', colorKey: 'success', bgKey: 'lightSuccess' },
  info: { icon: 'info', colorKey: 'info', bgKey: 'lightInfo' },
  warn: { icon: 'warning', colorKey: 'warning', bgKey: 'lightWarning' },
};

export const CommonToaster = () => {
  const [showToaster, setShowToaster] = useState(false);
  const { status, type, title, message, duration } = useSelector(
    (store: RootState) => store.toast,
  );
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const toasterStyles = useToasterStyles();
  const globalStyles = GlobalStyles(theme);

  // Get toast configuration based on type
  const toastConfig = useMemo(() => {
    return type ? TOAST_CONFIG[type as ToastType] : null;
  }, [type]);

  // Memoize colors based on toast type
  const toastColors = useMemo(() => {
    if (!toastConfig) {
      return {
        borderColor: theme.colors.black,
        backgroundColor: theme.colors.white,
        textColor: theme.colors.black,
      };
    }
    return {
      borderColor: theme.colors[toastConfig.colorKey],
      backgroundColor: theme.colors[toastConfig.bgKey],
      textColor: theme.colors[toastConfig.colorKey],
    };
  }, [toastConfig, theme.colors]);

  // Memoize container style
  const containerStyle = useMemo(
    () => [
      toasterStyles.toastContainer,
      {
        borderColor: toastColors.borderColor,
        backgroundColor: toastColors.backgroundColor,
      },
      globalStyles.commonShadow,
    ],
    [toasterStyles.toastContainer, toastColors, globalStyles.commonShadow]
  );

  // Memoize message style
  const messageStyle = useMemo(
    () => [
      toasterStyles.toastTitle,
      toasterStyles.toastMessage,
      title && toasterStyles.toastMessageTop,
    ],
    [toasterStyles.toastTitle, toasterStyles.toastMessage, toasterStyles.toastMessageTop, title]
  );

  // Memoize close handler
  const handleClose = useCallback(() => {
    dispatch(hideToast());
  }, [dispatch]);

  useEffect(() => {
    setShowToaster(Boolean(status));

    if (status) {
      Keyboard.dismiss();
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [status, dispatch, duration]);

  if (!showToaster) {
    return null;
  }

  return (
    <View style={toasterStyles.mainContainer}>
      <View style={containerStyle}>
        <View style={toasterStyles.toastContainerPosition}>
          {toastConfig && (
            <CommonImage
              sourceType="localSvg"
              svgSource={toastConfig.icon}
              width={22}
              height={22}
              color={toastColors.textColor}
            />
          )}
          <View style={toasterStyles.toastContentContainer}>
            {title && (
              <CommonText
                content={title}
                color={toastColors.textColor}
                fontSize={18}
                fontType={'InterExtraBold'}
                moreStyle={toasterStyles.toastTitle}
              />
            )}
            {message && (
              <CommonText
                content={message}
                color={title ? theme.colors.black : toastColors.textColor}
                fontSize={13}
                fontType={'InterLight'}
                moreStyle={messageStyle}
              />
            )}
          </View>
        </View>
        <Pressable
          style={toasterStyles.toastCloseButton}
          onPress={handleClose}>
          <CommonImage
            sourceType="localSvg"
            svgSource="close"
            width={16}
            height={16}
            color={theme.colors.black}
          />
        </Pressable>
      </View>
    </View>
  );
};
