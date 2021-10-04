import React, { useState } from 'react';
import { View, TextInput, Image, Text, Modal, Alert, Platform, SafeAreaView } from 'react-native'

import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles';
import { BotMenor, BotPassworVis } from '../../components/registerButton';
import firebase from '../../../src/firebaseConnection';
import { useFonts, TitilliumWeb_300Light, TitilliumWeb_700Bold,TitilliumWeb_600SemiBold } from '@expo-google-fonts/titillium-web'

import * as LocalAuthentication from "expo-local-authentication";
import { RectButton } from 'react-native-gesture-handler';

export function Login({navigation}){

        let corLinha = 'black';
    let [fontsLoaded] = useFonts({
        TitilliumWeb_300Light,
        TitilliumWeb_700Bold,
        TitilliumWeb_600SemiBold
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [passwordVisibility, setPasswordVisible] = useState(true);

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
        <View style={{flex: 1, backgroundColor: 'white'}}>

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
                <Text style={{fontFamily:'TitilliumWeb_600SemiBold', fontSize: 35 }}>
                    Entrar
                </Text>
                
            </View>

            

<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
<MaterialIcons 
        name='alternate-email' 
        size={26} 
        color="grey"  />
            <TextInput 

                style={styles.input}
                placeholder="E-mail"
                onChangeText={texto => {
                    setEmail(texto)
                }}
                value={email}
            
            />
</View>

<View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>

<MaterialIcons 
        name='lock' 
        size={26} 
        color="grey"  />
            <TextInput
                secureTextEntry={passwordVisibility}
                onFocus={()=> { corLinha = '#6c68ff'}}
                style={styles.input}
                placeholder="Senha"
                onChangeText={texto => {
                    setPassword(texto)
                }}
                value={password}
            
            />
</View>

        <RectButton 
            onPress={()=>{setIsModalVisible(true)}}
            style={{height: 40,
                width: 200,
                backgroundColor: '#6c68ff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                marginRight: 'auto',
                marginLeft: 'auto',
                marginTop: 20}}
        >
        <Text style={{fontSize: 15, color: 'white'}}>
                LOGIN
        </Text>
        </RectButton>



            <BotPassworVis
            title="Mostrar senha"
            onPress={()=>{setPasswordVisible(!passwordVisibility)}}/>


            
        </View>

    )
}
