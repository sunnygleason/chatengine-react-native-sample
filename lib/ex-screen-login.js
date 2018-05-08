import React from "react";

import {
    AsyncStorage,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import {Icon, Text} from "react-native-elements";
import ChatEngineProvider from "./ce-core-chatengineprovider";
import ThemeStyle from "./ce-theme-style";
import ThemeColors from "./ce-theme-colors";

/**
 * Basic login screen functionality.
 */
class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this._username = "";
        this._name = "";
        this._password = "";
    }

    _onButtonPress = () => {
        var self = this;

        if (!self._username || !self._name) {
            return;
        }

        ChatEngineProvider.connect(self._username, self._name).then(async () => {
            try {
                await AsyncStorage.setItem(ChatEngineProvider.ASYNC_STORAGE_USERDATA_KEY, JSON.stringify({
                    username: self._username,
                    name: self._name
                }));
            } catch (error) {
                // ignore error, this save is just for convenience
            }

            this.props.navigation.navigate('ChatList', {});
        });
    };

    render() {
        return (
            <View style={LoginStyles.login_container}>
                <ImageBackground style={LoginStyles.login_wallpaper} source={require('./images/login_gradient.png')}>

                    <Icon style={LoginStyles.login_logo} name="chat" size={220} color={ThemeColors.foreground_bright}/>

                    <TextInput style={LoginStyles.login_input}
                               autoCapitalize="none"
                               onChangeText={(text) => {
                                   this._username = text;
                               }}
                               autoCorrect={false}
                               keyboardType='email-address'
                               returnKeyType="next"
                               placeholder='Email or Username'
                               placeholderTextColor={ThemeColors.input_dark_placeholder_textcolor}/>

                    <TextInput style={LoginStyles.login_input}
                               autoCapitalize="none"
                               onChangeText={(text) => {
                                   this._name = text;
                               }}
                               autoCorrect={false}
                               keyboardType='default'
                               returnKeyType="next"
                               placeholder='Display Name'
                               placeholderTextColor={ThemeColors.input_dark_placeholder_textcolor}/>

                    <TextInput style={LoginStyles.login_input}
                               returnKeyType="go"
                               ref={(input) => this.passwordInput = input}
                               onChangeText={(text) => {
                                   this._password = text;
                               }}
                               placeholder='Password'
                               placeholderTextColor={ThemeColors.input_dark_placeholder_textcolor}
                               secureTextEntry/>

                    <TouchableOpacity style={LoginStyles.login_button}
                                      onPress={this._onButtonPress}>
                        <Text style={LoginStyles.login_buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        );
    }
}

const LoginStyles = StyleSheet.create({
    login_container: {
        flex: 1,
        flexDirection: 'column',
        padding: 0
    },
    login_wallpaper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: ThemeStyle.DEVICE_WIDTH,
        height: ThemeStyle.DEVICE_HEIGHT,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    login_logo: {
        width: ThemeStyle.DEVICE_WIDTH - 40,
        alignItems: 'center'
    },
    login_input: {
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
    login_button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ThemeColors.button_background,
        paddingVertical: 15,
        borderRadius: 20
    },
    login_buttonText: {
        color: ThemeColors.button_text,
        textAlign: 'center',
        fontWeight: '700'
    }
});

export default LoginScreen;