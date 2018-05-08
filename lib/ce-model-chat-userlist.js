import Updateable from "./ce-model-updateable";
import ChatEngineProvider from "./ce-core-chatengineprovider";

/**
 * Implements user list state tracking from ChatEngine events.
 */
class UserListModel extends Updateable {
    constructor() {
        super();

        this.state = this.emptyState();

        let self = this;

        this.makeUser = (uuid, props) => {
            // maybe return ChatEngine.User in a more complex app
            return {...props};
        };

        this.presenceOnlineHandler = (newUser) => {
            let newUserUuid = newUser.user.uuid;
            let user = self.makeUser(newUserUuid, newUser.user.state);

            let userList = {...self.state.userList};
            userList[newUserUuid] = user;

            self.state = {userList: userList};
            self.fireStateChange();
        };

        this.presenceOfflineHandler = (data) => {
            let offlineUserUuid = data.user.uuid;

            let userList = {...self.state.userList};
            if (userList[offlineUserUuid]) {
                userList[offlineUserUuid].online = false;
            }

            self.state = {userList: userList};
            self.fireStateChange();
        };
    }

    emptyState() {
        return {
            userList: {}
        };
    }

    connect(chat) {
        this.clear();

        chat.on('$.online.*', this.presenceOnlineHandler);
        chat.on('$.offline.*', this.presenceOfflineHandler);

        let self = this;

        Object.keys(chat.users).map((uuid) => {
            let ceUser = chat.users[uuid];
            let user = self.makeUser(uuid, ceUser.state);

            self.state.userList[uuid] = user;
        });

        self.fireStateChange();

        return new Promise((resolve) => {
            resolve(true);
        });
    }

    disconnect(chat) {
        chat.off('$.online.*', this.presenceOnlineHandler);
        chat.off('$.offline.*', this.presenceOfflineHandler);

        this.clear();
    }
}

export default UserListModel;