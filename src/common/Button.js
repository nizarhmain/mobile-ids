import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({onPress, children, color}) => {
  const {purple_buttonStyle, blue_buttonStyle, blue_textStyle, purple_textStyle } = styles;
  switch (color) {
    case 'purple':
      this.buttonStyle = purple_buttonStyle;
      this.textStyle = purple_textStyle;
      break;
    case 'blue':
      this.buttonStyle = blue_buttonStyle;
      this.textStyle = blue_textStyle;
      break;
    default:
      this.buttonStyle = blue_buttonStyle;
      this.textStyle = blue_textStyle;
      break;
  }

  return (<TouchableOpacity onPress={onPress} style={this.buttonStyle}>
    <Text style={this.textStyle}>
      {children}
    </Text>
  </TouchableOpacity>);
};

const styles = {
  blue_textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 10
  },
  blue_buttonStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  purple_buttonStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'purple',
    marginLeft: 5,
    marginRight: 5
  },
  purple_textStyle: {
    alignSelf: 'center',
    color: 'purple',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 10
  }
};

export {
  Button
};
