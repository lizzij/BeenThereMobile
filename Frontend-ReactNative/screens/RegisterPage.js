import React from 'react';
import axios from 'axios';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';

const serverUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com';
const http = axios.create({
  baseURL: serverUrl,
});

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'waiting for input',
      userid: '',
      username: '',
      password: '',
    };
  }

// var beenThereUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com/login';
// var input = document.querySelector(".input");
// var name = document.querySelector(".name");
// var password = document.querySelector(".password");

  onRegister() {
    var self = this;
    http.post('/register', {
      username: this.state.username,
      password: this.state.password,
    })
    .then(function (response) {
      self.setState({status: response.data['status'], userid: response.data['userid']})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4> {this.state.status} </Text>
        <Text h4> {'Your ID is: ' + this.state.userid} </Text>
        <Text h4> </Text>
        <TextInput
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Register'}
          style={styles.input}
          onPress={this.onRegister.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
