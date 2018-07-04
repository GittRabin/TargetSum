import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends React.Component{

  static propTypes ={
    randomNumberCount:PropTypes.number.isRequired,
  }


  state={
    selectedNumbers :[],

  }

  isNumberSelected =(numberIndex)=>{
    return this.state.selectedNumbers.indexOf(numberIndex) >=0;
  }

  selectNumber =(numberIndex)=>{
    this.setState((prevState)=>({
      selectedNumbers:[...prevState.selectedNumbers,numberIndex],
    }));
  }



  randomNumbers = Array.from({length:this.props.randomNumberCount})
  .map(()=>1+ Math.floor(10* Math.random()));


  target= this.randomNumbers.slice(0,this.props.randomNumberCount-2).reduce((acc,curr)=>acc +curr,0);
//// TODO: shuffle the random numbers

gameStatus=()=>{
  const sumSelected = this.state.selectedNumbers.reduce((acc,curr)=>{
    return acc + this.randomNumbers[curr];
  },0);
  if(sumSelected<this.target){
    return 'PLAYING';
  }
  if(sumSelected===this.target){
    return 'WON';
  }
  if(sumSelected > this.target){
    return 'LOST';
  }
}

  render(){
  const gameStatus=this.gameStatus();
    return(
      <View style={styles.container}>
        <Text style={[styles.target,styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.elementContainer} >
        {this.randomNumbers.map((randomNumber,index)=>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={this.isNumberSelected(index) || gameStatus !=='PLAYING'}
            onPress={this.selectNumber}
            />

        )}
        </View>
        <View>
          <Text>{gameStatus}</Text>
        </View>
      </View>
    );
  }
}
const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ddd',
    paddingTop:30,
  },
  target:{
    fontSize:50,
    backgroundColor:'#bbb',
    margin:50,
    textAlign:'center',
  },
  elementContainer:{
  flex:1,
  flexDirection:'row',
  flexWrap:'wrap',
  justifyContent:'space-around',

  },

  STATUS_PLAYING:{
    backgroundColor:'cyan',
  },
  STATUS_WON:{
    backgroundColor:'blue',
  },
  STATUS_LOST:{
    backgroundColor:'red',
  },


});

export default Game;
