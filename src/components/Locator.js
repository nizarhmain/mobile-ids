import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Location, Permissions } from 'expo';
import { loginUser } from '../actions';
import Mappa from './Mappa';
import { Card, Spinner } from '../common';

class Locator extends Component {
	state = {
		location: null,
		errorMessage: null,
		loading: true
	};

  componentWillMount() {
      this.getLocationAsync();
  }

  componentDidMount() {
    this.init();
  }


  getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    } catch (e) {
      this.setState({ errorMessage: e, loading: false });
    }
  };

  init = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail !== null && savedPassword !== null) {
        const email = savedEmail;
        const password = savedPassword;
        this.props.loginUser({ email, password });
        }
    } catch (error) {
      console.log(error);
    }
  };

  renderError() {
    if (this.state.errorMessage) {
      return (
        <View style={styles.bubble}>
          <Card >
            <Text style={styles.paragraph}>Please turn on Location services and restart the app :) thank u</Text>
          </Card>
        </View>
      );
    }
  }


  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
            {this.renderError()}
            {this.state.location !== null &&
            <Mappa location={this.state.location} />}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		marginTop: 24
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontFamily: 'sans-serif-thin',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { 
  loginUser
})(Locator);
