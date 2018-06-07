import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, onFocus, tipo }) => {
  const { inputStyle, labelStyle, containerStyle, comment_containerStyle, comment_labelStyle, comment_inputStyle } = styles;
  switch (tipo) {
    case 'comment':
      this.containerStyle = comment_containerStyle;
      this.labelStyle = comment_labelStyle;
      this.inputStyle = comment_inputStyle;
      break;
    default:
      this.containerStyle = containerStyle;
      this.labelStyle = labelStyle;
      this.inputStyle = inputStyle;
      break;
  }

  return (
    <View style={this.containerStyle}>
      <Text style={this.labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={this.inputStyle}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    fontFamily: 'sans-serif-thin',
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
    fontFamily: 'sans-serif-thin',
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  comment_inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
    lineHeight: 23,
    flex: 2,
    fontFamily: 'sans-serif-thin'
  },
  comment_labelStyle: {
    fontSize: 15,
    paddingLeft: 20,
    flex: 1,
    fontFamily: 'sans-serif-thin'
  },
  comment_containerStyle: {
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007aff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
