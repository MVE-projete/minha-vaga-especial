import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { View, 
          Text,
          StyleSheet,
          ScrollView, 
          Dimensions,
          Platform, 
          Pressable
           } from 'react-native';

import firebase from '../../firebaseConnection';
import Modal from 'react-native-modal';
import { RectButton } from 'react-native-gesture-handler';
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
        codigo: 'A3'
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

  let textobotao;

  let textobotaoA3;
  let textobotaoA4;
  let textobotaoA5;

  let corbotao;

  let corbotaoA3;
  let corbotaoA4;
  let corbotaoA5;

  let corA3;
  let corA4;
  let corA5;

  let place2 = 0;
  
  const [validA3, setValidA3] = useState(0);
  const [validA4, setValidA4] = useState(0);
  const [validA5, setValidA5] = useState(0);

  const [sensA3, setSensA3] = useState();
  const [sensA4, setSensA4] = useState();
  const [sensA5, setSensA5] = useState();

  const [userVal, setUserVal] = useState('0');
  

  const [aux3, setAux3] = useState(1);
  const [aux4, setAux4] = useState(1);
  const [aux5, setAux5] = useState(1);

  
  //const [validation, setValidation] = useState();
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

    
    if(validA5 == undefined)
    {
      firebase.database().ref('verificacao/A5').on('value', (snapshot) => {
        setValidA5(snapshot.val());
      });
      firebase.database().ref('verificacao/A3').on('value', (snapshot) => {
        setValidA3(snapshot.val());
      });
      firebase.database().ref('verificacao/A4').on('value', (snapshot) => {
        setValidA4(snapshot.val());
      });
      firebase.database().ref('users/' + email +'/validacao').on('value', (snapshot) => {
        setUserVal(snapshot.val());
      });
    }


}


function unvalid(){

  if(vaga == 'A5')

  {firebase.database().ref('verificacao').update({
    A5: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
setUserVal('0')
setValidA5(0)
setAux5(0);
setTimeout(function() {
  setAux5(1);
}, 10);}
  
  


  else if(vaga == 'A3')

  {firebase.database().ref('verificacao').update({
    A3: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  setUserVal('0')
  setValidA3(0)
  setAux3(0);
  setTimeout(function() {
    setAux3(1);
  }, 10);
  
  
}

  else if(vaga == 'A4')
  {firebase.database().ref('verificacao').update({
    A4: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  setUserVal('0')
  setValidA4(0)
  setAux4(0);
  setTimeout(function() {
    setAux4(1);
  }, 10);}

}





  function valid(){

    if(vaga == 'A5')

    {
                    if(validA5 == 0)
                  {
                    firebase.database().ref('verificacao').update({
                      A5: 1,
                    })
                    firebase.database().ref('users/' + email ).update({
                      validacao: 'A5',
                    })
                    alert("Validação feita com sucesso");
                    setValidA5(1);
                    setTimeout(function(){ toggleModal(); }, 1000);
                    setUserVal('A5');
                  }
                  else
                  {
                    alert("Esta vaga está validada");
                  }
                  setAux5(0);
                      setTimeout(function() {
                        setAux5(1);
                      }, 10);
        }

        else if (vaga == 'A3')
        {


          if(validA3 == 0)
                  {
                    firebase.database().ref('verificacao').update({
                      A3: 1,
                    })
                    firebase.database().ref('users/' + email ).update({
                      validacao: 'A3',
                    })
                    alert("Validação feita com sucesso");
                    setUserVal('A3');
                    setValidA3(1);
                    setTimeout(function(){ toggleModal(); }, 1000);
                    
                  }
                  else
                  {
                    alert("Esta vaga está validada");
                  }
                  setAux3(0);
                      setTimeout(function() {
                        setAux3(1);
                      }, 10);
              

          
          

        }
        else if(vaga == 'A4')
        {


          if(validA4 == 0)
          {
            firebase.database().ref('verificacao').update({
              A4: 1,
            })
            firebase.database().ref('users/' + email ).update({
              validacao: 'A4',
            })
            alert("Validação feita com sucesso");
            setUserVal('A4');
            setValidA4(1);
            setTimeout(function(){ toggleModal(); }, 1000);
            
          }
          else
          {
            alert("Esta vaga está validada");
          }
          setAux4(0);
              setTimeout(function() {
                setAux4(1);
              }, 10);
      


        }


  }

  useEffect(() => { //Função pra puxar o valor do sensor do firebase (armazenada na variável 'sensA5')

    async function dados(){
      await firebase.database().ref('vagas/A5').on('value', (snapshot) => {
        
        setSensA5(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux5(0);
        setTimeout(function() {
          setAux5(1);
        }, 5);
      
      });
      await firebase.database().ref('vagas/A3').on('value', (snapshot) => {
        
        setSensA3(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux3(0);
        setTimeout(function() {
          setAux3(1);
        }, 5);
      
      });
      await firebase.database().ref('vagas/A4').on('value', (snapshot) => {
        
        setSensA4(snapshot.val());  //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux4(0);
        setTimeout(function() {
          setAux4(1);
        }, 5);
      
      });
    }

    dados();
  }, []);


  if (sensA4 == 1 && validA4 == 1)
  {
    corA4 = 'red';
    corbotaoA4 = '#DE7171';
    textobotaoA4 = 'Esta vaga está validada';
  }
  else if (sensA4 == 0 && validA4 == 0)
  {
    corA4 = 'green';
    corbotaoA4 = '#6c68ff';
    textobotaoA4 = 'Validar vaga';
  }
  else if(sensA4 == 1 && validA4 == 0)
  {
    corA4 = 'yellow';
    corbotaoA4 = '#6c68ff';
    textobotaoA4 = 'Validar vaga';
  }
  else if(sensA4 == 0 && validA4 == 1)
  {
    corA4 = 'orange';
    corbotaoA4 = '#DE7171';
    textobotaoA4 = 'Esta vaga está validada';
  }






  if (sensA3 == 1 && validA3 == 1)
  {
    corA3 = 'red';
    corbotaoA3 = '#DE7171';
    textobotaoA3 = 'Esta vaga está validada';
  }
  else if (sensA3 == 0 && validA3 == 0)
  {
    corA3 = 'green';
    corbotaoA3 = '#6c68ff';
    textobotaoA3 = 'Validar vaga';
  }
  else if(sensA3 == 1 && validA3 == 0)
  {
    corA3 = 'yellow';
    corbotaoA3 = '#6c68ff';
    textobotaoA3 = 'Validar vaga';
  }
  else if(sensA3 == 0 && validA3 == 1)
  {
    corA3 = 'orange';
    corbotaoA3 = '#DE7171';
    textobotaoA3 = 'Esta vaga está validada';
  }





  if (sensA5 == 1 && validA5 == 1)
  {
    corA5 = 'red';
    corbotaoA5 = '#DE7171';
    textobotaoA5 = 'Esta vaga está validada';
  }
  else if (sensA5 == 0 && validA5 == 0)
  {
    corA5 = 'green';
    corbotaoA5 = '#6c68ff';
    textobotaoA5 = 'Validar vaga';
  }
  else if(sensA5 == 1 && validA5 == 0)
  {
    corA5 = 'yellow';
    corbotaoA5 = '#6c68ff';
    textobotaoA5 = 'Validar vaga';
  }
  else if(sensA5 == 0 && validA5 == 1)
  {
    corA5 = 'orange';
    corbotaoA5 = '#DE7171';
    textobotaoA5 = 'Esta vaga está validada';
  }

  //Código novo
if(userVal == 'A3')
  {
    textobotaoA3 = 'Você validou já esta vaga';
  }
else if(userVal == 'A4')
  {
    textobotaoA4 = 'Você validou já esta vaga';
  }
else if(userVal == 'A5')
  {
    textobotaoA5 = 'Você já validou esta vaga';
  }

  cor = [corA3, corA4, corA5];
  corbotao = [corbotaoA3, corbotaoA4, corbotaoA5];
  textobotao = [textobotaoA3, textobotaoA4, textobotaoA5];

  

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
            latitude: -22.257638590895496, 
            longitude: -45.703384120913576,
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
    
      place.id == 0 && aux3 == 1?  
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
    
    place.id == 1 && aux4 == 1?  
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
    
    place.id == 2 && aux5 == 1?  
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
        
        //Em todos os dois casos ele coloca o pincolor com o valor de 'color'. E o color varia conforme varia o sensA5 (linha 27)
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




