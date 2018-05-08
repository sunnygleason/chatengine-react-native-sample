import Updateable from "./ce-model-updateable";
import moment from "moment/moment";
import util from "util";
import Message from "./ce-view-message";
import MessageList from "./ce-view-messagelist";

/**
 * Implements the model for a message list corresponding to a single
 * chat room.
 */
class MessageListModel extends Updateable {
    static MESSAGE_FRIENDLY_TIME_UPDATE_INTERVAL = 30000;

    constructor() {
        super();

        this.state = this.emptyState();

        var self = this;

        this.messageHandler = (data) => {
            let newMessages = self.state.messages.concat([data]);

            self.state = {
                loading:self.state.loading,
                messages:newMessages,
                now: new Date().toISOString()
            };

            self.fireStateChange();
        };
    }

    emptyState() {
        return {
            messages: [],
            loading: true,
            now: new Date().toISOString()
        };
    }

    connect(chat) {
        this.clear();

        var self = this;

        chat.on("message", self.messageHandler);

        this._refresh_sub = setInterval(() => {
            let newState = {...self.state};
            newState.now = new Date().toISOString();
            self.state = newState;
            self.fireStateChange();
        }, MessageListModel.MESSAGE_FRIENDLY_TIME_UPDATE_INTERVAL);

        var connectPromise = new Promise((resolve) => {
            chat.once('$.connected', () => {
                let searchy = chat.search({
                    event: 'message',
                    limit: 50
                });

                searchy.on('message', (data) => {
                    self.state.messages.unshift(data);
                });

                searchy.once('$.search.finish', () => {
                    self.state.loading = false;
                    self.fireStateChange();

                    resolve(true);
                });
            });
        });

        return connectPromise;
    }

    disconnect(chat) {
        clearInterval(this._refresh_sub);
        chat.off('message', this.messageHandler);

        this.clear();
    }
}

export default MessageListModel;