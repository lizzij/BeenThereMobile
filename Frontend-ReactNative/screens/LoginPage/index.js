import React, { Component } from 'react';
import axios from 'axios';
import { Button, Text, Image, ImageBackground, Dimensions, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

const serverUrl = 'http://beenthere.us-east-2.elasticbeanstalk.com';
const http = axios.create({
  baseURL: serverUrl,
});

const {width, height} = Dimensions.get('window');

const background = require('./login_bg.png');
const logo = require('./login_logo.png');
const title = require('./login_title.png');
const emailIcon = require('./login_email.png');
const passwordIcon = require('./login_password.png');
const loginButton = require('./login_button.png');

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      userid: '',
      password: '',
    };
  }

  onLogin() {
    console.log('sending request');
    var self = this;
    http.post('/login', {
      userid: self.state.userid,
      password: self.state.password,
    })
    .then(function (response) {
      self.setState({status: response.data['status']});
      console.log(self.state.status);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
    <View style={ styles.container }>
      // background image
      <ImageBackground source={ background }
                       style={ styles.background }
                       resizeMode="stretch">
      // app logo
      <View style={ styles.logoWrap }>
        <Image source={ logo }
               style={ styles.logo }
               resizeMode="contain" />
      </View>

      // app title
      <View style={ styles.titleWrap }>
        <Image source={ title }
               style={ styles.title }
               resizeMode="contain" />
      </View>

      // user input fields
      <View style={ styles.wrapper }>
        // --email input
        <View style={ styles.inputWrap }>
          <View style={ styles.iconWrap }>
            <Image source={ emailIcon }
                   style={ styles.emailIcon }
                   resizeMode="contain" />
          </View>
          <TextInput onChangeText={(userid) => this.setState({userid})}
                       placeholder={'邮箱'}
                       placeholderTextColor="white"
                       style={ styles.input } />
        </View>
        <View style={ styles.seperator } />
        // --password input
        <View style={ styles.inputWrap }>
          <View style={ styles.iconWrap }>
            <Image source={ passwordIcon }
                   style={ styles.passwordIcon }
                   resizeMode="contain" />
          </View>
          <TextInput onChangeText={(password) => this.setState({password})}
                     placeholder={'密码'}
                     placeholderTextColor="white"
                     secureTextEntry={true}
                     style={ styles.input } />
        </View>
        // --login button
        <TouchableOpacity activeOpacity={ 0.5 } onPress={(this.onLogin.bind(this))}>
          <View style={ styles.button }>
            <Image source={ loginButton }
                   style={ styles.button }
                   resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View>

      // other options
      <View style={ styles.container }>
        <View style={ styles.forgotPasswordWrap }>
          <TouchableOpacity activeOpacity={ .5 }>
            <View><Text style={ styles.forgotPasswordText }>忘记密码</Text></View>
          </TouchableOpacity>
        </View>

        <View style={ styles.signupWrap }>
          <TouchableOpacity activeOpacity={ .5 }>
            <View><Text style={ styles.signupLinkText }>注册新账号</Text></View>
          </TouchableOpacity>
        </View>
      </View></ImageBackground>
    </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  logoWrap: {
    top: 85,
    alignItems: 'center',
  },
  logo: {
    width: 148,
    height: 123,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 11,
    shadowOpacity: 1
  },
  titleWrap: {
    top: 211,
    position: 'absolute',
    alignSelf: 'center',
  },
  title: {
    width: 209,
    height: 47,
    shadowColor:'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 10,
    shadowOpacity: 1
  },
  wrapper: {
    paddingHorizontal: 14,
    marginTop: 200,
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 14,
    height: 22,
  },
  seperator: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFF'
  },
  iconWrap: {
    left: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailIcon: {
    width: 13.2,
    height: 11.2,
  },
  passwordIcon: {
    width: 13.2,
    height: 15.2,
  },
  input: {
    width: 30,
    height: 21,
    fontSize: 15,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    flexDirection: 'column',
    color: '#FFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 147,                 // text not shifting to left (reference)
  },
  button: {
    width: 347,
    height: 51,
    alignSelf: 'center',             // button text is wrong!
    marginTop: 17,
  },
  forgotPasswordWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  forgotPasswordText: {
    width: 48,
    height: 17,
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: '#FFF',
    alignItems: 'center',
  },
  signupWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  signupLinkText: {
    width: 60,
    height: 17,
    opacity: 0.8,
    fontSize: 12,                     // download fonts
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: '#FFF',
    alignItems: 'center',
  }
});
