import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { RootState } from '@redux';
import { useSelector } from 'react-redux';
import { CommonBox } from '@components';
import { useNavigation } from '@react-navigation/native';

export const Splash = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const navigation = useNavigation();

  React.useEffect(() => {
    SplashScreen.hide(); // Hide splash screen only when you are ready to navigate

    if (userData) {
      // User is logged in
      navigation.reset({ index: 0, routes: [{ name: 'AppStack' }] });
    } else {
      // User is not logged in
      navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
    }
  }, [navigation, userData]);

  return (
    <CommonBox loaderStatus>
      <></>
    </CommonBox>
  );
};
