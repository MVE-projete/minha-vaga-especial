import React from 'react';
import { styles } from './styles';
import { Button, Text, TextInput, View, Image, Alert, Modal, Platform  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BotBig, BotLogin } from '../../components/registerButton';
import { Background } from '../../components/Background';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import firebase from '../../firebaseConnection';
import * as LocalAuthentication from "expo-local-authentication";
//import DeviceInfo from 'react-native-device-info';



export function RegistrationScreen({navigation}){
    
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [name, setName] = useState('')
        const [selectedOption, setSelectedOption] = useState();
        const [value, setValue] = useState();
        const [valueaux, setValueaux] = useState();
        
    const [isModalVisible, setIsModalVisible] = useState(false);


    async function createUser(){

        const hasPassword = await LocalAuthentication.isEnrolledAsync();
            if (!hasPassword) return;
            const { success, error } = await LocalAuthentication.authenticateAsync();
            if (success) 
            {
                    

                    await firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then( (value) => {
                        alert('Usuário criado com sucesso');

                        

                    })
                    .catch( (error) => {
                        if(error.code === 'auth/weak-password')
                        {
                            alert('A senha deve conter pelo menos 6 caracteres');
                        }
                        if(error.code === 'auth/invalid-email')
                        {
                            alert('Email inválido');
                        }
                        else{
                            alert('Algo deu errado');
                        }
                    })
                }

                else
                {
                    Alert.alert("Autenticação falhou, digite sua senha")
                }

                setIsModalVisible(false);

                
        firebase.database().ref('users').once('child_added', (snapshot) => {
            setValue(snapshot.val().valor + 1);
            alert(value);
        });
        
        console.log(value)
        const refer = firebase.database().ref('/users/'+ value);
        refer
            .set({
                tipo: selectedOption,
                valor: value
            })

        let fc = refer.key;
        alert(fc);

        Platform.OS === "ios" && createUser();
        
    }
    



    


    return(
        <View style={ styles.container }>
            
{alert('Prezado Usuário(a): caso já possua conta no aplicativo MVE, pressione o botão "Entrar"')}
            {Platform.OS === "android" && (
        <Modal
        
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onShow={createUser}
          
        >
          
         
        </Modal>
      )}
            
            <Image 
            source={require('../../../assets/icon.png')}
            style={styles.icon}
            />

            <Text style={styles.title}>
                Cadastre-se
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                onChangeText={texto => {
                    setName(texto)
                }}
                />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                onChangeText={texto => {
                    setEmail(texto)
                }}
                value={email}
                />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={texto => {
                    setPassword(texto)
                }}
                value={password}
                />
            
            <Picker 
                selectedValue={selectedOption}
                onValueChange={(itemValue, itemIndex) => 
                    setSelectedOption(itemValue)
                }
                style={{height:50, width: 150, marginLeft: 'auto', marginRight: 'auto'}}> 
                
                <Picker.Item label="Idoso" value="Idoso"/>
                <Picker.Item label="PCD" value="PCD"/>
            </Picker>

            <BotBig
            title="Registrar"
            onPress={()=>{setIsModalVisible(true)}} />
            <View style={styles.loginlink}>
                <Text style={styles.text}>
                    Já possui conta?
                </Text>
                <BotLogin 
                onPress={ () => navigation.navigate('Login')}/>
            </View>

            
    
        </View>
    );




    }