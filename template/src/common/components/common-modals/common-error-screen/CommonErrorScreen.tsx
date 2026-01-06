import React from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CommonBox, CommonText, CommonButton, CommonImage} from '@components';
import {RootState, hideErrorScreen} from '@redux';
import {useErrorScreenStyles} from './Styles';
import {onlineManager} from '@tanstack/react-query';

//import {} from '@network';
import {useTheme} from '@themes';

export const CommonErrorScreen = () => {
  const [states, setStates] = React.useState({status: false});
  const {status, buttonLabel, title, message, networkConfig} = useSelector(
    (store: RootState) => store.errorScreen,
  );
  const dispatch = useDispatch();
  const styles = useErrorScreenStyles();
  const {theme} = useTheme();

  const onPressTryAgain = async () => {
    //console.log('#>>>> networkConfig :: ', networkConfig)
    const isOnline = onlineManager.isOnline();

    if (Boolean(isOnline) && Boolean(networkConfig)) {
      //return await NetworkManager({});
    }
  };

  const onPressClose = () => {
    dispatch(hideErrorScreen());
  };

  React.useEffect(() => {
    setStates(prev => ({...prev, status: status}));
  }, [status]);

  if (!states.status) {
    return null;
  } else {
    return (
      <CommonBox moreStyles={styles.container}>
        <CommonButton
          width={20}
          height={20}
          contentType={'svg'}
          svgColor={theme.colors.black}
          moreButtonStyle={styles.backButtonContainer}
          onPress={onPressClose}
        />
        <View style={styles.msgContainer}>
          <View style={styles.errorImgContainer}>
            <CommonImage
              sourceType="localSvg"
              svgSource="error_network"
              width={40}
              height={55}
              color={theme.colors.error}
            />
          </View>
          <CommonText
            color={theme.colors.black}
            size={20}
            content={title}
            moreStyle={styles.title}
          />
          <CommonText
            color={theme.colors.grey1}
            size={16}
            content={message}
            moreStyle={styles.msg}
          />
        </View>
        <CommonButton
          width={'85%'}
          height={45}
          contentType={'text'}
          label={buttonLabel}
          textColor={theme.colors.primary}
          textSize={14}
          moreButtonStyle={styles.buttonContainer}
          onPress={onPressTryAgain}
        />
      </CommonBox>
    );
  }
};
