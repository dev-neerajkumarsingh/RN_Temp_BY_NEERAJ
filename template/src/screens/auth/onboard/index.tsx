import React from 'react';
import { CommonBox, CommonButton } from '@components';
import { useOnboardStyles } from './Styles';
import { useNavs } from '@hooks';
import { useTheme, GlobalStyles } from '@themes';
import { View, Modal } from 'react-native';
import { showToast } from '@redux';
import { useDispatch } from 'react-redux';

export const Onboard = () => {
  const { theme } = useTheme();
  const globalStyles = GlobalStyles(theme);
  const styles = useOnboardStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <CommonBox moreStyles={globalStyles.centerContent}>
      <CommonButton
        width={'90%'}
        height={50}
        label="Login"
        fontSize={16}
        onPress={() => useNavs.navigate('Login')}
      />
      <CommonButton
        width={'90%'}
        height={50}
        label="Sign Up"
        fontSize={16}
        onPress={() => useNavs.navigate('Signup')}
        moreButtonStyle={styles.button}
      />
      <CommonButton
        width={'90%'}
        height={50}
        label="Open Modal"
        fontSize={16}
        onPress={() => setOpen(true)}
        moreButtonStyle={styles.button}
      />
      {open && (
        <Modal visible={open} transparent>
          <View
            style={{
              // position: 'absolute',
              // bottom: 0,
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CommonButton
              width={'90%'}
              height={50}
              label="Open Toaster"
              fontSize={16}
              onPress={() =>
                dispatch(
                  showToast({
                    title: 'Hello',
                    message: 'World',
                    type: 'error',
                    duration: 3000,
                  }),
                )
              }
              moreButtonStyle={styles.button}
            />
            <CommonButton
              width={'90%'}
              height={50}
              label="Go Back"
              fontSize={16}
              onPress={() => setOpen(false)}
              moreButtonStyle={styles.button}
            />
          </View>
        </Modal>
      )}
    </CommonBox>
  );
};
