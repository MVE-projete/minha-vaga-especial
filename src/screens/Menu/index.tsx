import React, { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, Pressable, } from 'react-native';

import { AntDesign, FontAwesome5, Ionicons} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import { useFonts, 
    
  TitilliumWeb_300Light, 
  TitilliumWeb_700Bold,
  TitilliumWeb_600SemiBold,
  TitilliumWeb_400Regular,
  TitilliumWeb_900Black} from '@expo-google-fonts/titillium-web';
import { BotMenor } from '../../components/registerButton';
import firebase from '../../firebaseConnection'
import { RectButton } from 'react-native-gesture-handler';

export function Menu({navigation}) {
let tipoVaga;
  const email = firebase.auth().currentUser?.email?.replace('.','');
  firebase.database().ref('users/' + email + '/tipo').on('value', (snapshot) => {
    tipoVaga = snapshot.val();
  });

  
  async function logout(){

    /*navigation.dispatch( //Serve para resetar a navegação (se a pessoa deslogou, ela não pode voltar no menu)
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home'}
        ]
      })
    );
*/


    await firebase.auth().signOut(); //Ele só volta automatico pra tela de login no expo
    alert("Deslogado");

    setTimeout(function(){ 
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 1000);

    
    

  }

  return (
	
    <View style={styles.container}>

      <SafeAreaView>



     <TouchableOpacity style={styles.button}
     onPress={() => {
        if(tipoVaga == 'Idoso')
        {navigation.navigate('MapaVaga2')}
        else if(tipoVaga == 'PCD')
        {navigation.navigate('MapaVaga')}}}>
       

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
   style={styles.button2}>
      <Ionicons 
        name="information-circle" 
        size={28} 
        color="black" />

      <Text 
      style={styles.buttontext2}>
        Informações úteis
        </Text>

     </TouchableOpacity>

      <StatusBar 
      style="auto" />

      
        <Pressable 
            onPress={logout}
            style={{height: 40,
                width: 190,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                marginRight: 'auto',
                marginLeft: 'auto',
                marginTop: 160}}
        >
        <Text style={{fontSize: 20, color: 'black', fontFamily: 'TitilliumWeb_700Bold'}}>
                Sair
        </Text>
        </Pressable>


    
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
    backgroundColor: 'white',

},
  
  button:{
  	//justifyContent: 'space-between',
  	flexDirection: 'row', 
  	marginTop:80,
    justifyContent: 'center',
    alignItems: 'center',
    margin:40,
    backgroundColor: '#6c68ff',
    padding:40,
    borderWidth:3,
    borderColor:'#6c68ff',
    borderRadius:40,
    
},
button2:{
  flexDirection: 'row', 
  	marginTop:80,
    justifyContent: 'center',
    alignItems: 'center',
    margin:40,
    backgroundColor: 'white',
    padding:40,
    borderWidth:3,
    borderColor:'#6c68ff',
    borderRadius:40,

},
  buttontext:{
  color: 'white',
	fontSize: 28,
	paddingLeft: 10,
  fontFamily: 'TitilliumWeb_600SemiBold'
	
},
buttontext2:{
  color: '#6c68ff',
	fontSize: 28,
	paddingLeft: 10,
  fontFamily: 'TitilliumWeb_600SemiBold'
	
}
});