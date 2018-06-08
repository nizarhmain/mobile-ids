import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { host } from '../../configs';
import { Comment, Input, CardSection, Button } from '../common';

class SecondScreen extends Component {

constructor() {
	super();
	this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  
	this.state = {
		comments: [],
		loading: false,
		commento: '',
		renderCommentInput: false
	};
  }

	componentWillMount() {
		this.fetchData();
	}


	onComment() {
		if (this.state.commento !== '') {
			axios({
				method: 'post',
				url: `${host}/comments`,
				auth: {
					username: this.props.email,
					password: this.props.password
				},
				data: {
					monumentAttachedTo: this.props.title,
					content: this.state.commento 
				}
				})
				.then((response) => {
				console.log(response);
				this.fetchData();
				})
				.catch((error) => {
				console.log(error.data);
				});					
		}
	}

	fetchData() {
		axios({
			method: 'get',
			url: `${host}/comments/${this.props.title}`
			})
			.then((response) => {
			this.setState({ comments: response.data, loading: false });
			})
			.catch((error) => {
			this.setState({ loading: false});
			console.log(error.data);
			});
	}

	renderDescription() {
		if (this.state.renderCommentInput) {
			return (
				<View style={{ marginTop: 40}}>
				<Button onPress={() => this.setState({renderCommentInput: false})} color="purple" >
					Go back
				</Button>
				{this.commentSection()}
				</View>
			);
		}	
			return (
				<View style={styles.container}>
					
					<Text style={styles.welcome}>
						{this.props.title}
					</Text>
					<Text style={styles.welcome}>
						{this.props.info}
					</Text>
					<View style={{ alignItems: 'center' }}>
					<Image
					source={{ uri: this.props.picture }}
					style={{ height: 140, width: 175, borderRadius: 5, marginTop: 0 }}
					/>
					</View>
					{this.commentSection()}
				</View>
				);
	}

	commentSection() {
		if (this.props.authenticated) {
			return (
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text style={{marginTop: 50, color: '#007aff' }}>
					Commenti
				</Text>
				<CardSection>
					<View style={{ flex: 9}}>
					<Input 
						placeholder="Lascia un commento" label="Commento" 
						tipo="comment" onChangeText={commento => this.setState({commento})}
						onFocus={() => this.setState({renderCommentInput: true})}
					/>
					</View>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		
					<TouchableOpacity onPress={this.onComment.bind(this)}>
						<Image source={require('../../resources/sendd.png')} style={{ height: 28, width: 28}} />
					</TouchableOpacity>
					</View>
				</CardSection>
				</View>
			);	
		}	
	}

	renderRow(comment) {
		return <Comment comment={comment} />;
	}


	renderComments() {
		return (
		<ListView
			dataSource={this.ds.cloneWithRows(this.state.comments)}
			renderRow={(rowData) => this.renderRow(rowData)}
			enableEmptySections
			renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
			renderHeader={this.renderDescription.bind(this)}
		/>
		);
	}

	render() {
		return (
			
			<View>
				{this.renderComments()}
			</View>
		);
	}
}


const mapStateToProps = ({ auth }) => {
	const { email, password, authenticated } = auth;
  
	return { email, password, authenticated };
  };
  
  export default connect(mapStateToProps, {})(SecondScreen);
  

const styles = StyleSheet.create({
	container: {
	marginTop: 24,
	backgroundColor: 'white'
	},
	welcome: {
	fontSize: 16,
    fontFamily: 'sans-serif-thin',
	margin: 10
	},
	separator: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#8E8E8E',
	} 
  });
