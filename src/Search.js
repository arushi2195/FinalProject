import React from 'react';
import {View, Text} from 'react-native';
import { Header, Item, Icon, Input, Button, Spinner, Left, Body, Title } from 'native-base';
import axios from 'axios';
import {axiosCall} from './CodeAxios';
import SearchBody from './SearchBody';


class Search extends React.Component {
   constructor(props){      //Since I want to fetch the data on this screen, I built the contructor 
       console.log ("Hello:", props)
       super(props)
      this.state = {
        concertSearch: this.props.postalcode,
        onCall: true,
        data: {}
       }
   }
    componentDidMount(){ //rendering data 
       this.searchConcert ();
    }
       searchConcert = () => {
        this.setState({onCall:true});
        var self= this;
        const authOptions = {
          method: 'GET',
          url: `http://api.postcodes.io/postcodes/${this.state.concertSearch}`,
          data: null,
          json: true,
        };
        axiosCall(authOptions)
          .then(res => {
            console.log(res)
            const latitude = res.data.result.latitude;
            const longitude = res.data.result.longitude;
            const data = {
              method: 'GET',
              url: `https://api.songkick.com/api/3.0/events.json?apikey=vfjMY1CLhp70vT4J&location=geo:${latitude},${longitude}`,
              data: null,
              json: true,
            }
            axiosCall(data)
            .then(response => {
              console.log("Search response >", response);
              self.setState({data: response.data.resultsPage.results.event});
            self.setState({onCall: false});
            })
              .catch(error => {})
    
          })
          .catch(error => {
          console.log(error)
          });
      }
       renderBody = () => {
        if (this.state.onCall) {
            return (
                 <Spinner color='green' 
                 style={{marginTop: 275,}} //Upon calling the function, if there is no data, it will render a spinner 
                 />
            )   
           }
           else {
            return (
            <SearchBody data={this.state.data} /> //otherwise it will render the Searchbody component 
            //which is the body for displaying data in a flatlist 
            )
           }
         }
    render(){
        return(
<View>
<Header> 
<Left>
            <Button transparent
            onPress= {()=> this.props.switchScreen("landing")}>  
            {/*//created a onPress function for the back icon on top */}
              <Icon name='arrow-back' />
            </Button> 
          </Left>
           <Body style={{flex:2, alignItems: 'center', justifyContent: 'center', marginRight:90}}>
          <Title style={{fontFamily: 'Avenir-Black'}}> Results </Title>
          </Body> 
          </Header>
          <Header searchBar transparent rounded>
          <Item>
                <Icon name ="md-search" onPress={this.searchConcert} />
                
            <Input
              value={this.state.concertSearch}
              placeholder="Click the search icon to fetch results"
             onChangeText={(concertSearch) => this.setState({ concertSearch })}
            />
           </Item>
           
        </Header>
        {this.renderBody()} 
        {/* //rendered the body from the onCall state delcared before  */}
</View>
        )
    }
}

export default Search;  