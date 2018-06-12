import {View} from 'react-native';
import {Text} from "react-native-elements";
import React from "react";
import styles from "./ce-theme-style";
import ChatEngineProvider from "./ce-core-chatengineprovider";

class NameTypingIndicator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTyping: false,
            userTyping: "",
        };

        this.onStartTyping = (payload) => {
            this.setState({isTyping: true, userTyping: payload.sender})
        };

        this.onStopTyping = (payload) => {
            this.setState({isTyping: false});
        };
    }

    componentDidMount() {
        var chat = this.props.chatRoomModel.state.chat;

        chat.on('$typingIndicator.startTyping', this.onStartTyping);
        chat.on('$typingIndicator.stopTyping', this.onStopTyping);
    }

    componentWillUnmount() {
        var chat = this.props.chatRoomModel.state.chat;

        if (chat) {
            chat.off('$typingIndicator.startTyping', this.onStartTyping);
            chat.off('$typingIndicator.stopTyping', this.onStartTyping);
        }

        this.setState({isTyping: false});
    }

    renderTypingIndicator() {
        if (this.state.isTyping) {
            if (this.state.userTyping.uuid === ChatEngineProvider._uuid) {
                return (<View><Text>Typing... </Text></View>);
            }

            return (<View><Text> {this.state.userTyping.state.name} is typing... </Text></View>);
        }
    }

    render() {
        return (
            <View style={styles.background}>
                {this.renderTypingIndicator()}
            </View>
        );
    }
}

export default NameTypingIndicator;