import {
    Platform,
    StyleSheet,
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {Avatar, Header, Icon, Text} from "react-native-elements";

import React from "react";

import styles from "./ce-theme-style";

import MessageList from "./ce-view-messagelist";
import MessageEntry from "./ce-view-messageentry";
import ChatEngineProvider from "./ce-core-chatengineprovider";

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const chatRoomModel = ChatEngineProvider.getChatRoomModel();
        let self = this;

        return (
            <View style={styles.container} style={{flex: 1}}>
                {(!chatRoomModel || !chatRoomModel.state || !chatRoomModel.state.ready) ? (
                    <Text> Loading... </Text>
                ) : (
                    <View style={{flex: 1}}>
                        <MessageList ref="MessageList" navigation={self.props.navigation} now={ChatEngineProvider.getChatRoomModel().state.now}
                                     chatRoomModel={ChatEngineProvider.getChatRoomModel()}/>
                        <MessageEntry chatRoomModel={ChatEngineProvider.getChatRoomModel()} typingIndicator
                                      keyboardVerticalOffset={80}/>
                    </View>
                )}
            </View>
        );
    }
}

export default ChatRoom;