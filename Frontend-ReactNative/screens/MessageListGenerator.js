import React from 'react';
import { ScrollView, Alert, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements';
import axios from 'axios';

const serverUrl = 'beenthere.us-east-2.elasticbeanstalk.com';
const http = axios.create({
  baseURL: serverUrl,
});

export default class MessageListGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.userid,
    };
  }
}

class MessageListGenerator extends React.Component {

    filterSearch = (text) => {
        const textData = text.toLowerCase();
        const newFeed = friends.filter((item) => {
            const locData = item.loc.toLowerCase();
            const nameData = item.key.toLowerCase();
            return locData.match(textData) || nameData.match(textData);
        });
        this.setState({
            feed: newFeed
        })
    };

    renderHeader() {
        return <SearchBar
            lightTheme
            showLoading
            platform='ios'
            placeholder='Search'
            onChangeText={(text) => this.filterSearch(text)} />
    }

    render() {
        return (
            <List>
                <FlatList
                    data={this.state.feed}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.key}
                            subtitle={`${item.loc}, rating: ${item.rating}`}
                            avatar={item.thumbnail}
                        />
                    )}
                    keyExtractor={item => item.key}
                    ListHeaderComponent={this.renderHeader}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({
    line: {
        flex: 1,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
