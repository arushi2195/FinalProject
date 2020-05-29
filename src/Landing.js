import React from 'react';
import {View, ImageBackground, Text} from 'react-native';
import { Header, Item, Icon, Input, Button, Spinner } from 'native-base';
import axios from 'axios';
import {axiosCall} from './CodeAxios';
import Search from './Search';


var myBackground = require ('../assets/Music12.jpg'); //Set the background image


class Landing extends React.Component{

  state = { //declared a state to call for data 
  concertSearch: "",
  onCall: true,
  data: {}
 }
 
  searchConcert = () => { //set up a function to call the data from the first API
    this.setState({onCall:true}); 
    const authOptions = { //Defined a constant so that I can use this value to include in the 
      //data along with the data from the second API. 
      method: 'GET',
      url: `http://api.postcodes.io/postcodes/${this.state.concertSearch}`,
      data: null,
      json: true,
    };
    axiosCall(authOptions) //I used axios to call for the data. I imported the components 
    //of another js file, Code Axios, the code for which I got through the udemy tutorial I was following.
      .then(res => {
        console.log(res) //to record the data call in the console 
        const latitude = res.data.result.latitude; //defined the lat and long values by identifying 
        //the element name and its format in the console 
        const longitude = res.data.result.longitude;
        const data = {
          method: 'GET',
          url: `https://api.songkick.com/api/3.0/events.json?apikey=vfjMY1CLhp70vT4J&location=geo:${latitude},${longitude}`,
          data: null,
          json: true,
        }
        axiosCall(data) //rendered data and/or error in the console log via axios
        .then(response => {
          console.log(response);
         
        })
          .catch(error => {})

      })
      .catch(error => {
      console.log(error)
      });
  }
  renderBody = () => { //through the state defined previously for calling data, 
    //I rendered this on the 'calling' screen (which is defined in App.js)
    //I did not render any elements on this screen as this was the landing screen. 
    //I wanted the users to press the button which then takes them to a different results page. 
    //For this reason, no data was rendered on this screen. 
   if (!this.state.onCall) {
       return null
      }
      else {
       return null
      
      }
    }
  render(){ //created body with a background, search bar and a button. 
    return(
      <View style={styles.container}>
          <ImageBackground style ={{flex:1}} source={myBackground}>
           <View style= {styles.viewStyle}>
           <Text style={styles.titleStyle}>Tunes<Text style={{fontFamily:'AvenirNext-UltraLight', fontStyle:'italic', fontWeight:'400', color:'#008080'}}>near</Text><Text style={{fontFamily:'AvenirNext-DemiBold', fontWeight:'bold', color: '#000000'}}>U</Text></Text> 
           <View style={styles.searchBar}>
        <Header searchBar transparent rounded>
          <Item>
            <Icon name="ios-search"  
            onPress= {()=> this.props.switchScreen("search", this.state.concertSearch)} //fetches data and also takes the uers onto the next screen which has results 

            />
            <Input
              value={this.state.concertSearch}
              placeholder="Search concerts by postal code"
             onChangeText={(concertSearch) => this.setState({ concertSearch })} //So that searchbar records input values 
            />
           </Item>
        </Header>
        <Button rounded info
           block= {true}
           style={styles.buttonStyle}
        onPress= {()=> this.props.switchScreen("search",this.state.concertSearch)} //fetches data plus route to search screen 
        
          >
        <Text style={styles.buttonText}> Search</Text>
          
           </Button>
           {this.renderBody()}
           </View>
          <Text style={styles.watermark}>Photo by Anthony DELANOIX on Unsplash</Text>
          </View>
           </ImageBackground>
      </View>
    ) 
  }
}

export default Landing;

const styles= { //defined different styles used 
  container: {
    flex:1,
  },
  viewStyle: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
titleStyle: {
  fontSize: 35,
  color: '#000000',
  fontWeight: '900',
  fontFamily: 'Avenir-Black',
  flex:1,
  justifyContent: 'flex-start',
},
buttonStyle:{
  marginBottom: 200,
  width: 200,
  alignSelf: 'center',
  marginTop: 20,  
},
buttonText: {
color:'white',
fontWeight: 'bold',
},
watermark:{
  fontFamily:'Avenir',
  fontSize:10, 
  justifyContent: 'flex-end',
  alignSelf: 'flex-end',
  color: 'black',
  marginBottom: 10,
  marginRight: 10
}, 
searchBar: {
  flex:2, 
  width: 350,
  alignSelf: 'center',
}
}