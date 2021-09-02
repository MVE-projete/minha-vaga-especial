import React from 'react';
import { styles } from './styles';
import { Button, Text, TextInput, View, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BotBig, BotLogin } from '../../components/registerButton';
import { Background } from '../../components/Background';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import firebase from '../../firebaseConnection'



export function RegistrationScreen({navigation}){
    
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
    
  

    async function createUser(){
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
    



    


    return(
        <View style={ styles.container }>
            
            
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
            

            <BotBig
            title="Registrar"
            onPress={createUser} />
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