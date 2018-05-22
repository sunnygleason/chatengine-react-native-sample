import {
    StyleSheet
} from 'react-native';

import ThemeColors from "./ce-theme-colors";
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ThemeStyle = StyleSheet.create({
    statusBarUnderlay: {
        height: 24,
        backgroundColor: ThemeColors.statusBarUnderlay
    },
    footer: {
        height:40,
        backgroundColor: ThemeColors.footer
    },
    send: {
        alignSelf: "center",
        padding: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ThemeColors.container,
        padding: 20,
        paddingBottom:0
    },
    messageentry: {
        fontSize: 18,
        height: 40,
        backgroundColor: ThemeColors.input_bg,
        width: DEVICE_WIDTH,
        color: ThemeColors.input
    },
    input: {
        paddingHorizontal: 20,
        fontSize: 18,
        height: 40,
        backgroundColor: ThemeColors.input_bg,
        marginBottom: 10,
        padding: 10,
        width: DEVICE_WIDTH,
        color: ThemeColors.input
    },
    buttonContainer: {
        backgroundColor: ThemeColors.buttonContainer,
        paddingVertical: 15
    },
    buttonText: {
        color: ThemeColors.buttonText,
        textAlign: 'center',
        fontWeight: '700'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: ThemeColors.instructions,
        marginBottom: 5,
    },
    messageList: {
        flex: 1,
    },
    receivedMessages: {
        borderRadius: 15,
        borderBottomLeftRadius: 3,
        backgroundColor: ThemeColors.receivedMessages,
        marginRight: 60,
        minHeight: 30,
        justifyContent: "center",
        padding: 5,
        alignItems: 'flex-start',
        width: DEVICE_WIDTH - 120
    },
    myMessages: {
        borderRadius: 15,
        borderBottomRightRadius: 3,
        backgroundColor: ThemeColors.myMessages,
        marginLeft: 60,
        minHeight: 30,
        justifyContent: "center",
        padding: 5,
        alignItems: 'flex-end',
        width: DEVICE_WIDTH - 120
    },
    myMessageContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: 'flex-end',
        margin: 3,
    },
    messageContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: 'flex-start',
        margin: 3,
    },
    avatar: {
        flexDirection: "column",
        justifyContent: "flex-end",
        marginRight: 3
    },
    friendlyTime: {
        color: '#E0E0E0'
    },
    messageUID: {
        color: ThemeColors.messageUID
    },
    p: {
        color: ThemeColors.p
    }
});

ThemeStyle.DEVICE_WIDTH = DEVICE_WIDTH;
ThemeStyle.DEVICE_HEIGHT = DEVICE_HEIGHT;

export default ThemeStyle;