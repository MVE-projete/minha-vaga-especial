import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, Button, ScrollView, Dimensions } from 'react-native';
import firebase from '../../firebaseConnection';
import { BotBig, BotMenor } from '../../components/registerButton';

export function MapaVaga({navigation}){
  let color;
  
  const [aux, setAux] = useState(1);
  const [sensorv, setSensorv] = useState();

  useEffect(() => { //Função pra puxar o valor do sensor do firebase (armazenada na variável 'sensorv')

    async function dados(){
      await firebase.database().ref('sensor').on('value', (snapshot) => {
        
        setSensorv(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux(0);
        setTimeout(function() {
          setAux(1);
        }, 10);
      
        
        
      });
    }

    dados();
  }, []);

if (sensorv == 1)
{
  color = 'green';
}
else if (sensorv == 0)
{
  color = 'blue';
}

function mudaPin(){
  setAux(0);
  setTimeout(function() {
    setAux(1);
  }, 1);

}

  return (
    <View
    style={styles.container}>
    <MapView
        initialRegion={{
        latitude: -22.24,
        longitude: -45.71,
        latitudeDelta: 0.0922, //zoom
        longitudeDelta: 0.0421,
    }}
    style={styles.MapView}
    rotateEnabled={false}
    
  >

{aux == 1 ? //Em todos os dois casos ele coloca o pincolor com o valor de 'color'. E o color varia conforme varia o sensorv (linha 27)
(
  <MapView.Marker 
          pinColor={color}
          coordinate={{
          latitude: -22.24,
          longitude: -45.71,
          
                      }}
        />
    
):
(
  
      <>
      </>
)}

    
  </MapView>

  <ScrollView 
    style={styles.placesContainer}
    horizontal
    pagingEnabled> 
    <View style={styles.place}>
    </View>
    <View style={styles.place}></View>

  </ScrollView>

  </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles= StyleSheet.create({
container:{
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',


},
MapView:{
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
},

placesContainer:{
  width: '100%',
  maxHeight: 200

},
place:{
  width: width -40,
  maxHeight: 200,
  backgroundColor: '#FFF',
  marginHorizontal: 20,
  borderRadius: 12

}


})