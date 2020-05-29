import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import Landing from './src/Landing';
import Search from './src/Search';



export default class App extends React.Component{
  state={ //declared state for routing through different screens. Could have used react navigation but it was too late by then. 
    currentScreen: "landing",
    postalcode: "",
  }
  switchScreen = (currentScreen, postalcode) => {
    console.log ("Hello:", postalcode)
     this.setState({currentScreen: currentScreen, 
      postalcode: postalcode});
  }
  renderScreen= (codevalue) =>{
    if (this.state.currentScreen === "landing" ){
      return(
<Landing switchScreen={this.switchScreen} />
      )
    }
    else if (this.state.currentScreen === "search"){
      console.log("Hello", this.state.postalcode)
     return(
    <Search switchScreen={this.switchScreen} postalcode={codevalue} />
     )
    }
  }
  render(){
    return (
      <View style={styles.container}>
      {this.renderScreen(this.state.postalcode)}
      </View>
    );
  }
}

const styles= {
  container: {
    flex:1,
  },
  }
