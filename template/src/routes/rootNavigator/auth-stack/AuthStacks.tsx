import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Onboard, Login, Signup, ForgotPassword, Otp } from '@screens';

const AuthStack = createStackNavigator();

export const AuthStacks: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName="Onboard">
      <AuthStack.Screen
        name="Onboard"
        component={Onboard}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="OTP"
        component={Otp}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
