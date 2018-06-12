import React, {Component} from 'react';
import {Text, ListItem} from "react-native-elements";
import {StyleSheet, FlatList, View, ScrollView, TouchableOpacity} from "react-native";
import styles from "./ce-theme-style";
import util from "util";
import ChatEngineProvider from "./ce-core-chatengineprovider";

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.props.chatRoomModel.addUserListListener(this);

        this.state = {
            userList: {}
        };
    }

    componentDidMount() {
        let self = this;

        this._sub = this.props.navigation.addListener('didFocus', () => {
            ChatEngineProvider.getChatRoomModel().requestUserListRefresh(self);
        });
    }

    componentWillUnmount() {
        this.props.chatRoomModel.removeUserListListener(this);
        this._sub.remove();
    }

    renderOnlineList() {
        let userList = this.state.userList;

        return Object.keys(userList).map(uuid =>
            <ListItem
                key={uuid}
                leftAvatar={{source: {uri: userList[uuid].avatar_url }}}
                title={userList[uuid].name}
                subtitle={userList[uuid].email}
            />
        )
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text h4> {"#" + this.props.channelFriendly + " Users"} </Text>
                </View>
                <ScrollView style={styles.list}>
                    {this.renderOnlineList()}
                </ScrollView>
            </View>
        );
    }
}

export default UserList;