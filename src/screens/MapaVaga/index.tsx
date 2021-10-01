import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, Button, ScrollView, Dimensions, TextInput, Platform, Modal } from 'react-native';
import firebase from '../../firebaseConnection';
import { BotBig, BotMenor } from '../../components/registerButton';

const { height, width } = Dimensions.get('window');
let cor;

export function MapaVaga({navigation}){
  state = { //colocar tres estados do pino (tres cores) E FAZER A AUTENTICÇÃO e APK
    places: [
      {
        id: 0,
        rua: 'Adélino Carneiro Pinto',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.25473293664138, 
        longitude: -45.70466075394644,
        codigo: 123,
      },
      {
        id: 1,
        rua: 'Adélino Carneiro Pinto',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.254762104945637, 
        longitude: -45.7047271386185,
        codigo: 321,
      },
      {
        id: 2,
        rua: 'A. José Cleto Duarte',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.254351255893518,
        longitude:  -45.7053063842081,
        codigo: 132, 
      }
    ],
  };


  let color;
  
  const [aux, setAux] = useState(1);
  const [sensorv, setSensorv] = useState();
  const [validation, setValidation] = useState();
  const [validstate, setValidstate] = useState(0);
  let isModalVisible = false;


  function valid(){
    
    if(validation == 123)
    {
      firebase.database().ref('verificacao').update({
        valor: 1,
      })
      alert("Validação feita com sucesso");
      setValidstate(1);
    }
    else
    {
      alert("Erro na validação!")
      setValidstate(0);
    }
    setAux(0);
        setTimeout(function() {
          setAux(1);
        }, 10);
  }

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

  if (sensorv == 1 && validstate == 1)
  {
    color = 'red';
  }
  else if (sensorv == 0 && validstate == 0)
  {
    color = 'green';
  }
  else if(sensorv == 1 && validstate == 0)
  {
    color = 'yellow';
  }
  else if(sensorv == 0 && validstate == 1)
  {
    color = 'orange';
  }

  
  cor = ['red', 'red', color];

  

  const { latitude, longitude } = this.state.places[0];

  return (
    <View style={styles.container}>

    <MapView
        ref={map => this.mapView = map}
          initialRegion={{
          latitude: -22.25473293664138, 
          longitude: -45.70466075394644,
          latitudeDelta: 0.0030733, //zoom
          longitudeDelta: 0.0014033,
        }}
        style={styles.MapView}
        rotateEnabled={false}
    >

    {aux == 1 ? 
      //Em todos os dois casos ele coloca o pincolor com o valor de 'color'. E o color varia conforme varia o sensorv (linha 27)
      this.state.places.map(place => (
        <MapView.Marker 
                title={"Vaga " + place.id}
                description={place.description}
                ref={mark => place.mark = mark}
                key={place.id}
                pinColor={cor[place.id]}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
              }}
              
        />
    ))
    :
    (
          <>
          </>
    )}

   

   
    
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

      

    }}> 

    { this.state.places.map(place => (
        <View 
          key={place.id}
          style={styles.place}>

        <Text style={styles.text}>
          Vaga {place.id}, {place.description}
        </Text>  
        <Text style={styles.text2}>
          Rua: {place.rua}
        </Text>  
        <Text style={styles.text2}>
          Bairro: {place.bairro}
        </Text> 
        <TextInput
        style={{backgroundColor: '#B3E0FF', borderRadius: 5, marginRight: 20, marginLeft: 20, height: 40}}
        placeholder="Código da vaga"
        onChangeText={texto => {
            setValidation(texto)
        }}/>
        <BotBig 
          title="Validar vaga"
          onPress={valid}/>
        

        </View>

    ))}

  </ScrollView>

  </View>
  );
}


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
  maxHeight: 250

},
place:{
  width: width -40,
  maxHeight: 250,
  backgroundColor: '#FFF',
  marginHorizontal: 20,
  borderRadius: 12

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
}


})