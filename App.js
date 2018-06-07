import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Router from './Router';
import reducers from './src/reducers';

export default class App extends React.Component {
	render() {
		const store = createStore(reducers, composeWithDevTools(
			applyMiddleware(thunk),
			// other store enhancers if any 
        ));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}


// App
// Router
// Locator, SecondScreen
// Locator => Mappa => Descriptor
