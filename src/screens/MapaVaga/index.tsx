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
import { BotBig, BotMenor } from '../../components/registerButton';
import Modal from 'react-native-modal';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

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
        codigo: 'A0',
      },
      {
        id: 1,
        rua: 'Adélino Carneiro Pinto',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.254762104945637, 
        longitude: -45.7047271386185,
        codigo: 'A1',
      },
      {
        id: 2, //Essa vaga funciona com o sensor
        rua: 'A. José Cleto Duarte',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.254351255893518,
        longitude:  -45.7053063842081,
        codigo: 'A2', 
      }
    ],
      
  };

  let textobotao;
  let textobotaoA0;
  let textobotaoA1;
  let textobotaoA2;

  let corbotao;
  let corbotaoA0;
  let corbotaoA1;
  let corbotaoA2;
  let corA0;
  let corA1;
 let place2 = 0;
  
  const [validA0, setValidA0] = useState(0);
  const [validA1, setValidA1] = useState(0);
  const [sensA0, setSensA0] = useState();
  const [sensA1, setSensA1] = useState();

  const [userVal, setUserVal] = useState();
  
  let color;
  let validar = 'Validar vaga';
  let color2 = '#6c68ff';

  const [aux0, setAux0] = useState(1);
  const [aux1, setAux1] = useState(1);
  const [aux2, setAux2] = useState(1);

  const [sensorv, setSensorv] = useState();
  const [validation, setValidation] = useState();
  const [validstate, setValidstate] = useState();
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [IsModalVisible2, setIsModalVisible2] = useState(false);
  const [IsModalVisible3, setIsModalVisible3] = useState(false);
  const [vaga, setVaga] = useState('');
  let tipoVaga;
  const email = firebase.auth().currentUser?.email?.replace('.','');

  

  function toggleModal(){
    setIsModalVisible(!IsModalVisible);
    console.log(IsModalVisible);
  };

  function toggleModal2(){
    setIsModalVisible2(!IsModalVisible2);
    console.log(IsModalVisible2);
  };

  function toggleModal3(){
    setIsModalVisible3(!IsModalVisible3);
    console.log(IsModalVisible3);
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
      firebase.database().ref('verificacao/A0').on('value', (snapshot) => {
        setValidA0(snapshot.val());
      });
      firebase.database().ref('verificacao/A1').on('value', (snapshot) => {
        setValidA1(snapshot.val());
      });
      firebase.database().ref('users/' + email +'/validacao').on('value', (snapshot) => {
        setUserVal(snapshot.val());
      });
    }


}


function unvalid(){

  if(vaga == 'A2')

  {firebase.database().ref('verificacao').update({
    A2: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
setUserVal('0')
setValidstate(0)
setAux2(0);
setTimeout(function() {
  setAux2(1);
}, 10);}
  
  


  else if(vaga == 'A0')

  {firebase.database().ref('verificacao').update({
    A0: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  setUserVal('0')
  setValidA0(0)
  setAux0(0);
  setTimeout(function() {
    setAux0(1);
  }, 10);
  
  
}

  else if(vaga == 'A1')
  {firebase.database().ref('verificacao').update({
    A1: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  setUserVal('0')
  setValidA1(0)
  setAux1(0);
  setTimeout(function() {
    setAux1(1);
  }, 10);}

}





  function valid(){

    if(vaga == 'A2')

    {
                    if(validstate == 0)
                  {
                    firebase.database().ref('verificacao').update({
                      A2: 1,
                    })
                    firebase.database().ref('users/' + email ).update({
                      validacao: 'A2',
                    })
                    alert("Validação feita com sucesso");
                    setValidstate(1);
                    setTimeout(function(){ toggleModal(); }, 1000);
                    setUserVal('A2');
                  }
                  else
                  {
                    alert("Esta vaga está validada");
                  }
                  setAux2(0);
                      setTimeout(function() {
                        setAux2(1);
                      }, 10);
        }

        else if (vaga == 'A0')
        {


          if(validA0 == 0)
                  {
                    firebase.database().ref('verificacao').update({
                      A0: 1,
                    })
                    firebase.database().ref('users/' + email ).update({
                      validacao: 'A0',
                    })
                    alert("Validação feita com sucesso");
                    setUserVal('A0');
                    setValidA0(1);
                    setTimeout(function(){ toggleModal(); }, 1000);
                    
                  }
                  else
                  {
                    alert("Esta vaga está validada");
                  }
                  setAux0(0);
                      setTimeout(function() {
                        setAux0(1);
                      }, 10);
              

          
          

        }
        else if(vaga == 'A1')
        {


          if(validA1 == 0)
          {
            firebase.database().ref('verificacao').update({
              A1: 1,
            })
            firebase.database().ref('users/' + email ).update({
              validacao: 'A1',
            })
            alert("Validação feita com sucesso");
            setUserVal('A1');
            setValidA1(1);
            setTimeout(function(){ toggleModal(); }, 1000);
            
          }
          else
          {
            alert("Esta vaga está validada");
          }
          setAux1(0);
              setTimeout(function() {
                setAux1(1);
              }, 10);
      


        }


  }

  useEffect(() => { //Função pra puxar o valor do sensor do firebase (armazenada na variável 'sensorv')

    async function dados(){
      await firebase.database().ref('sensor').on('value', (snapshot) => {
        
        setSensorv(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux2(0);
        setTimeout(function() {
          setAux2(1);
        }, 5);
      
      });
      await firebase.database().ref('vagas/A0').on('value', (snapshot) => {
        
        setSensA0(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux0(0);
        setTimeout(function() {
          setAux0(1);
        }, 5);
      
      });
      await firebase.database().ref('vagas/A1').on('value', (snapshot) => {
        
        setSensA1(snapshot.val());  //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux1(0);
        setTimeout(function() {
          setAux1(1);
        }, 5);
      
      });
    }

    dados();
  }, []);


  if (sensA1 == 1 && validA1 == 1)
  {
    corA1 = 'red';
    corbotaoA1 = '#DE7171';
    textobotaoA1 = 'Esta vaga está validada';
  }
  else if (sensA1 == 0 && validA1 == 0)
  {
    corA1 = 'green';
    corbotaoA1 = '#6c68ff';
    textobotaoA1 = 'Validar vaga';
  }
  else if(sensA1 == 1 && validA1 == 0)
  {
    corA1 = 'yellow';
    corbotaoA1 = '#6c68ff';
    textobotaoA1 = 'Validar vaga';
  }
  else if(sensA1 == 0 && validA1 == 1)
  {
    corA1 = 'orange';
    corbotaoA1 = '#DE7171';
    textobotaoA1 = 'Esta vaga está validada';
  }






  if (sensA0 == 1 && validA0 == 1)
  {
    corA0 = 'red';
    corbotaoA0 = '#DE7171';
    textobotaoA0 = 'Esta vaga está validada';
  }
  else if (sensA0 == 0 && validA0 == 0)
  {
    corA0 = 'green';
    corbotaoA0 = '#6c68ff';
    textobotaoA0 = 'Validar vaga';
  }
  else if(sensA0 == 1 && validA0 == 0)
  {
    corA0 = 'yellow';
    corbotaoA0 = '#6c68ff';
    textobotaoA0 = 'Validar vaga';
  }
  else if(sensA0 == 0 && validA0 == 1)
  {
    corA0 = 'orange';
    corbotaoA0 = '#DE7171';
    textobotaoA0 = 'Esta vaga está validada';
  }





  if (sensorv == 1 && validstate == 1)
  {
    color = 'red';
    corbotaoA2 = '#DE7171';
    textobotaoA2 = 'Esta vaga está validada';
  }
  else if (sensorv == 0 && validstate == 0)
  {
    color = 'green';
    corbotaoA2 = '#6c68ff';
    textobotaoA2 = 'Validar vaga';
  }
  else if(sensorv == 1 && validstate == 0)
  {
    color = 'yellow';
    corbotaoA2 = '#6c68ff';
    textobotaoA2 = 'Validar vaga';
  }
  else if(sensorv == 0 && validstate == 1)
  {
    color = 'orange';
    corbotaoA2 = '#DE7171';
    textobotaoA2 = 'Esta vaga está validada';
  }

  //Código novo
if(userVal == 'A0')
  {
    textobotaoA0 = 'Você validou já esta vaga';
  }
else if(userVal == 'A1')
  {
    textobotaoA1 = 'Você validou já esta vaga';
  }
else if(userVal == 'A2')
  {
    textobotaoA2 = 'Você já validou esta vaga';
  }

  
  cor = [corA0, corA1, color];
  corbotao = [corbotaoA0, corbotaoA1, corbotaoA2];
  textobotao = [textobotaoA0, textobotaoA1, textobotaoA2];

  

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
              onPress={()=> {if(userVal == '0')
              {valid()}
              else(alert("Você já validou uma vaga. Para cancelar a validação aperte em"))}}>
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
  
  
  {/*setVaga('');*/}
  
        </View>
        )}
  
  
  
  
  
  
  
  {Platform.OS === "android" && (
    <View>
      <StatusBar
        hidden={true} />
          <Modal
          isVisible={IsModalVisible2}
          
            
          >
            <View style ={{backgroundColor: 'white', borderRadius: 12, height: 200, width: 300, marginRight:'auto', marginLeft:'auto'}}>
            
            <Text style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: 22,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center'
            }}>
            Deseja cancelar a validação da vaga
          </Text> 
  
          <Text style={{
              marginTop: 2,
              marginBottom: 10,
              fontSize: 22,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
          {vaga}?
  
          </Text>
           
          <View style={{height: 30}}/>
            
          <View style={{flexDirection: 'row'}}>
  
            <View style={{marginLeft: 'auto', marginRight: 10}}>
            <Pressable style={{backgroundColor: '#6c68ff', borderRadius: 4, height: 25, width: 80}}
              onPress={()=> {
                unvalid()
                alert("Validação cancelada");
                setTimeout(function(){ toggleModal2();
                  }, 1000);
                  setTimeout(function(){ setVaga('');},2000);
              }
              }>
  
                <Text style={{fontSize: 17, color: 'white', marginLeft: 'auto', marginRight: 'auto'}}> Sim! </Text>
  
            </Pressable>
            </View>
  
            <View style={{marginRight: 'auto', marginLeft: 10}}>
            <Pressable style={{borderWidth: 1, borderRadius: 4, borderColor: '#6c68ff', height: 25, width:80}}
              onPress={toggleModal2}>
                <Text style={{fontSize: 17, marginRight: 'auto', marginLeft: 'auto'}}>
                  Voltar
                </Text>
  
            </Pressable>
            </View>
              
            </View>
           </View>
          </Modal>
  
  
  {/**/}
  
        </View>
        )}
  
  
  
  
  
  
  
  
  
  
  
  
  
  {Platform.OS === "android" && (
    <View>
      <StatusBar
        hidden={true} />
          <Modal
          isVisible={IsModalVisible3}
          
            
          >
            <View style ={{backgroundColor: 'white', borderRadius: 12, height: 150, width: 250, marginRight:'auto', marginLeft:'auto'}}>
            
            <Text style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: 22,
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'center'
            }}>
            Valide sua vaga!
          </Text> 
  
           
          <View style={{height: 30}}/>
            
            <Pressable style={{borderWidth: 1, 
            marginLeft: 'auto', 
            marginRight: 'auto', 
            borderRadius: 4, 
            backgroundColor:'#6c68ff',  
            borderColor: '#6c68ff', 
            height: 30, width:90}}
              onPress={()=> {toggleModal3();
              this.state.places[place2].mark.showCallout()}}>
                <Text style={{fontSize: 20, marginRight: 'auto', marginLeft: 'auto', color: 'white'}}>
                  Ok
                </Text>
  
            </Pressable>
            
           
           </View>
          </Modal>
  
  
  {/**/}
  
        </View>
        )}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
      <MapView
      onMapReady={toggleModal3}
          ref={map => this.mapView = map}
            initialRegion={{
            latitude: -22.25473293664138, 
            longitude: -45.70466075394644,
            latitudeDelta: 0.0030733, //zoom
            longitudeDelta: 0.0014033,
          }}
          style={styles.MapView}
          rotateEnabled={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          zoomEnabled={false}
          scrollEnabled={false}
      >
  
  {this.state.places.map(place => (
    
      place.id == 0 && aux0 == 1?  
      (
        <MapView.Marker 
                  title={"Vaga " + place.id}
                  description={'Rua ' + place.rua}
                  ref={mark => place.mark = mark}
                  key={place.id}
                  pinColor={cor[place.id]}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                }}
                
          />
      ):
      (<></>)
  
  
    
    ))}
  
  {this.state.places.map(place => (
    
    place.id == 1 && aux1 == 1?  
    (
      <MapView.Marker 
                title={"Vaga " + place.id}
                description={'Rua ' + place.rua}
                ref={mark => place.mark = mark}
                key={place.id}
                pinColor={cor[place.id]}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
              }}
              
        />
    ):
    (<></>)
  
  
  
  ))}
  
  {this.state.places.map(place => (
    
    place.id == 2 && aux2 == 1?  
    (
      <MapView.Marker 
                title={"Vaga " + place.id}
                description={'Rua ' + place.rua}
                ref={mark => place.mark = mark}
                key={place.id}
                pinColor={cor[place.id]}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
              }}
              
        />
    ):
    (<></>)
  
  
  
  ))}
  
  {/* CODIGO FUNCIONAL DA VAGA
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
  
   */}
     
      
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
  
        place2 = Math.round(place);
  
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
              backgroundColor: corbotao[place.id],
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10}}
              onPress={()=> {
                            setVaga(place.codigo);
                            setIsModalVisible(!IsModalVisible);}}
          >
          <Text style={{fontSize: 20, color: 'white'}}>
            {textobotao[place.id]}
          </Text>
          </RectButton>
  
  
  {userVal == place.codigo ?
    (
  
  <RectButton 
              style={{borderColor: '#FF11FF',
              borderWidth: 12,
              marginRight: 'auto',
              marginLeft: 'auto',
              height: 40,
              width: 300,
              backgroundColor: '#6c68ff',
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10}}
              onPress={()=> {
                if(userVal != '0')
                {
                  setVaga(userVal)
                }
                            setIsModalVisible2(!IsModalVisible2);}}
          >
          <Text style={{fontSize: 20, color: 'white'}}>
            Cancelar validação desta vaga
          </Text>
          </RectButton>
  
  
  
    )
  :
  (<></>)}
      
  
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
input: {
  height: 40,
  margin: 30,
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 10
},


})