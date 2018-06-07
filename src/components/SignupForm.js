'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, BackHandler, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {Button, Card, CardSection, Input, Spinner} from '../common';
import { host } from '../../configs';

class SignupForm extends Component {

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
    loading: false,
    success: ''
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }

  componentWillUpdate(nextProps, nextState) {
      console.log(nextState);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid());
  }

signupRequest() {
  if (this.state.password !== this.state.confirmPassword) {
      this.setState({ loading: false, error: 999, success: ''});
      return;
  }

  if (this.state.password === '' || this.state.confirmPassword === '' || this.state.username === '') {
    this.setState({ loading: false, error: 998, success: ''});
    return;
  }

  this.setState({ loading: true, error: '', success: '' });

  axios({
    method: 'post',
    url: `${host}/auth/new`,
    data: {
      username: this.state.username,
      password: this.state.password
    }
  })
  .then((response) => {
    this.setState({ loading: false });
    this.setState({ success: response.status });
  })
  .catch((error) => {
    this.setState({ loading: false});
    this.setState({ error: error.response.status });
  });
}

  backAndroid() {
    Actions.pop();
    return true;
  }

  renderResponse() {
    if (this.state.error === 409) {
      return (
        <Text style={styles.errorTextStyle}>
          that username is already taken :(
        </Text>
      );
    }
    if (this.state.success === 201) {
      return (
        <Text style={styles.successTextStyle}>
          You were successfully registered
        </Text>
      );
    }
    if (this.state.error === 999) {
      return (
        <Text style={styles.errorTextStyle}>
          The passwords are not identical
        </Text>
      );
    }
    if (this.state.error === 998) {
      const text = "Don't leave the fields empty thank you ";
      return (
        <Text style={styles.errorTextStyle}>
          {text}
        </Text>
      );
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small"/>;
    }
    return (
    <Button color="purple" onPress={this.signupRequest.bind(this)}>
      Sign Up
    </Button>
          );
  }

  render() {
    return (
      <View
        style={{
        justifyContent: 'center',
        flex: 1
      }}>
      <Card>
        <CardSection>
          <Input placeholder="Choose a username" label="username" onChangeText={username => this.setState({username})}/>
        </CardSection>

        <CardSection>
          <Input secureTextEntry placeholder="Choose a password" label="Password" onChangeText={password => this.setState({password})} />
        </CardSection>

        <CardSection>
          <Input secureTextEntry placeholder="Confirm password" label="Password" onChangeText={confirmPassword => this.setState({confirmPassword})} />
        </CardSection>

        {this.renderResponse()}

        <CardSection>
        <View style={{ flex: 1 }}>
          {this.renderButton()}
        </View>
        </CardSection>
      </Card>
    </View>);
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  successTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'green'
  }
});

export default SignupForm;
