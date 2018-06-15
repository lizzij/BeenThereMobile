import React from 'react';
import axios from 'axios';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

const serverUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com';
const http = axios.create({
  baseURL: serverUrl,
});

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      username: '',
      password: '',
    };
  }

// var beenThereUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com/login';
// var input = document.querySelector(".input");
// var name = document.querySelector(".name");
// var password = document.querySelector(".password");

  onRegister() {
    const { username, password } = this.state;
    http.post('/register', {
      username: this.state.username,
      password: this.state.password,
    })
    .then(function (response) {
      console.log(response.data['status']);
      console.log('Your ID is: ' + response.data['userid'])
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
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
