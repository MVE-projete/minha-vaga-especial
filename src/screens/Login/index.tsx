import React, { useState } from 'react';
import { View, TextInput, Image, Text, Modal, Alert, Platform, SafeAreaView } from 'react-native'

import { styles } from './styles';
import { BotMenor, BotPassworVis } from '../../components/registerButton';
import firebase from '../../../src/firebaseConnection';

import * as LocalAuthentication from "expo-local-authentication";

export function Login({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [passwordVisibility, setPasswordVisible] = useState(false);

    async function logar(){

        const hasPassword = await LocalAuthentication.isEnrolledAsync();
            if (!hasPassword) return;
            const { success, error } = await LocalAuthentication.authenticateAsync();
            if (success) 
            {
                
                await firebase.auth().signInWithEmailAndPassword(email, password)
                .then( (value) => {
                    //alert('Seja bem vindo!');
                    navigation.navigate('Menu')
                })
                .catch( (error) => {
                    alert('Algo deu errado!');
                    return;
                })
            } 
            
            else 
            {
            Alert.alert("A autenticação falhou. Por favor, digite sua senha!");
            }
            setIsModalVisible(false);



        
    }

    Platform.OS === "ios" && logar();

    return(
        <View>

            {Platform.OS === "android" && (
        <Modal
        
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onShow={logar}
          
        >
          
         
        </Modal>
      )}

            <View style={styles.header}>
                <Image
                    source={require('../../../assets/icon.png')}
                    style={styles.icon} />
                <Text style={styles.title}>
                    Minha Vaga {"\n"}
                    {`  `}Especial
                </Text>
            </View>

            <TextInput 

                style={styles.input}
                placeholder="E-mail"
                onChangeText={texto => {
                    setEmail(texto)
                }}
                value={email}
            
            />

            <TextInput
                secureTextEntry={passwordVisibility}
                style={styles.input}
                placeholder="Senha"
                onChangeText={texto => {
                    setPassword(texto)
                }}
                value={password}
            
            />

            <BotMenor
            title="Fazer login"
            onPress={()=>{setIsModalVisible(true)}}/>

            <BotPassworVis
            title="Mostrar senha"
            onPress={()=>{setPasswordVisible(!passwordVisibility)}}/>


            
        </View>

    )
}