import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { styles } from './styles';
import {Background} from '../../components/Background'
// import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { FontAwesome } from '@expo/vector-icons';
import {BotHome, BotLoginSegundo} from '../../components/registerButton/';
import firebase from '../../../src/firebaseConnection';

export function Home({navigation}){


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

            <BotHome 
            onPress={ () => navigation.navigate('RegistrationScreen')}/>
            <BotLoginSegundo 
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