import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import GeoPoint from 'geopoint';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import { Input, Spinner } from '../common';
import Descriptor from './Descriptor';
import { host } from '../../configs';

class Explore extends Component {


constructor() {
  super();
  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.timeout = 0;

  this.state = {
			location: null,
			value: '',
			suggestions: [],
			loading: false
  };
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

componentWillMount() {
	this.getLocationAsync();
	// const statueOfLiberty = new GeoPoint(40.689604, -74.04455);
	// const eiffelTower = new GeoPoint(48.858275, 2.294438);
	// const d = statueOfLiberty.distanceTo(eiffelTower, true);
	// console.log(d);

	// const bc = eiffelTower.boundingCoordinates(50);
	// console.log(bc);
	this.showSuggestions();
}

showSuggestions() {
	axios.get(`${host}/poi`)
	.then((response) => {
		this.setState({ suggestions: response.data });
	})
	.catch((error) => {
	console.log(error);
	});

	axios.get(`${host}/ente`)
	.then((response) => {
		this.setState({ enti: response.data });
	})
	.catch((err) => {
		console.log(err)
	})
}

searchMonument(value) {
	this.setState({ value: value, suggestions: [], loading: true });
	if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      //search function
			axios.get(`${host}/poi/monument/${value}`)
			.then((response) => {
				if (response.data !== '') {
					// Append a single item
					this.setState({ suggestions: [...this.state.suggestions, response.data], loading: false });
				} else {
					// make the search in the ente and put them as suggestions
					axios.get(`${host}/ente/${value}`)
					.then((response) => {
						if(response.data !== '') {
							this.setState({ suggestions: [...this.state.suggestions, response.data], loading: false });
						}
					})
				}
			})
			.catch(() => {
				this.showSuggestions();
				this.setState({ loading: false });
			});
    }, 300);
}

renderLoading() {
	if (this.state.loading) {
		return <Spinner size="large" />;
	}
}

calculateDistance(monumentCoordinates) {
	if (monumentCoordinates !== undefined) { 
		console.log(this.state.location);
		// const myPosition = new GeoPoint(this.state.location.latitude, this.state.location.longitude);
		// const geoCoords = this.fromStringCoordsToObjectCoords(monumentCoordinates);
		// const monument = new GeoPoint(geoCoords.latitude, geoCoords.longitude);
		// const d = myPosition.distanceTo(monument, true);
		// console.log(d.toFixed(2))
		// return d.toFixed(2);
	}
}

renderRow(suggestion) {
	if(suggestion.nome) {
		return <Descriptor key={suggestion.nome} title={suggestion.nome} info={suggestion.regione} picture={suggestion.image}
		distance={this.calculateDistance(0,0)} explore />;	
	}

	return <Descriptor key={suggestion.coordinates} title={suggestion.name} info={suggestion.info} picture={suggestion.image}
	distance={this.calculateDistance(suggestion.coordinates)} explore />;
}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<Input
						label="Search"
						value={this.state.value}
						onChangeText={value => {
							this.searchMonument(value);
						}}

						placeholder="Chiesa X"
					/>
				</View>
				
				<View style={{ flex: 5 }}>
				{ this.renderLoading() }
							<ListView
									dataSource={this.ds.cloneWithRows(this.state.suggestions)}
									renderRow={(rowData) => this.renderRow(rowData)}
									enableEmptySections
							/>
				</View>
				</View>
				);
			}
	}

export default Explore;
