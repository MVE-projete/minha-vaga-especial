import React from 'react';
import { View, Text, Button, Image } from 'react-native';

import { styles } from './styles';
import { BotBig, BotMenor } from '../../components/registerButton/';
import firebase from '../../../src/firebaseConnection';

export function Home({navigation}){

setTimeout(function() {
    
}, 1000);


    return(
        <View style={styles.container}>
            
            
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
            title="Registe-se"
            onPress={ () => navigation.navigate('RegistrationScreen')}/>
            <BotMenor
            title="Login" 
            onPress={ () =>firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    navigation.navigate('Menu');
                } 
                else{
                    navigation.navigate('Login');
                }
            })}/>
            
        </View>
    );
}