import React, { useState } from 'react';
import { View, Text, Button, Image, Modal, Alert, Platform } from 'react-native';

import { styles } from './styles';
import { BotBig, BotMenor } from '../../components/registerButton/';
import firebase from '../../../src/firebaseConnection';
import * as LocalAuthentication from "expo-local-authentication";


export function Home({navigation}){

    const [isModalVisible, setIsModalVisible] = useState(false);


    async function logar(){

        const hasPassword = await LocalAuthentication.isEnrolledAsync();
            if (!hasPassword) return;
            const { success, error } = await LocalAuthentication.authenticateAsync();
            if (success) 
            {
                await firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    navigation.navigate('Menu');
                    //alert('Seja bem vindo!');
                } 
                else{
                    navigation.navigate('Login');
                }
            })   
            } 
            
            else 
            {
            Alert.alert("A autenticação falhou. Por favor, digite sua senha!");
            }
            setIsModalVisible(false);



        
    }




//setTimeout(function() {
    
//}, 1000);


    return(
        <View style={styles.container}>

            {Platform.OS === "android" && (
        <Modal
        
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onShow={logar}
          
        >
          
         
        </Modal>
      )}
            
            <Image 
            source={require('../../../assets/icon.png')}
            style={styles.icon}
            />
            
            <Text style={styles.subtitle}>
                Bem vindo(a) ao app 
            </Text>
            <Text style={styles.subtitledois}>
                MVE {'\n'}
            </Text>

            <BotBig
            title="Entrar" 
            onPress={()=>{setIsModalVisible(true)}}/>

            <BotMenor
            title="Registrar-se"
            onPress={ () => 
                navigation.navigate('RegistrationScreen')}/>
            
            
        </View>
    );
}