import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Profile } from '@screens';

const AppStack = createStackNavigator();

export const AppStacks: React.FC = () => {
  return (
    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

      