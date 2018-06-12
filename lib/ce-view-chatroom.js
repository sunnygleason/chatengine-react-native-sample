import {
    Platform,
    StyleSheet,
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
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

    renderContents() {
        const chatRoomModel = ChatEngineProvider.getChatRoomModel();
        let self = this;

        return (
            <View>
                <MessageList ref="MessageList" navigation={self.props.navigation}
                             now={ChatEngineProvider.getChatRoomModel().state.now}
                             chatRoomModel={ChatEngineProvider.getChatRoomModel()}/>
                <MessageEntry chatRoomModel={ChatEngineProvider.getChatRoomModel()}
                              typingIndicator
                              keyboardVerticalOffset={80}
                />
            </View>
        );
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        {this.renderContents()}
                    </KeyboardAvoidingView>
                </SafeAreaView>
            );
        }

        return (
            <View style={styles.container}>
                {this.renderContents()}
            </View>
        );
    }
}

export default ChatRoom;