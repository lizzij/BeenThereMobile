import React from 'react';
import axios from 'axios';
import { ScrollView, Alert, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements';

const serverUrl = 'beenthere.us-east-2.elasticbeanstalk.com';

export class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'hello world',
    };

    axios.post('http://beenthere.us-east-2.elasticbeanstalk.com/register', {
      username: 'react_native_2',
      password: 'password'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render() {
    return (
      <View>
        <Text style={styles.line}>Hello World</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    line: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
});
