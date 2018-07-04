import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

class RandomNumber extends React.Component{
  static propTypes={
    number:PropTypes.number.isRequired,
    isDisabled:PropTypes.bool.isRequired,
    onPress:PropTypes.func.isRequired,
    id:PropTypes.number.isRequired,
  }
  pressEventHandler =()=>{
    if(this.props.isDisabled){return;}
    this.props.onPress(this.props.id);
    console.log(this.props.number);

  }
  render(){
    return(
      <TouchableOpacity
        onPress={this.pressEventHandler}>
      <Text style={[styles.elements, this.props.isDisabled && styles.selected]}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

const styles=StyleSheet.create({

  elements:{
  backgroundColor:'#999',
  width:100,
  marginHorizontal:15,
  marginVertical:25,
  fontSize:35,
  textAlign:'center',
},
selected:{
  opacity:0.3,
}

});
export default RandomNumber;
