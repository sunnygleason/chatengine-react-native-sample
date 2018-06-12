import {
    SafeAreaView
} from 'react-native';

import {ListItem, Icon} from 'react-native-elements';
import React from "react";
import ChatEngineProvider from "./ce-core-chatengineprovider";

class SettingsScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: () => <Icon name="settings" size={26} color="white" />
    };

    componentDidMount() {
    }

    switchChannel() {
        this.props.navigation.navigate("ChatList");
    }

    logout() {
        ChatEngineProvider.logout();
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <SafeAreaView>
                <ListItem
                    key={0}
                    title="Switch Channel"
                    leftIcon={{name: "question-answer"}}
                    onPress={() => {
                        this.switchChannel();
                    }}
                />
                <ListItem
                    key={1}
                    title="Log Out"
                    leftIcon={{name: "power-settings-new"}}
                    onPress={() => {
                        this.logout();
                    }}
                />
            </SafeAreaView>
        );
    }
}

export default SettingsScreen;