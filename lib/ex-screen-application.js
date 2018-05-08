import {TabNavigator} from 'react-navigation';

import ChatRoomScreen from "./ex-screen-chat-chatroom";
import UserListScreen from "./ex-screen-chat-userlist";
import SettingsScreen from "./ex-screen-settings";

export default TabNavigator({
    ChatRoom: {screen: ChatRoomScreen},
    UserList: {screen: UserListScreen},
    Settings: {screen: SettingsScreen}
}, {
    initialRouteName: 'ChatRoom',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
    tabBarOptions: {
        showIcon: true,
        showLabel: false
    },
});