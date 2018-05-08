import {
    View
} from 'react-native';

import {Avatar, Header, Icon, Text} from "react-native-elements";
import React from "react";
import HTMLView from "react-native-htmlview";
import styles from "./ce-theme-style";
import moment from "moment";
import ChatEngineProvider from "./ce-core-chatengineprovider";

class Message extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    friendlyTime(timeString) {
        if (!timeString || !this.props.now) {
            return "a while ago";
        }

        let maybeVal = moment(timeString).from(this.props.now);

        if (maybeVal === "in a few seconds") {
            return "just now";
        }

        return maybeVal;
    }

    render() {
        let sender = this.props.message.data.from || this.props.message.sender;

        if ((sender.name === "Me") || (sender.name === ChatEngineProvider._name)) {
            return (
                <View style={styles.myMessageContainer}>
                    <View style={styles.myMessages}>
                        <HTMLView value={`<p> ${this.props.message.data.text} </p>`} stylesheet={styles}/>
                        <Text style={styles.messageUID}>{this.friendlyTime(this.props.message.data.sentAt)} </Text>
                        {/*<Text>{this.props.now}</Text>*/}
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.messageContainer}>
                <View style={styles.avatar}>
                    <Avatar
                        small
                        rounded
                        source={{
                            uri:
                                "http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png"
                        }}
                        activeOpacity={0.7}
                    />
                </View>
                <View style={{flexDirection: "column"}}>
                    <Text style={styles.messageUID}>{sender.name}</Text>
                    <View style={styles.receivedMessages}>
                        <HTMLView value={this.props.message.data.text} stylesheet={styles}/>
                        <Text style={styles.friendlyTime}>{this.friendlyTime(this.props.message.data.sentAt)} </Text>
                        {/*<Text>{this.props.now}</Text>*/}
                    </View>
                </View>
            </View>
        );
    }
};

export default Message;