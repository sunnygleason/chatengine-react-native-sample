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
    ScrollView,
    View
} from 'react-native';

import {ListItem, Icon} from 'react-native-elements';
import React from "react";
import styles from "./ce-theme-style";
import ChatEngineProvider from "./ce-core-chatengineprovider";

class SettingsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: "Foo Bar Baz",
        tabBarIcon: () => <Icon name="settings" size={26} color="white"/>
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
            <View>
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
            </View>
        );
    }
}

export default SettingsScreen;