import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, Input, Spinner } from '../common';
import { emailChanged, passwordChanged, loginUser } from '../actions';


class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onSignIn() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onSignUp() {
    Actions.signup();
  }


  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onSignIn.bind(this)} color="blue" >
        Log in
      </Button>
    );
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Card>
        <CardSection>
          <Input
            placeholder="username"
            label="Email"
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
        <View style={{ flex: 1 }}>
          {this.renderButton()}
        </View>
        </CardSection>

        <CardSection>
        <View style={{ flex: 1 }}>
          <Button onPress={this.onSignUp.bind(this)} color="purple" >
            Sign Up
          </Button>
        </View>
        </CardSection>

        </Card>
        </View>

    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
