import React from 'react';
import axios from 'axios';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';

const serverUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com';
const http = axios.create({
  baseURL: serverUrl,
});

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'waiting for input',
      userid: '',
      password: '',
    };
  }

  onLogin() {
    var self = this;
    http.post('/login', {
      userid: this.state.userid,
      password: this.state.password,
    })
    .then(function (response) {
      self.setState({status: response.data['status']})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4> {this.state.status} </Text>
        <Text h4> </Text>

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
