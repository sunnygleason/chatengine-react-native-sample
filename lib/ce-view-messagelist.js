import {
    FlatList,
    ScrollView
} from 'react-native';

import React from "react";
import Message from "./ce-view-message";
import styles from "./ce-theme-style";
import ChatEngineProvider from "./ce-core-chatengineprovider";

class MessageList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.chatRoomModel.addMessageListListener(this);

        this.state = {
            messages: [],
            loading: true,
            now: new Date().toISOString()
        };
    }

    _keyExtractor = (item, index) => index.toString();

    componentDidMount() {
        let self = this;
        this._sub = this.props.navigation.addListener('didFocus', () => {
            ChatEngineProvider.getChatRoomModel().requestMessageListRefresh(self);
        });
    }

    componentWillUnmount() {
        this.props.chatRoomModel.removeMessageListListener(this);
        this._sub.remove();
    }

    render() {
        return (
            <ScrollView
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({animated: true});
                }}>
                <FlatList style={{flex:1}}
                    data={this.state.messages}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <Message message={item} now={this.state.now}/>}
                />
            </ScrollView>
        );
    }
}

export default MessageList;