import * as React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, hidePopup } from '@redux';
import { CommonText, CommonButton } from '@components';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useTheme } from '@themes';
import { useStyles } from './Styles';

export const CommonPopup = () => {
  const [states, setStates] = React.useState({ modalStatus: false });
  const { status, title, buttonLabel, onPressType } = useSelector(
    (store: RootState) => store.popup,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const styles = useStyles();
  const { theme } = useTheme();

  React.useEffect(() => {
    setStates(prev => ({ ...prev, modalStatus: status }));
  }, [status]);

  const onPressClose = () => {
    setStates(prev => ({ ...prev, modalStatus: false }));
    dispatch(hidePopup());
    if (onPressType === 'goback') {
      navigation.goBack();
    }
    if (onPressType === 'poptotop') {
      navigation.dispatch(StackActions.popToTop());
    }
  };

  if (!states.modalStatus) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.popupContainer}>
          <CommonText
            color={theme.colors.primary}
            size={16}
            content={title}
            moreStyle={styles.title}
          />
          <View style={styles.buttonContainer}>
            <CommonButton
              width={'100%'}
              height={35}
              contentType={'text'}
              textColor={theme.colors.primary}
              textSize={14}
              label={buttonLabel}
              onPress={onPressClose}
              moreButtonStyle={styles.buttonStyle}
            />
          </View>
        </View>
      </View>
    );
  }
};
