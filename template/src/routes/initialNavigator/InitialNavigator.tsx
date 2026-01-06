import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '../rootNavigator/RootNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from '@redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@themes';
import {
  Loader,
  CommonToaster,
  CommonPopup,
  CommonErrorScreen,
} from '@components';
import { navigationRef } from '@hooks';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { QueryProvider } from '@network';

export const InitialNavigator = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryProvider>
          <ThemeProvider>
            <KeyboardProvider>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
                <Loader />
                <CommonToaster />
                <CommonPopup />
                <CommonErrorScreen />
              </NavigationContainer>
            </KeyboardProvider>
          </ThemeProvider>
        </QueryProvider>
      </PersistGate>
    </Provider>
  );
};
