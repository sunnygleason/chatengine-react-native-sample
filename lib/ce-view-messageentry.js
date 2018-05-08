import {
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import {Icon} from "react-native-elements";
import React from "react";
import NameTypingIndicator from "./ce-view-nametypingindicator";
import styles from "./ce-theme-style";
import ChatEngineProvider from "./ce-core-chatengineprovider";

class MessageEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatInput: "",
        };

        this.setChatInput = this.setChatInput.bind(this);
    }

    sendChat() {
        var self = this;

        if (self.state.chatInput) {
            var chat = self.props.chatRoomModel.state.chat;

            chat.emit("message", {
                text: self.state.chatInput,
                sentAt: new Date().toISOString(),
                from: {
                    uuid: ChatEngineProvider._uuid,
                    email: ChatEngineProvider._username,
                    name: ChatEngineProvider._name
                }
            });

            this.setState({chatInput: ""});
            //
            // // FIXME update after send message
            // setTimeout(() => {
            //     ChatEngineProvider.getChatRoomModel().props.messageListModel.fireStateChange();
            // }, 800);
        }
    }

    setChatInput(value) {
        this.setState({chatInput: value});

        if (this.props.typingIndicator) {
            var chat = this.props.chatRoomModel.state.chat;

            if (value !== "") {
                chat.typingIndicator.startTyping();
            } else {
                chat.typingIndicator.stopTyping();
            }
        }
    }

    onTypingIndicator() {
        if (this.props.typingIndicator) {
            return (<NameTypingIndicator chatRoomModel={ChatEngineProvider.getChatRoomModel()}/>);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={this.props.keyboardVerticalOffset || 0}>
                {this.onTypingIndicator()}
                <View style={styles.footer}>
                    <TextInput
                        value={this.state.chatInput}
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Send Message"
                        onChangeText={this.setChatInput}
                        onSubmitEditing={() => {
                            this.sendChat();
                        }}
                    />
                    <TouchableOpacity
                        style={{backgroundColor: "#D02129"}}
                        onPress={() => {
                            this.sendChat();
                        }}
                    >
                        <Icon
                            reverse
                            name="send"
                            size={26}
                            color="#D02129"
                            style={styles.send}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default MessageEntry;