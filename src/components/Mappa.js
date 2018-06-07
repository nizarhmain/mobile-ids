import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import GeoPoint from 'geopoint';
import Descriptor from './Descriptor';
import data from '../fakeData/markers.json';
import { host } from '../../configs';

export default class Mappa extends Component {
	//TODO hardcoded stuff here to clear up

	// lat and long passed by the locator component from upwards
	state = {
		mapRegion: { 
		latitude: this.props.location.coords.latitude,
		longitude: this.props.location.coords.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421 
		},
		loading: false,
		spotTitle: 'this is a generic spot',
		markers: []
		};

	componentWillMount() {
		axios({
		method: 'get',
		url: `${host}/historical`,
		})
		.then((response) => {
		this.setState({ loading: false });
		this.setState({ markers: response.data });
	})
		.catch((error) => {
		this.setState({ loading: false});
		console.log(error);
		});
	}


	handleMapRegionChange = mapRegion => {
		this.setState({ mapRegion });
	};

	fromMarkerToSpot(title, info, picture, coordinates) {
		if (coordinates !== undefined) { 
			const myPosition = new GeoPoint(this.props.location.coords.latitude, this.props.location.coords.longitude);
			const geoCoords = this.fromStringCoordsToObjectCoords(coordinates);
			const monument = new GeoPoint(geoCoords.latitude, geoCoords.longitude);
			const d = myPosition.distanceTo(monument, true);
			this.setState({ spotDistance: d.toFixed(2)});
		}
		
		this.setState({ spotTitle: title });
		this.setState({ spotInfo: info });
		this.setState({ spotPicture: picture });
		this.setState({ spotCoords: coordinates});
	}

fromStringCoordsToObjectCoords(coordinates) {
	const coordinatesArray = coordinates.split(',');
	const freshCoordinates = {
		latitude: parseFloat(coordinatesArray[0]),
		longitude: parseFloat(coordinatesArray[1])
	};
	return freshCoordinates;
}

	
	render() {
		return (
			<View style={styles.container}>
				<MapView
				style={{ alignSelf: 'stretch', height: 260 }}
				region={this.state.mapRegion}
				onRegionChange={this.handleMapRegionChange}
				showsPointsOfInterest={false}
				showsBuildings={false}
				showsIndoor={false}
				showsTraffic={false}
				toolbarEnabled={false}
				>
	
				{this.state.markers.map(marker => (
					<MapView.Marker 
					key={marker.name}
					coordinate={this.fromStringCoordsToObjectCoords(marker.coordinates)}
					title={marker.name}
					picture={marker.image}
					pinColor={marker.pinColor}
					onPress={() => this.fromMarkerToSpot(marker.name, marker.info, marker.image, marker.coordinates)}
					/>
				))}
					
				</MapView>

				<Descriptor
				myLatitude={this.props.location.coords.latitude} myLongitude={this.props.location.coords.longitude}
				explore={false} 
				title={this.state.spotTitle} info={this.state.spotInfo} distance={this.state.spotDistance}
				picture={this.state.spotPicture} coordinates={this.state.spotCoords} />
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});
