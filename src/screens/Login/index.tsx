import React, { useState } from 'react';
import { View, TextInput, Image, Text} from 'react-native'

import { styles } from './styles';
import { BotMenor } from '../../components/registerButton';
import firebase from '../../../src/firebaseConnection';

export function Login({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function logar(){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( (value) => {
            alert('Seja bem vindo!');
            navigation.navigate('Menu')
        })
        .catch( (error) => {
            alert('Algo deu errado!');
            return;
        })
    }

    return(
        <View>
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
                style={styles.input}
                placeholder="Senha"
                onChangeText={texto => {
                    setPassword(texto)
                }}
                value={password}
            
            />

            <BotMenor
            title="Fazer login"
            onPress={logar}/>

        </View>

    )
}