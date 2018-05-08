import React from "react";

import {
    AsyncStorage,
    StyleSheet,
    Image,
    View
} from 'react-native';

import {Text} from "react-native-elements";

import ThemeStyle from "./ce-theme-style";
import ThemeColors from "./ce-theme-colors";
import ChatEngineProvider from "./ce-core-chatengineprovider";

/**
 * Main Application loading screen.
 */
class AppLoadingScreen extends React.Component {
    static LOADING_TIMEOUT_MS = 2500;

    constructor(props) {
        super(props);
        setTimeout(() => {
            this._bootstrapAsync()
        }, AppLoadingScreen.LOADING_TIMEOUT_MS);
    }

    _bootstrapAsync = async () => {
        //
        // To load local credentials, do something like:
        //
        // https://reactnavigation.org/docs/auth-flow.html
        //
        // to populate userToken. For example:
        //
        try {
            const value = await AsyncStorage.getItem(ChatEngineProvider.ASYNC_STORAGE_USERDATA_KEY);

            if (value) {
                const json = JSON.parse(value);

                if (!json.username || !json.name) {
                    return;
                }

                return ChatEngineProvider.connect(json.username, json.name).then(() => {
                    this.props.navigation.navigate('ChatList', {});
                });
            }
        } catch (error) {
            // Error retrieving data
        }

        // no user identity
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <View style={AppLoadingStyles.apploading_container}>
                <Image source={require('./images/apploading_logo.png')} resizeMode={Image.resizeMode.center}
                       style={AppLoadingStyles.apploading_logo}/>
                <Text style={AppLoadingStyles.apploading_title}>
                    Sample Application
                </Text>
                <Text style={AppLoadingStyles.apploading_subtitle}>
                    React Native Edition
                </Text>
            </View>
        );
    }
}

const AppLoadingStyles = StyleSheet.create({
    apploading_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ThemeColors.welcome_container,
        padding: 20
    },
    apploading_logo: {
        width: ThemeStyle.DEVICE_WIDTH
    },
    apploading_title: {
        fontSize: 32,
        textAlign: 'center',
        color: ThemeColors.font_title_text,
        margin: 10
    },
    apploading_subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: ThemeColors.font_subtitle_text,
        margin: 10
    }
});


export default AppLoadingScreen;