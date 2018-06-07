import React from 'react';
import { View, Text } from 'react-native';


const Comment = (props) => {
  const { author, content, contentBox } = styles;  

  return (
    <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
      <View style={{ flex: 1}}>
        <Text style={author}>{props.comment.author} : </Text>
      </View>
      <View style={contentBox}> 
          <Text style={content}>{props.comment.content}</Text>
      </View>
      <View style={{ flex: 1 }}>
          <Text style={styles.date}>{props.comment.date.substring(0, 10)}</Text>
      </View>
    </View>
  );    
};

const styles = {
  author: {
    marginLeft: 10,
    color: '#007aff',
  },
  contentBox: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center'  
  },
  content: {
    fontSize: 16,
		fontFamily: 'sans-serif-thin'
  },
  date: {
    fontSize: 14,
    fontFamily: 'sans-serif-thin',
    color: 'grey'
  }
};

export { Comment };
