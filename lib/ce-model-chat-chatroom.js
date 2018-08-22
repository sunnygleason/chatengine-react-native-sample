import ChatEngineProvider from "./ce-core-chatengineprovider";
import MessageListModel from "./ce-model-chat-messagelist";
import UserListModel from "./ce-model-chat-userlist";
import emoji from 'chat-engine-emoji';
import markdown from 'chat-engine-markdown';
import typingIndicator from "chat-engine-typing-indicator";

/**
 * Brings together all of the ChatEngine event listening to manage message list and
 * user list state for a single chat room. This includes easy connect/disconnect logic,
 * and state refreshes upon UI actions such as tab switching.
 */
class ChatRoomModel {
    constructor() {
        this.props = {
            messageListModel: new MessageListModel(),
            userListModel: new UserListModel()
        };

        this.state = this.emptyState();
    }

    emptyState() {
        return {
            chat: null,
            channel: null,
            channelFriendly: null,
            me: null,
            ready: false
        };
    }

    init() {
        this.state = this.emptyState();
    }

    addMessageListListener(component) {
        this.props.messageListModel.addListener(component);
    }

    removeMessageListListener(component) {
        this.props.messageListModel.removeListener(component);
    }

    requestMessageListRefresh(component) {
        this.props.messageListModel.refresh(component);
    }

    addUserListListener(component) {
        this.props.userListModel.addListener(component);
    }

    removeUserListListener(component) {
        this.props.userListModel.removeListener(component);
    }

    requestUserListRefresh(component) {
        this.props.userListModel.refresh(component);
    }

    connect(channelFriendly) {
        if (this.state && (channelFriendly === this.state.channelFriendly)) {
            return new Promise((resolve) => {
                resolve(true);
            });
        }

        const ChatEngine = ChatEngineProvider.get();

        if (this.state && this.state.channel) {
            let prevChat = ChatEngine.chats[this.state.channel];

            if (prevChat) {
                this.disconnect();
            }
        }

        const chat = new ChatEngine.Chat(channelFriendly);
        chat.plugin(typingIndicator({timeout: 5000}));

        // uncomment to ENABLE markdown plugin
        // chat.plugin(markdown());

        // uncomment to ENABLE emoji plugin
        // chat.plugin(emoji());

        var self = this;

        var connectPromise = new Promise((resolve) => {
            return self.props.messageListModel.connect(chat).then(() => {
                return self.props.userListModel.connect(chat).then(() => {
                    self.state = {
                        chat: chat,
                        channel: chat.channel,
                        channelFriendly: channelFriendly,
                        me: ChatEngine.me,
                        ready: true
                    };

                    resolve(true);
                });
            });
        });

        return connectPromise;
    }

    disconnect() {
        const ChatEngine = ChatEngineProvider.get();
        const chat = ChatEngine.chats[this.state.channel];

        if (chat) {
            this.props.messageListModel.disconnect(chat);
            this.props.userListModel.disconnect(chat);

            chat.leave();
        }

        this.init();
    }
}

export default ChatRoomModel;