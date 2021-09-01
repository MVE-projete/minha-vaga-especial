import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, Button} from 'react-native';
import firebase from '../../firebaseConnection';

import { BotLoginSegundo } from '../../components/registerButton';

export function MapaVaga({navigation}){
  let color;
  let aux;
  

  const [sensorv, setSensorv] = useState();

  useEffect(() => { //Função pra puxar o valor do sensor do firebase (armazenada na variável 'sensorv')

    async function dados(){
      await firebase.database().ref('sensor').on('value', (snapshot) => {
        
        setSensorv(snapshot.val());
        
        
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


  return (
    
    <MapView
        initialRegion={{
        latitude: -22.24,
        longitude: -45.71,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }}
    style={styles.MapView}
    
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
  
  );
}
const styles= StyleSheet.create({
MapView:{
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
},

})