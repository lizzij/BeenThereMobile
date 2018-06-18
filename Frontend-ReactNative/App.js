import React from 'react';
import { StackNavigator } from 'react-navigation';

import { RegisterPage } from './screens/RegisterPage'
import { LoginPage } from './screens/LoginPage'
import { Root, Tabs } from './config/router';

export default class App extends React.Component {
  render() {
    return (
      <RegisterPage/>
    );
  }
}
