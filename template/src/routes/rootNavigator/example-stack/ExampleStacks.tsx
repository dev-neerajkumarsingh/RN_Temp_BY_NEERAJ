import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Examples } from '../../../../examples/index';
import {
  CommonBoxEx,
  CommonTextEx,
  CommonButtonEx,
  CommonInputEx,
  CommonImageEx,
  CommonDropDownEx,
  CommonTopTabsEx,
  CommonBottomSheetEx,
} from '../../../../examples/components';

const ExampleStack = createStackNavigator();

export const ExampleStacks = () => {
  return (
    <ExampleStack.Navigator initialRouteName="Examples">
      <ExampleStack.Screen
        name="Examples"
        component={Examples}
        options={{ headerShown: false }}
      />
      <ExampleStack.Screen
        name="CommonBoxEx"
        component={CommonBoxEx}
        options={{ headerShown: false }}
      />
      <ExampleStack.Screen
        name="CommonTextEx"
        component={CommonTextEx}
        options={{ headerShown: false }}
      />
      <ExampleStack.Screen
        name="CommonButtonEx"
        component={CommonButtonEx}
        options={{ headerShown: false }}
      />
      <ExampleStack.Screen
        name="CommonInputEx"
        component={CommonInputEx}
        options={{ headerShown: false }}
      />
      <ExampleStack.Screen
        name="CommonImageEx"
        component={CommonImageEx}
        options={{ headerShown: false }}
      />
      <ExampleStack.Screen
        name="CommonDropDownEx"
        component={CommonDropDownEx}
        options={{ headerShown: false }}
      />
      <ExampleStack.Screen
        name="CommonTopTabsEx"
        component={CommonTopTabsEx}
        options={{ headerShown: false }}
      />
      <ExampleStack.Screen
        name="CommonBottomSheetEx"
        component={CommonBottomSheetEx}
        options={{ headerShown: false }}
      />
    </ExampleStack.Navigator>
  );
};
