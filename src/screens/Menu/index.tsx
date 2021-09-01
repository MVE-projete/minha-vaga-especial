import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, } from 'react-native';

import { AntDesign, FontAwesome5, Ionicons} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { Botlogout } from '../../components/registerButton';
import firebase from '../../firebaseConnection'

export function Menu() {
  async function logout(){
    await firebase.auth().signOut();
    alert("Deslogado");

  }

  return (
	
    <View style={styles.container}>

      <SafeAreaView>
    
     <TouchableOpacity style={styles.button}>

	  <FontAwesome5 
        name="map-marked-alt" 
        size={26} 
        color="black"  />
	  <Text 
        style={styles.buttontext}>
          Buscar vaga
    </Text>

      </TouchableOpacity>
	 
	 <TouchableOpacity 
        style={styles.button}>

	    <AntDesign 
        name="checkcircle" 
        size={24} 
        color="black" />

      <Text 
      style={styles.buttontext}>
        Validar vaga
      </Text>

	 </TouchableOpacity>
	
	 <TouchableOpacity 
   style={styles.button}>
      <Ionicons 
        name="information-circle" 
        size={28} 
        color="black" />

      <Text 
      style={styles.buttontext}>
        Informações úteis
        </Text>

     </TouchableOpacity>

      <StatusBar 
      style="auto" />

      <Botlogout 
        onPress={logout}/>
    
      </SafeAreaView>
    </View>

    );
}
Menu.navigationOptions={
  title:'app'
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#5F9EA0',

},
  
  button:{
  	//justifyContent: 'space-between',
  	flexDirection: 'row', 
  	marginTop:80,
    justifyContent: 'center',
    alignItems: 'center',
    margin:15,
    backgroundColor: '#4682B4',
    padding:40,
    borderWidth:5,
    borderColor:'white',
    borderRadius:25,
    
},
  buttontext:{
  color: 'white',
	fontSize: 28,
	fontWeight: "bold",
	paddingLeft: 10,
	
}
});