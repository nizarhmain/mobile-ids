import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Locator from './src/components/Locator';
import TabIcon from './resources/TabIcon';
import Explore from './src/components/Explore';
import SecondScreen from './src/components/SecondScreen';
import Profile from './src/components/Profile';
import SignupForm from './src/components/SignupForm';

const RouterComponent = () => (
		<Router sceneStyle={{ backgroundColor: 'white' }}>
			<Scene key="root">
				<Scene
					key="tabbar"
					tabs
					tabBarStyle={{ backgroundColor: 'white' }}
					lazy
					tabBarPosition='bottom'
				>

					<Scene
						key="mainPage"
						component={Locator}
						title="mainPage"
						initial
						hideNavBar
						icon={TabIcon}
					/>

					<Scene
						key="explore"
						component={Explore}
						title="explore"
						hideNavBar
						icon={TabIcon}
					/>

					<Scene
						key="profile"
						component={Profile}
						title="profile"
						hideNavBar
						icon={TabIcon}
					/>

				</Scene>

			<Scene
					key="details"
					component={SecondScreen}
					title="details"
					icon={TabIcon}
					navigationBarStyle={{ marginTop: 24 }}
					titleStyle={{ fontFamily: 'sans-serif-thin' }}
			/>

			<Scene
						key="signup"
						component={SignupForm}
						title="signup"
						icon={TabIcon}
						navigationBarStyle={{ marginTop: 24 }}
						titleStyle={{ fontFamily: 'sans-serif-thin' }}
			/>

			</Scene>
		</Router>
	);

export default RouterComponent;
