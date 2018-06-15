import React from 'react';
import axios from 'axios';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

const serverUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com';
const http = axios.create({
  baseURL: serverUrl,
});

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      userid: '',
      password: '',
    };
  }

// var beenThereUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com/login';
// var input = document.querySelector(".input");
// var name = document.querySelector(".name");
// var password = document.querySelector(".password");

  onLogin() {
    const { userid, password } = this.state;
    http.post('/login', {
      userid: this.state.userid,
      password: this.state.password,
    })
    .then(function (response) {
      console.log(response.data['status']);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(userid) => this.setState({ userid })}
          placeholder={'Userid'}
          style={styles.input}
        />
        <TextInput
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
