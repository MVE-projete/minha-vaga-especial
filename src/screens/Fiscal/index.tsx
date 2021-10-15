import MapView from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import firebase from '../../firebaseConnection';

const { width } = Dimensions.get('window');


export function Fiscal({navigation})
{
    state = {
        places: [
            {
                id: 0,
                rua: 'Adélino Carneiro Pinto',
                bairro: 'Centro',
                description: 'Estacionamento Unissul',
                latitude: -22.25473293664138, 
                longitude: -45.70466075394644,
                codigo: 'A001', //Essa vaga funciona com o sensor
              },
            {
                id: 1,
                rua: 'Adélino Carneiro Pinto',
                bairro: 'Centro',
                description: 'Estacionamento Unissul',
                latitude: -22.254762104945637, 
                longitude: -45.7047271386185,
                codigo: 'A002',
              },
            {
                id: 2, 
                rua: 'A. José Cleto Duarte',
                bairro: 'Centro',
                description: 'Estacionamento Unissul',
                latitude: -22.254351255893518,
                longitude:  -45.7053063842081,
                codigo: 'A003', 
              },
            {
                id: 3,
                rua: 'ETEFMC',
                bairro: 'Centro',
                description: 'Estacionamento Unissul',
                latitude: -22.257638590895496,  
                longitude: -45.703384120913576,
                codigo: 'B001' //ESTA VAGA FUNCIONA COM O SENSOR 
              },
            {
                id: 4,
                rua: 'Lorêto García',
                bairro: 'Centro',
                description: 'Estacionamento Unissul',
                latitude: -22.25624494403089, 
                longitude: -45.702733423060245,
                codigo: 'B002',
              },
            {
                id: 5,
                rua: 'João Bernardes',
                bairro: 'Centro',
                description: 'Estacionamento Unissul',
                latitude: -22.257077288363266, 
                longitude:  -45.70224044657601,
                codigo: 'B003', 
              }
        ]
    };

    const [email1, setEmail1] = useState();
    const [email2, setEmail2] = useState();
    const [email3, setEmail3] = useState();
    const [email4, setEmail4] = useState();
    const [email5, setEmail5] = useState();
    const [email6, setEmail6] = useState();
    let textos;

    useEffect(() => {

        async function dados(){
    
                await firebase.database().ref('info/A001/email').on('value', (snapshot) => {
                    setEmail1(snapshot.val())
                });
                await firebase.database().ref('info/A002/email').on('value', (snapshot) => {
                    setEmail2(snapshot.val())
                });
                await firebase.database().ref('info/A003/email').on('value', (snapshot) => {
                    setEmail3(snapshot.val())
                });
                await firebase.database().ref('info/B001/email').on('value', (snapshot) => {
                    setEmail4(snapshot.val())
                });
                await firebase.database().ref('info/B002/email').on('value', (snapshot) => {
                    setEmail5(snapshot.val())
                });
                await firebase.database().ref('info/B003/email').on('value', (snapshot) => {
                    setEmail6(snapshot.val())
                });

            
            }
        dados();
    }, []);
               
       
textos = [email1, email2, email3, email4, email5, email6]

    

    return (
        <View style = {styles.container}>
            <MapView
                ref={map => this.mapView = map}
                    initialRegion={{
                        latitude: -22.257638590895496, 
                        longitude: -45.703384120913576,
                        latitudeDelta: 0.0030733, //zoom
                        longitudeDelta: 0.0014033,
                    }}
                    style = {styles.MapView}
                    showsBuildings={false}
                    showsPointsOfInterest={false}
                    >

                    {this.state.places.map(place => (
                      <MapView.Marker 
                      title={"Vaga " + place.id}
                      description={'Rua ' + place.rua}
                      ref={mark => place.mark = mark}
                      key={place.id}
                      pinColor={'red'}
                      coordinate={{
                        latitude: place.latitude,
                        longitude: place.longitude,
                    }}
                    
              />
                    ))}
          



            </MapView>

            <ScrollView
          
          style={styles.placesContainer}
          horizontal
          pagingEnabled
      
            onMomentumScrollEnd={e => {
                const scrolled = e.nativeEvent.contentOffset.x;
                const place = (scrolled > 0)
                ? scrolled / Dimensions.get('window').width
                : 0;
        
                const place2 = Math.round(place);
        
                const { latitude, longitude, mark } = this.state.places[place2];
                
                this.mapView.animateToCoordinate({
                latitude,
                longitude,
                }, 1000);
        
                setTimeout(() => {
                mark.showCallout();
        
                }, 1000);
  
        
  
      }}
          
          
          >

{ this.state.places.map(place => (
          <View 
            key={place.id}
            style={styles.place}>
  
          <Text style={styles.text}>
            Vaga {place.id}
          </Text>  
          <Text style={styles.text2}>
            Rua: {place.rua}
          </Text>  
          <Text style={styles.text2}>
            Dados da vaga: validada por {textos[place.id]}
          </Text> 
          <Text style={styles.text2}>
            Código: {place.codigo}
          </Text> 
        </View>

))}



          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'

    },
    MapView:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    placesContainer:{
        width: '100%',
        maxHeight: 250
      
      },
      place:{
        width: width -40,
        maxHeight: 250,
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
        borderColor: '#6c68ff',
        borderWidth: 1,
        borderBottomStartRadius:0,
        borderBottomEndRadius: 0
      
      },
      text: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 10
      },
      text2: {
        fontSize: 15,
        marginLeft: 10
      },

})