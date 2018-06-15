import React from 'react';
import { ScrollView, Alert, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements';
// import { FriendListGenerator } from './screens/FriendListGenerator'
// import { MessageListGenerator } from './screens/MessageListGenerator'
import { RegisterPage } from './screens/RegisterPage'
import { LoginPage } from './screens/LoginPage'

export default class App extends React.Component {
  render() {
    return (
      <LoginPage/>
    );
  }
}
