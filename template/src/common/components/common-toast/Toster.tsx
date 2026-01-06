import React, { useEffect, useState } from 'react';
import { View, Pressable, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, GlobalStyles } from '@themes';
import { RootState, hideToast } from '@redux';
// import * as Progress from 'react-native-progress';
import { CommonText, CommonImage } from '@components';
import { useToasterStyles } from './Styles';

export const CommonToaster = () => {
  const [states, setStates] = useState({
    showToaster: false,
    progressValue: 0,
  });
  const { status, type, title, message, duration } = useSelector(
    (store: RootState) => store.toast,
  );
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const toasterStyles = useToasterStyles();
  const globalStyles = GlobalStyles(theme);

  useEffect(() => {
    setStates(prev => ({
      ...prev,
      showToaster: Boolean(status),
      progressValue: 1,
    }));

    if (status) {
      Keyboard.dismiss();
      setTimeout(() => {
        dispatch(hideToast());
      }, duration);
    }
  }, [status, dispatch, duration]);

  if (!states.showToaster) {
    return null;
  }

  return (
    <View style={toasterStyles.mainContainer}>
      <View
        style={[
          toasterStyles.toastContainer,
          {
            borderColor:
              type === 'error'
                ? theme.colors.error
                : type === 'success'
                ? theme.colors.success
                : type === 'info'
                ? theme.colors.info
                : type === 'warn'
                ? theme.colors.warning
                : theme.colors.black,
            backgroundColor:
              type === 'error'
                ? theme.colors.lightError
                : type === 'success'
                ? theme.colors.lightSuccess
                : type === 'info'
                ? theme.colors.lightInfo
                : type === 'warn'
                ? theme.colors.lightWarning
                : theme.colors.white,
          },
          globalStyles.commonShadow,
        ]}>
        <View style={toasterStyles.toastContainerPosition}>
          {type === 'error' ? (
            <CommonImage
              sourceType="localSvg"
              svgSource="error" // add error icon and pass the name here...
              width={22}
              height={22}
              color={theme.colors.error}
            />
          ) : type === 'success' ? (
            <CommonImage
              sourceType="localSvg"
              svgSource="tick" // add error icon and pass the name here...
              width={2}
              height={22}
              color={theme.colors.success}
            />
          ) : type === 'info' ? (
            <CommonImage
              sourceType="localSvg"
              svgSource="info" // add error icon and pass the name here...
              width={22}
              height={22}
              color={theme.colors.info}
            />
          ) : type === 'warn' ? (
            <CommonImage
              sourceType="localSvg"
              svgSource="warning" // add error icon and pass the name here...
              width={22}
              height={22}
              color={theme.colors.warning}
            />
          ) : null}
          <View style={toasterStyles.toastContentContainer}>
            {title && (
              <CommonText
                content={title}
                color={
                  type === 'error'
                    ? theme.colors.error
                    : type === 'success'
                    ? theme.colors.success
                    : type === 'info'
                    ? theme.colors.info
                    : type === 'warn'
                    ? theme.colors.warning
                    : theme.colors.black
                }
                fontSize={18}
                fontType={'InterExtraBold'}
                moreStyle={toasterStyles.toastTitle}
              />
            )}
            {message && (
              <CommonText
                content={message}
                color={
                  type === 'error' && !title
                    ? theme.colors.error
                    : type === 'success' && !title
                    ? theme.colors.success
                    : type === 'info' && !title
                    ? theme.colors.info
                    : type === 'warn' && !title
                    ? theme.colors.warning
                    : theme.colors.black
                }
                fontSize={13}
                fontType={'InterLight'}
                moreStyle={[
                  toasterStyles.toastTitle,
                  toasterStyles.toastMessage,
                  title && toasterStyles.toastMessageTop,
                ]}
              />
            )}
          </View>
        </View>
        <Pressable
          style={toasterStyles.toastCloseButton}
          onPress={() => dispatch(hideToast())}>
          <CommonImage
            sourceType="localSvg"
            svgSource="close" // add close icon and pass the name here...
            width={16}
            height={16}
            color={theme.colors.black}
          />
        </Pressable>
        {/* <Progress.Bar
            animated={states.showToaster}
            animationType="timing"
            progress={states.progressValue}
            width={Pixelate.screenWidth / 1.11}
            style={{
              position: 'absolute',
              bottom: 0,
              height: 5,
            }}
            color={
              type === 'success'
                ? DefaultTheme.colors.neon2
                : type === 'info'
                ? DefaultTheme.colors.info
                : type === 'error'
                ? DefaultTheme.colors.red
                : type === 'warn'
                ? DefaultTheme.colors.yellow
                : ''
            }
            unfilledColor={DefaultTheme.colors.transparent}
            borderColor={DefaultTheme.colors.black}
            borderRadius={0}
          /> */}
      </View>
    </View>
  );
};
