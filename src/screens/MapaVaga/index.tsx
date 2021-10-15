import MapView from 'react-native-maps';//PCD
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
      }
    ],
      
  };

  let textobotao;
  let textobotaoA001;
  let textobotaoA002;
  let textobotaoA003;

  let corbotao;
  let corbotaoA001;
  let corbotaoA002;
  let corbotaoA003;
  let corA001;
  let corA002;
 let place2 = 0;
  
  const [validA001, setValidA001] = useState(0);
  const [validA002, setValidA002] = useState(0);
  const [sensA001, setSensA001] = useState();
  const [sensA002, setSensA002] = useState();

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
      firebase.database().ref('verificacao/A003').on('value', (snapshot) => {
        setValidstate(snapshot.val());
      });
      firebase.database().ref('verificacao/A001').on('value', (snapshot) => {
        setValidA001(snapshot.val());
      });
      firebase.database().ref('verificacao/A002').on('value', (snapshot) => {
        setValidA002(snapshot.val());
      });
      firebase.database().ref('users/' + email +'/validacao').on('value', (snapshot) => {
        setUserVal(snapshot.val());
      });
    }


}


function unvalid(){

  if(vaga == 'A003')

  {firebase.database().ref('verificacao').update({
    A003: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  firebase.database().ref('info/A003').update({
    email: '',
    tipo: ''
  })
setUserVal('0')
setValidstate(0)
setAux2(0);
setTimeout(function() {
  setAux2(1);
}, 10);}
  
  


  else if(vaga == 'A001')

  {firebase.database().ref('verificacao').update({
    A001: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  firebase.database().ref('info/A001').update({
    email: '',
    tipo: ''
  })
  setUserVal('0')
  setValidA001(0)
  setAux0(0);
  setTimeout(function() {
    setAux0(1);
  }, 10);
  
  
}

  else if(vaga == 'A002')
  {firebase.database().ref('verificacao').update({
    A002: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  firebase.database().ref('info/A002').update({
    email: '',
    tipo: ''
  })
  setUserVal('0')
  setValidA002(0)
  setAux1(0);
  setTimeout(function() {
    setAux1(1);
  }, 10);}

}





  function valid(){

    if(vaga == 'A003')

    {
                    if(validstate == 0)
                  {
                    if(sensorv == 1)

                      {firebase.database().ref('verificacao').update({
                        A003: 1,
                      })
                      firebase.database().ref('users/' + email ).update({
                        validacao: 'A003',
                      })
                      firebase.database().ref('info/A003').update({
                        email: email,
                        tipo: tipoVaga
                      })
                      alert("Validação feita com sucesso");
                      setValidstate(1);
                      setTimeout(function(){ toggleModal(); }, 1000);
                      setUserVal('A003');}
                      else
                      {
                        alert("Caro usuário(a): Por questões de segurança, estacione seu veículo primeiro, e depois valida a vaga")
                      }
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

        else if (vaga == 'A001')
        {


          if(validA001 == 0)
                  {
                    if(sensA001 == 1)
                      {firebase.database().ref('verificacao').update({
                        A001: 1,
                      })
                      firebase.database().ref('users/' + email ).update({
                        validacao: 'A001',
                      })
                      firebase.database().ref('info/A001').update({
                        email: email,
                        tipo: tipoVaga
                      })
                      alert("Validação feita com sucesso");
                      setUserVal('A001');
                      setValidA001(1);
                      setTimeout(function(){ toggleModal(); }, 1000);}
                    else
                    {
                      alert("Caro usuário(a): Por questões de segurança, estacione seu veículo primeiro, e depois valida a vaga")
                    }
                    
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
        else if(vaga == 'A002')
        {


          if(validA002 == 0)
          {
            if(sensA002 == 1)

              {firebase.database().ref('verificacao').update({
                A002: 1,
              })
              firebase.database().ref('users/' + email ).update({
                validacao: 'A002',
              })
              firebase.database().ref('info/A002').update({
                email: email,
                tipo: tipoVaga
              })
              alert("Validação feita com sucesso");
              setUserVal('A002');
              setValidA002(1);
              setTimeout(function(){ toggleModal(); }, 1000);}
            else
            {
              alert("Caro usuário(a): Por questões de segurança, estacione seu veículo primeiro, e depois valida a vaga")
            }
            
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
      await firebase.database().ref('vagas/A003').on('value', (snapshot) => {
        
        setSensorv(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux2(0);
        setTimeout(function() {
          setAux2(1);
        }, 5);
      
      });
      await firebase.database().ref('sensor').on('value', (snapshot) => {
        
        setSensA001(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux0(0);
        setTimeout(function() {
          setAux0(1);
        }, 5);
      
      });
      await firebase.database().ref('vagas/A002').on('value', (snapshot) => {
        
        setSensA002(snapshot.val());  //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux1(0);
        setTimeout(function() {
          setAux1(1);
        }, 5);
      
      });
    }

    dados();
  }, []);


  if (sensA002 == 1 && validA002 == 1)
  {
    corA002 = 'red';
    corbotaoA002 = '#DE7171';
    textobotaoA002 = 'Esta vaga está validada';
  }
  else if (sensA002 == 0 && validA002 == 0)
  {
    corA002 = 'green';
    corbotaoA002 = '#6c68ff';
    textobotaoA002 = 'Validar vaga';
  }
  else if(sensA002 == 1 && validA002 == 0)
  {
    corA002 = 'yellow';
    corbotaoA002 = '#6c68ff';
    textobotaoA002 = 'Validar vaga';
  }
  else if(sensA002 == 0 && validA002 == 1)
  {
    corA002 = 'orange';
    corbotaoA002 = '#DE7171';
    textobotaoA002 = 'Esta vaga está validada';
  }






  if (sensA001 == 1 && validA001 == 1)
  {
    corA001 = 'red';
    corbotaoA001 = '#DE7171';
    textobotaoA001 = 'Esta vaga está validada';
  }
  else if (sensA001 == 0 && validA001 == 0)
  {
    corA001 = 'green';
    corbotaoA001 = '#6c68ff';
    textobotaoA001 = 'Validar vaga';
  }
  else if(sensA001 == 1 && validA001 == 0)
  {
    corA001 = 'yellow';
    corbotaoA001 = '#6c68ff';
    textobotaoA001 = 'Validar vaga';
  }
  else if(sensA001 == 0 && validA001 == 1)
  {
    corA001 = 'orange';
    corbotaoA001 = '#DE7171';
    textobotaoA001 = 'Esta vaga está validada';
  }





  if (sensorv == 1 && validstate == 1)
  {
    color = 'red';
    corbotaoA003 = '#DE7171';
    textobotaoA003 = 'Esta vaga está validada';
  }
  else if (sensorv == 0 && validstate == 0)
  {
    color = 'green';
    corbotaoA003 = '#6c68ff';
    textobotaoA003 = 'Validar vaga';
  }
  else if(sensorv == 1 && validstate == 0)
  {
    color = 'yellow';
    corbotaoA003 = '#6c68ff';
    textobotaoA003 = 'Validar vaga';
  }
  else if(sensorv == 0 && validstate == 1)
  {
    color = 'orange';
    corbotaoA003 = '#DE7171';
    textobotaoA003 = 'Esta vaga está validada';
  }

  //Código novo
if(userVal == 'A001')
  {
    textobotaoA001 = 'Você validou já esta vaga';
  }
else if(userVal == 'A002')
  {
    textobotaoA002 = 'Você validou já esta vaga';
  }
else if(userVal == 'A003')
  {
    textobotaoA003 = 'Você já validou esta vaga';
  }

  
  cor = [corA001, corA002, color];
  corbotao = [corbotaoA001, corbotaoA002, corbotaoA003];
  textobotao = [textobotaoA001, textobotaoA002, textobotaoA003];

  

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