import React from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { Card, CardItem, List, ListItem } from 'native-base';


class SearchBody extends React.Component {
    render() {
        
        return (
                
            <FlatList //rendered items in a react FlatList. 
            //Sample code from documentation was slightly tweaked to get the data. 
            data= {this.props.data}
                renderItem={({ item }) =>
                <Card>
                        <CardItem>
                            <Text style={{fontFamily:'AppleSDGothicNeo-Bold', fontSize: 17}} >
                                {item.displayName} 
                              </Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontWeight: 'bold', fontFamily:'AppleSDGothicNeo-Medium', color: '#000080', fontSize: 16}}>
                           Where: <Text>{item.venue.displayName}</Text>
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontWeight: 'bold', fontFamily:'AppleSDGothicNeo-Medium', color: '#008080', fontSize: 16}}>
                           When: <Text>{item.start.date}</Text>
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontFamily:'AppleSDGothicNeo-Bold', color: '#696969', fontSize: 16}}>
                            Status: <Text>{item.status}</Text>
                            </Text>
                        </CardItem>
                    </Card>
                }
                keyExtractor={item => item.id} 
                />
       
        )
            
    }
}

export default SearchBody;

const styles = {
    info: {
        flex: 1,
        backgroundColor: 'white',
        opacity: 0.8,
    }
}