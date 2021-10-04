import React, { useState } from 'react';
import { View, Text, Button, Image, Modal, Alert, Platform } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { styles } from './styles';
import { BotBig, BotMenor } from '../../components/registerButton/';
import firebase from '../../../src/firebaseConnection';
import * as LocalAuthentication from "expo-local-authentication";
import { useFonts, TitilliumWeb_300Light, TitilliumWeb_700Bold,TitilliumWeb_600SemiBold } from '@expo-google-fonts/titillium-web'
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

export function Home({navigation}){

    let [fontsLoaded] = useFonts({
        TitilliumWeb_300Light,
        TitilliumWeb_700Bold,
        TitilliumWeb_600SemiBold
    });

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

if(!fontsLoaded){

    return <AppLoading />;
}
else{
    return(
        <View style={styles.container}>
            <StatusBar 
                hidden={true}/>

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



            <RectButton 
            style={styles.regist}
            onPress={()=>{setIsModalVisible(true)}}
            
        >
        <Text style={styles.text}>
            Entrar
        </Text>
        </RectButton>

        <View style ={{flexDirection: 'row'}}>

        <View 
            style={{
                borderBottomColor: 'white',
                borderBottomWidth: 0.5,
                marginTop: 15,
                width: 150,
                marginRight:'auto',
                marginLeft: 'auto'
            }}
        />

        <View 
            style={{
                borderBottomColor: 'white',
                borderBottomWidth: 0.5,
                marginTop: 15,
                width: 150,
                marginRight:'auto',
                marginLeft: 'auto'
            }}
        />
</View>



        <RectButton 
            onPress={ () => 
                navigation.navigate('RegistrationScreen')}
            style={{
                height: 30,
                width: 400,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                marginRight: 'auto',
                marginLeft: 'auto',
                marginTop: 10}}
        >
        <Text style={{fontSize: 15,color: 'white', fontFamily: 'TitilliumWeb_300Light'}}>
            Não possui uma conta? Registre-se
        </Text>
        </RectButton>




        </View>
    );
}
    
}