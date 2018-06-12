import React from "react";
import ChatRoom from "./ce-view-chatroom";
import { Icon } from 'react-native-elements';

class ChatRoomScreen extends ChatRoom {
    static navigationOptions = ({navigation}) => ({
        tabBarIcon: () => <Icon name="message" size={26} color="white" />
    });
}

export default ChatRoomScreen;