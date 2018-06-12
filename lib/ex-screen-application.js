import {React} from 'react';
import {Platform} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Dimensions from 'Dimensions';

import ChatRoomScreen from "./ex-screen-chat-chatroom";
import UserListScreen from "./ex-screen-chat-userlist";
import SettingsScreen from "./ex-screen-settings";

const IS_IPHONE_X = (Platform.OS === 'ios') && (Dimensions.get('window').height === 812);

export default TabNavigator({
    ChatRoom: {screen: ChatRoomScreen},
    UserList: {screen: UserListScreen},
    Settings: {screen: SettingsScreen}
}, {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarPosition: (Platform.OS === 'ios') ? "bottom" : "top",
    initialRouteName: 'ChatRoom',
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            paddingBottom: IS_IPHONE_X ? 30 : 0
        },
        tabStyle: {
            // not currently used
        },
        indicatorStyle: {
            marginBottom: IS_IPHONE_X ? 30 : 0
        }
    }
});