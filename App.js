/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {StackNavigator, SwitchNavigator} from 'react-navigation';

import AppLoadingScreen from "./lib/ex-screen-apploading";
import LoginScreen from "./lib/ex-screen-login";
import ApplicationScreen from "./lib/ex-screen-application";
import ChatListScreen from "./lib/ex-screen-chatlist";

console.ignoredYellowBox = ["Setting a timer"];

export default SwitchNavigator(
    {
        AppLoading: AppLoadingScreen,
        Login: LoginScreen,
        ChatList: ChatListScreen,
        Application: ApplicationScreen
    },
    {
        initialRouteName: 'AppLoading',
    }
);