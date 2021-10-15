import MapView from 'react-native-maps'; //IDOSO
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
        codigo: 'B001' //ESTA VAGA FUNCIONA COM O SENSOR 
      },
      {
        id: 1,
        rua: 'Lorêto García',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.25624494403089, 
        longitude: -45.702733423060245,
        codigo: 'B002',
      },
      {
        id: 2,
        rua: 'João Bernardes',
        bairro: 'Centro',
        description: 'Estacionamento Unissul',
        latitude: -22.257077288363266, 
        longitude:  -45.70224044657601,
        codigo: 'B003', 
      }
    ],
      
  };

  let textobotao;

  let textobotaoB001;
  let textobotaoB002;
  let textobotaoB003;

  let corbotao;

  let corbotaoB001;
  let corbotaoB002;
  let corbotaoB003;

  let corB001;
  let corB002;
  let corB003;

  let place2 = 0;
  
  const [validB001, setValidB001] = useState(0);
  const [validB002, setValidB002] = useState(0);
  const [validB003, setValidB003] = useState(0);

  const [sensB001, setSensB001] = useState();
  const [sensB002, setSensB002] = useState();
  const [sensB003, setSensB003] = useState();

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

    
    if(validB003 == undefined)
    {
      firebase.database().ref('verificacao/B003').on('value', (snapshot) => {
        setValidB003(snapshot.val());
      });
      firebase.database().ref('verificacao/B001').on('value', (snapshot) => {
        setValidB001(snapshot.val());
      });
      firebase.database().ref('verificacao/B002').on('value', (snapshot) => {
        setValidB002(snapshot.val());
      });
      firebase.database().ref('users/' + email +'/validacao').on('value', (snapshot) => {
        setUserVal(snapshot.val());
      });
    }


}


function unvalid(){

  if(vaga == 'B003')

  {firebase.database().ref('verificacao').update({
    B003: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  firebase.database().ref('info/B003').update({
    email: '',
    tipo: ''
  })
setUserVal('0')
setValidB003(0)
setAux5(0);
setTimeout(function() {
  setAux5(1);
}, 10);}
  
  


  else if(vaga == 'B001')

  {firebase.database().ref('verificacao').update({
    B001: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  firebase.database().ref('info/B001').update({
    email: '',
    tipo: ''
  })
  setUserVal('0')
  setValidB001(0)
  setAux3(0);
  setTimeout(function() {
    setAux3(1);
  }, 10);
  
  
}

  else if(vaga == 'B002')
  {firebase.database().ref('verificacao').update({
    B002: 0,
  })
  firebase.database().ref('users/' + email ).update({
    validacao: 0,
  })
  firebase.database().ref('info/B002').update({
    email: '',
    tipo: ''
  })
  setUserVal('0')
  setValidB002(0)
  setAux4(0);
  setTimeout(function() {
    setAux4(1);
  }, 10);}

}





  function valid(){

    if(vaga == 'B003')

    {
                    if(validB003 == 0)
                  {
                    if(sensB003 == 1)

                      {firebase.database().ref('verificacao').update({
                        B003: 1,
                      })
                      firebase.database().ref('users/' + email ).update({
                        validacao: 'B003',
                      })
                      firebase.database().ref('info/B003').update({
                        email: email,
                        tipo: tipoVaga
                      })
                      alert("Validação feita com sucesso");
                      setValidB003(1);
                      setTimeout(function(){ toggleModal(); }, 1000);
                      setUserVal('B003');}
                      else{
                        alert("Caro usuário(a): Por questões de segurança, estacione seu veículo primeiro, e depois valida a vaga")
                      }
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

        else if (vaga == 'B001')
        {


          if(validB001 == 0)
                  {
                    if(sensB001 == 1)

                    {  firebase.database().ref('verificacao').update({
                        B001: 1,
                      })
                      firebase.database().ref('users/' + email ).update({
                        validacao: 'B001',
                      })
                      firebase.database().ref('info/B001').update({
                        email: email,
                        tipo: tipoVaga
                      })
                      alert("Validação feita com sucesso");
                      setUserVal('B001');
                      setValidB001(1);
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
                  setAux3(0);
                      setTimeout(function() {
                        setAux3(1);
                      }, 10);
              

          
          

        }
        else if(vaga == 'B002')
        {


          if(validB002 == 0)
          {
            if(sensB002 == 1)
              {firebase.database().ref('verificacao').update({
                B002: 1,
              })
              firebase.database().ref('users/' + email ).update({
                validacao: 'B002',
              })
              firebase.database().ref('info/B002').update({
                email: email,
                tipo: tipoVaga
              })
              alert("Validação feita com sucesso");
              setUserVal('B002');
              setValidB002(1);
              setTimeout(function(){ toggleModal(); }, 1000);}
              else{
                alert("Caro usuário(a): Por questões de segurança, estacione seu veículo primeiro, e depois valida a vaga")
              }
            
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

  useEffect(() => { //Função pra puxar o valor do sensor do firebase (armazenada na variável 'sensB003')

    async function dados(){
      await firebase.database().ref('vagas/B003').on('value', (snapshot) => {
        
        setSensB003(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux5(0);
        setTimeout(function() {
          setAux5(1);
        }, 5);
      
      });
      await firebase.database().ref('sensor').on('value', (snapshot) => {
        
        setSensB001(snapshot.val()); //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux3(0);
        setTimeout(function() {
          setAux3(1);
        }, 5);
      
      });
      await firebase.database().ref('vagas/B002').on('value', (snapshot) => {
        
        setSensB002(snapshot.val());  //cada vez que o valor do sensor mudar, ele dá um delay, tira o pino, e coloca de novo
        setAux4(0);
        setTimeout(function() {
          setAux4(1);
        }, 5);
      
      });
    }

    dados();
  }, []);


  if (sensB002 == 1 && validB002 == 1)
  {
    corB002 = 'red';
    corbotaoB002 = '#DE7171';
    textobotaoB002 = 'Esta vaga está validada';
  }
  else if (sensB002 == 0 && validB002 == 0)
  {
    corB002 = 'green';
    corbotaoB002 = '#6c68ff';
    textobotaoB002 = 'Validar vaga';
  }
  else if(sensB002 == 1 && validB002 == 0)
  {
    corB002 = 'yellow';
    corbotaoB002 = '#6c68ff';
    textobotaoB002 = 'Validar vaga';
  }
  else if(sensB002 == 0 && validB002 == 1)
  {
    corB002 = 'orange';
    corbotaoB002 = '#DE7171';
    textobotaoB002 = 'Esta vaga está validada';
  }






  if (sensB001 == 1 && validB001 == 1)
  {
    corB001 = 'red';
    corbotaoB001 = '#DE7171';
    textobotaoB001 = 'Esta vaga está validada';
  }
  else if (sensB001 == 0 && validB001 == 0)
  {
    corB001 = 'green';
    corbotaoB001 = '#6c68ff';
    textobotaoB001 = 'Validar vaga';
  }
  else if(sensB001 == 1 && validB001 == 0)
  {
    corB001 = 'yellow';
    corbotaoB001 = '#6c68ff';
    textobotaoB001 = 'Validar vaga';
  }
  else if(sensB001 == 0 && validB001 == 1)
  {
    corB001 = 'orange';
    corbotaoB001 = '#DE7171';
    textobotaoB001 = 'Esta vaga está validada';
  }





  if (sensB003 == 1 && validB003 == 1)
  {
    corB003 = 'red';
    corbotaoB003 = '#DE7171';
    textobotaoB003 = 'Esta vaga está validada';
  }
  else if (sensB003 == 0 && validB003 == 0)
  {
    corB003 = 'green';
    corbotaoB003 = '#6c68ff';
    textobotaoB003 = 'Validar vaga';
  }
  else if(sensB003 == 1 && validB003 == 0)
  {
    corB003 = 'yellow';
    corbotaoB003 = '#6c68ff';
    textobotaoB003 = 'Validar vaga';
  }
  else if(sensB003 == 0 && validB003 == 1)
  {
    corB003 = 'orange';
    corbotaoB003 = '#DE7171';
    textobotaoB003 = 'Esta vaga está validada';
  }

  //Código novo
if(userVal == 'B001')
  {
    textobotaoB001 = 'Você validou já esta vaga';
  }
else if(userVal == 'B002')
  {
    textobotaoB002 = 'Você validou já esta vaga';
  }
else if(userVal == 'B003')
  {
    textobotaoB003 = 'Você já validou esta vaga';
  }

  cor = [corB001, corB002, corB003];
  corbotao = [corbotaoB001, corbotaoB002, corbotaoB003];
  textobotao = [textobotaoB001, textobotaoB002, textobotaoB003];

  

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
        
        //Em todos os dois casos ele coloca o pincolor com o valor de 'color'. E o color varia conforme varia o sensB003 (linha 27)
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




