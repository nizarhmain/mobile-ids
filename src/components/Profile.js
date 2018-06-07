import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { Button } from '../common';
import { logout } from '../actions';

class Profile extends Component {


async onLogout() {
try {
    this.props.logout();
	await AsyncStorage.removeItem('email');
	await AsyncStorage.removeItem('password');
	} catch (error) {
	console.log(error);
	}
}

renderAuth() {
	if (this.props.user === null) {
		return (<LoginForm />);
	}
}

renderPersonalInfo() {
	if (this.props.user !== null) {
		return (
			<View style={styles.container}>
				<View style={styles.personalInfo}>
					<Text style={styles.personalText}> Ciao </Text>
					<Text style={styles.personalText}>{this.props.user.username}</Text>
				</View>
				<View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
				<Button color="purple" onPress={this.onLogout.bind(this)}> Log Out </Button>
				</View>
			</View>
		);
	}
}

	render() {
		return (
			<View style={styles.container}>
				{this.renderAuth()}
				{this.renderPersonalInfo()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	flex: 1,
	marginTop: 40
	},
	personalInfo: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	personalText: {
		fontFamily: 'sans-serif-thin',
		fontSize: 18
	}
  });

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, user } = auth;

	return { email, password, error, loading, user };
};

	export default connect(mapStateToProps, {logout})(Profile);
