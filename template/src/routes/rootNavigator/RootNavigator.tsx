import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashStacks } from './splash-stack/SplashStacks';
import { AuthStacks } from './auth-stack/AuthStacks';
import { AppStacks } from './app-stack/AppStacks';

const RootStack = createStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator initialRouteName="SplashStack">
      <RootStack.Screen
        name="SplashStack"
        component={SplashStacks}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AuthStack"
        component={AuthStacks}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AppStack"
        component={AppStacks}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
