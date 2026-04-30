import React from 'react';
import { View } from 'react-native';
import { CommonBox, CommonText, CommonButton, CommonImage } from '@components';
import { useUIStore, hideErrorScreen } from '@stores';
import { useErrorScreenStyles } from './Styles';
import { onlineManager } from '@tanstack/react-query';

const CommonErrorScreenComponent = () => {
  const [states, setStates] = React.useState({ status: false });
  const { status, buttonLabel, title, message, networkConfig } = useUIStore(
    state => state.errorScreen,
  );
  const styles = useErrorScreenStyles();

  const onPressTryAgain = async () => {
    //console.log('#>>>> networkConfig :: ', networkConfig)
    const isOnline = onlineManager.isOnline();

    if (Boolean(isOnline) && Boolean(networkConfig)) {
      //return await NetworkManager({});
    }
  };

  const onPressClose = () => {
    hideErrorScreen();
  };

  React.useEffect(() => {
    setStates(prev => ({ ...prev, status: status }));
  }, [status]);

  if (!states.status) {
    return null;
  } else {
    return (
      <CommonBox moreStyles={styles.container}>
        <CommonButton
          width={20}
          height={20}
          contentType={'localSvg'}
          svgColor={'black'}
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
              color={'error'}
            />
          </View>
          <CommonText
            color={'black'}
            fontSize={20}
            content={title}
            moreStyle={styles.title}
          />
          <CommonText
            color={'grey'}
            fontSize={16}
            content={message}
            moreStyle={styles.msg}
          />
        </View>
        <CommonButton
          width={'85%'}
          height={45}
          contentType={'text'}
          label={buttonLabel}
          textColor={'primary'}
          fontSize={14}
          moreButtonStyle={styles.buttonContainer}
          onPress={onPressTryAgain}
        />
      </CommonBox>
    );
  }
};

export const CommonErrorScreen = React.memo(CommonErrorScreenComponent);