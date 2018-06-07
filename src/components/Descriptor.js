import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, Text, Image, BackHandler } from 'react-native';
import { Button } from '../common';

export default class Descriptor extends Component {


	componentWillMount() {
	BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
	}

	componentWillUnmount() {
	BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid());
	}

	onPressLearnMore() {
		Actions.details({ title: this.props.title, info: this.props.info, picture: this.props.picture });
	}

	backAndroid() {
		Actions.pop();
		return true;
	}

	fromStringCoordsToObjectCoords(coordinates) {
		const coordinatesArray = coordinates.split(',');
		const freshCoordinates = {
			latitude: parseFloat(coordinatesArray[0]),
			longitude: parseFloat(coordinatesArray[1])
		};
		return freshCoordinates;
	}

	forMapView() {
		if (this.props.explore === false) {
			return (
				<View style={{ flex: 1 }}>
					<Button
					onPress={this.onPressLearnMore.bind(this)}
					>
					Read More !
					</Button>
				</View>
			);
		}
	}

	forExplorer() {
		if (this.props.explore === true) {
			return (
					<Button
					onPress={this.onPressLearnMore.bind(this)}
					>
					Read More !
					</Button>
			);
		}
	}


	render() {
		return (
			<View style={styles.dashboard}>
				<View style={{ flexDirection: 'column', flex: 1 }}>
						<View style={{ flex: 3 }}>
						<Text style={{ maxWidth: 135, color: '#000', fontWeight: 'bold' }}>{this.props.title}</Text>
						<Text style={styles.text}>{this.props.info}</Text>
						</View>
							{this.forExplorer()}
				</View>
				<View style={styles.graphicsAndButton}>
						<View style={{ flex: 7 }}>
							<Image
								source={{ uri: this.props.picture }}
								style={{ height: 140, width: 175, borderRadius: 5, marginTop: 0 }}
							/>
							<Text style={styles.text}>{this.props.distance} Km</Text>
						</View>
				{this.forMapView()}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	dashboard: {
		flexDirection: 'row',
		borderRadius: 4,
		borderWidth: 0.5,
		flex: 1,
		alignSelf: 'auto',
		borderColor: '#d6d7da',
		padding: 15,
		paddingBottom: 25,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		elevation: 8,

	},
	text: {
		maxWidth: 140,
		fontFamily: 'sans-serif-thin',
		fontSize: 15,

	},
	graphicsAndButton: {
		maxWidth: 180,
		flexDirection: 'column',
		flex: 1
	},

});
