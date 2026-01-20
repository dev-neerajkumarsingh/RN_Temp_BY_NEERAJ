import * as React from 'react';
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
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { QueryProvider } from '@network';
import { ThemedNavigationContainer } from './components/ThemedNavigationContainer';
import { ExampleStacks } from '../rootNavigator/example-stack/ExampleStacks';
import { RootNavigator } from '../rootNavigator/RootNavigator'; // Add this import back when using RootNavigator

export const InitialNavigator = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryProvider>
          <ThemeProvider>
            <KeyboardProvider>
              <ThemedNavigationContainer>
                <ExampleStacks />
                {/* <RootNavigator /> */}
                <Loader />
                <CommonToaster />
                <CommonPopup />
                <CommonErrorScreen />
              </ThemedNavigationContainer>
            </KeyboardProvider>
          </ThemeProvider>
        </QueryProvider>
      </PersistGate>
    </Provider>
  );
};
