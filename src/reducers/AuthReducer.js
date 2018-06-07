import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	LOGOUT
}
from '../actions/types';


const INITIAL_STATE = {
	email: '',
	password: '',
	user: null,
	error: '',
	loading: false,
	authenticated: false
};

const INITIAL_STATE_WITH_PASSWORD = {
	user: null,
	error: '',
	loading: false,
	authenticated: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case EMAIL_CHANGED:
			return { ...state,
				email: action.payload
			};
		case PASSWORD_CHANGED:
			return { ...state,
				password: action.payload
			};
		case LOGIN_USER:
			return { ...state,
				loading: true, error: ''
			};
		case LOGIN_USER_SUCCESS:
			return { ...state,
				...INITIAL_STATE_WITH_PASSWORD, user: action.payload, authenticated: true
			};
		case LOGIN_USER_FAIL:
			return { ...state,
				error: 'Authentication Failed.', password: '', loading: false
			};
		case LOGOUT:
			return { ...state,
				...INITIAL_STATE
			};	
		default:
			return state;

	}
};
