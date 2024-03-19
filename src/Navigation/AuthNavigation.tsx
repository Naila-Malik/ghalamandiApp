import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Routes} from '../Utils/Routes';
import SelectLanguage from '../Ui/Sections/Auth/SelectLanguage';
import LoginScreen from '../Ui/Sections/Auth/LoginScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Auth.setLanguage}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={Routes.Auth.setLanguage} component={SelectLanguage} />
      <Stack.Screen name={Routes.Auth.login} component={LoginScreen} />
    </Stack.Navigator>
  );
};
export default AuthStack;
