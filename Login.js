import React from 'react';
import { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

import axios from 'axios';

function getLoginInfo() {
  axios.post('http://beenthere.us-east-2.elasticbeanstalk.com/login', {
      userid: 1,
      password: 'password'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// var button = document.querySelector(".login");
// Login.addEventListener("click", getLoginInfo);
// var button = document.querySelector(".button");
// button.addEventListener("click", getLoginInfo);

export class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

// var beenThereUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com/login';
// var input = document.querySelector(".input");
// var name = document.querySelector(".name");
// var password = document.querySelector(".password");
  
  onLogin() {

    const { username, password } = this.state;
    onPress={this.getLoginInfo}
    // Alert.alert('Credentials', `${username} + ${password}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
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