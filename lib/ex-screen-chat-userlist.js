import React, {Component} from 'react';
import UserList from "./ce-view-userlist";
import ChatEngineProvider from "./ce-core-chatengineprovider";
import styles from "./ce-theme-style";
import {Avatar, Header, Icon, Text} from "react-native-elements";

import {
    ActivityIndicator,
    FlatList,
    Platform,
    View
} from 'react-native';

class UserListScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: "Foo Bar Baz",
        tabBarIcon: () => <Icon name="people" size={26} color="white"/>
    };

    render() {
        const chatRoomModel = ChatEngineProvider.getChatRoomModel();
        let self = this;

        return (
            <View style={styles.container} style={{flex: 1}}>
                {(!chatRoomModel || !chatRoomModel.state || !chatRoomModel.state.ready) ? (
                    <Text> Loading... </Text>
                ) : (
                    <View style={{flex: 1}}>
                        <UserList ref="UserList" navigation={self.props.navigation}
                                  chatRoomModel={ChatEngineProvider.getChatRoomModel()}
                                  channelFriendly={ChatEngineProvider.getChatRoomModel().state.channelFriendly}/>
                    </View>
                )}
            </View>
        );
    }
}

export default UserListScreen;