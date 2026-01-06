import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '@screens';

const SplashStack = createStackNavigator();

export const SplashStacks: React.FC = () => {
  return (
    <SplashStack.Navigator initialRouteName="Splash">
      <SplashStack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
    </SplashStack.Navigator>
  );
};
