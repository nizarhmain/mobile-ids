import React from 'react';
import { Text, View, Image } from 'react-native';

const TabIcon = (props) => {
	if (props.title === 'mainPage') {
	return (
			<View>
				<Image source={require('./compass_256.png')} style={{ height: 28, width: 28 }} />
			</View>
	);
	}

	if (props.title === 'explore') {
		return (
			<View>
				<Image source={require('./search.png')} style={{ height: 28, width: 28 }} />
			</View>
		);
	}

	if (props.title === 'profile') {
		return (
			<View>
				<Image source={require('./user.png')} style={{ height: 28, width: 28 }} />
			</View>
		);
	}

};

export default TabIcon;
