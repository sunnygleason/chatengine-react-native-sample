import ChatList from "./ce-view-chatlist";
import React from 'react';
import styles from "./ce-theme-style";
import {
    Platform,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    Button,
    FlatList,
    Image,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ChatEngineProvider from "./ce-core-chatengineprovider";
import util from "util";
import ThemeStyle from "./ce-theme-style";
import ThemeColors from "./ce-theme-colors";

class ChatListScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat List',
    };

    render() {
        let self = this;
        let props = {
            defaultChannels: "Lobby,Pets,Misc"
        };

        return (
            <View style={ChatListStyles.chatlist_container}>
                <ImageBackground style={ChatListStyles.chatlist_wallpaper}
                                 source={require('./images/login_gradient.png')}>
                    <ChatList  {...props}
                               navigation={self.props.navigation} />
                </ImageBackground>
            </View>
        );
    }
}

const ChatListStyles = StyleSheet.create({
    chatlist_container: {
        flex: 1,
        flexDirection: 'column',
        padding: 0
    },
    chatlist_wallpaper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: ThemeStyle.DEVICE_WIDTH,
        height: ThemeStyle.DEVICE_HEIGHT,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    chatlist_logo: {
        width: ThemeStyle.DEVICE_WIDTH - 40,
        alignItems: 'center'
    },
    chatlist_input: {
        width: ThemeStyle.DEVICE_WIDTH - 40,
        color: ThemeColors.input_dark_textcolor,
        borderRadius: 20,
        paddingHorizontal: 20,
        fontSize: 18,
        height: 40,
        backgroundColor: ThemeColors.input_bg,
        marginBottom: 10,
        padding: 10
    },
    chatlist_button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ThemeColors.button_background,
        paddingVertical: 15,
        borderRadius: 20
    },
    chatlist_buttonText: {
        color: ThemeColors.button_text,
        textAlign: 'center',
        fontWeight: '700'
    }
});

export default ChatListScreen;