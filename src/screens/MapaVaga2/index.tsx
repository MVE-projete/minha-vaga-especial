import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { View, 
          Text,
          StyleSheet, 
          Button, 
          ScrollView, 
          Dimensions, 
          TextInput, 
          Platform, 
          Pressable
           } from 'react-native';

import firebase from '../../firebaseConnection';
//import { BotBig, BotMenor } from '../../components/registerButton';
import Modal from 'react-native-modal';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

const { height, width } = Dimensions.get('window');
let cor;

export function MapaVaga2({navigation}){
  state = { //colocar tres estados do pino (tres cores) E FAZER A AUTENTICÇÃO e APK
    places: [
      {
        id: 0,
        rua: 'ETEFMC',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.257638590895496,  
        longitude: -45.703384120913576,
        codigo: 'A3',
      },
      {
        id: 1,
        rua: 'Lorêto García',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.25624494403089, 
        longitude: -45.702733423060245,
        codigo: 'A4',
      },
      {
        id: 2,
        rua: 'João Bernardes',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.257077288363266, 
        longitude:  -45.70224044657601,
        codigo: 'A5', 
      }
    ],
      
  };


  let color;
  let validar = 'Validar vaga';
  let color2 = '#6c68ff';

  const [aux, setAux] = useState(1);
  const [sensorv, setSensorv] = useState();
  const [validation, setValidation] = useState();
  const [validstate, setValidstate] = useState();
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [vaga, setVaga] = useState('');
  let tipoVaga;


  function toggleModal(){
    setIsModalVisible(!IsModalVisible);
    console.log(IsModalVisible);
  };


  if(tipoVaga == undefined)
{

  const email = firebase.auth().currentUser?.email?.replace('.','');
  firebase.database().ref('users/' + email + '/tipo').on('value', (snapshot) => {
    tipoVaga = snapshot.val();
  });

    
    if(validstate == undefined)
    {
      firebase.database().ref('verificacao/A2').on('value', (snapshot) => {
        setValidstate(snapshot.val());
      });
    }


}


  function valid(){

    
    if(validstate == 0)
    {
      firebase.database().ref('verificacao').update({
        valor: 1,
      })
      alert("Validação feita com sucesso");
      setValidstate(1);
      setTimeout(function(){ toggleModal(); }, 1000);
      
    }
    else
    {
      firebase.database().ref('verificacao').update({
        valor: 0,
      })
      setValidstate(0);
      setTimeout(function(){ toggleModal(); }, 1000);
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
    color2 = '#DE7171';
    validar = 'Você já validou uma vaga';
  }
  else if (sensorv == 0 && validstate == 0)
  {
    color = 'green';
    color2 = '#6c68ff';
    validar = 'Validar vaga';
  }
  else if(sensorv == 1 && validstate == 0)
  {
    color = 'yellow';
    color2 = '#6c68ff';
    validar = 'Validar vaga';
  }
  else if(sensorv == 0 && validstate == 1)
  {
    color = 'orange';
    color2 = '#DE7171';
    validar = 'Você já validou uma vaga';
  }

  
  cor = ['red', 'red', color];

  

  const { latitude, longitude } = this.state.places[0];

  return (
    <View
      style={styles.container}>

{Platform.OS === "android" && (
  <View>
    <StatusBar
      hidden={true} />
        <Modal
        isVisible={IsModalVisible}
          
        >
          <View style ={{backgroundColor: 'white', borderRadius: 12, height: 170, width: 250, marginRight:'auto', marginLeft:'auto'}}>
          
          <Text style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 22,
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center'
          }}>
          Deseja validar a vaga 
        </Text> 

        <Text style={{
            marginTop: 2,
            marginBottom: 10,
            fontSize: 22,
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
        {vaga}?

        </Text>
         
        <View style={{height: 30}}/>
          
        <View style={{flexDirection: 'row'}}>

          <View style={{marginLeft: 'auto', marginRight: 10}}>
          <Pressable style={{backgroundColor: '#6c68ff', borderRadius: 4, height: 25, width: 80}}
            onPress={valid}>
              <Text style={{fontSize: 17, color: 'white', marginLeft: 'auto', marginRight: 'auto'}}> Validar! </Text>

          </Pressable>
          </View>

          <View style={{marginRight: 'auto', marginLeft: 10}}>
          <Pressable style={{borderWidth: 1, borderRadius: 4, borderColor: '#6c68ff', height: 25, width:80}}
            onPress={toggleModal}>
              <Text style={{fontSize: 17, marginRight: 'auto', marginLeft: 'auto'}}>
                Voltar
              </Text>

          </Pressable>
          </View>
            
          </View>
         </View>
        </Modal>


      </View>
      )}


    <MapView
        ref={map => this.mapView = map}
          initialRegion={{
          latitude: -22.257262253094318,  
          longitude: -45.7027400849008 ,
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
                description={'Rua' + place.rua}
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
          Vaga {place.id}
        </Text>  
        <Text style={styles.text2}>
          Rua: {place.rua}
        </Text>  
        <Text style={styles.text2}>
          Bairro: {place.bairro}
        </Text> 
        <Text style={styles.text2}>
          Código: {place.codigo}
        </Text> 
        


        <RectButton 
            style={{borderColor: '#FF11FF',
            borderWidth: 12,
            marginRight: 'auto',
            marginLeft: 'auto',
            height: 40,
            width: 300,
            backgroundColor: color2,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10}}
            onPress={()=> {setIsModalVisible(!IsModalVisible);
                          setVaga(place.codigo)}}
        >
        <Text style={{fontSize: 20, color: 'white'}}>
          {validar}
        </Text>
        </RectButton>



    

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
},
input: {
  height: 40,
  margin: 30,
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 10
},


})