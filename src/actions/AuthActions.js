import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT
}
from '../actions/types';
import {
  host
} from '../../configs';


export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    payload: text
  });

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    payload: text
  });


const myEmail = '';
const myPassword = '';

export const loginUser = ({
  email,
  password
}) => (dispatch) => {
    this.myEmail = email;
    this.myPassword = password;
    dispatch({
      type: LOGIN_USER
    });
    // GET profile info
    axios({
        method: 'get',
        url: `${host}/auth/profile`,
        auth: {
          username: email,
          password: password
        }
      })
      .then(user => {
        loginUserSuccess(dispatch, user.data);
        this.init(this.myEmail, this.myPassword);
      })
      .catch(() => loginUserFail(dispatch));
  };

  this.init = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.log(error);
    }
  };

export const logout = () => ({
  type: LOGOUT
});

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};
