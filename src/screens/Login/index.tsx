import React, { useState } from 'react';
import { View, TextInput, Image, Text, Modal, Alert, Platform, SafeAreaView } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
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
    const [x, setX] = useState(2);
let v = 1;

    async function logar(){

        const hasPassword = await LocalAuthentication.isEnrolledAsync();
            if (!hasPassword) return;
            const { success, error } = await LocalAuthentication.authenticateAsync();
            if (success) 
            {
                
                await firebase.auth().signInWithEmailAndPassword(email, password)
                .then( (value) => {
                    //alert('Seja bem vindo!');
                    navigation.navigate('Menu');
                  
                    
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
        <LinearGradient
            style={{ flex: 1,}}
            colors={['#931fff','#20f6fe']}
            start={[1,0]}
            end={[0,1]}
            >
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
                    style={styles.icon} />
                <Text style={{fontFamily:'TitilliumWeb_600SemiBold', fontSize: 35, color: 'white', marginLeft: 'auto', marginRight: 'auto', marginBottom: 19 }}>
                    Login
                </Text>
                
            


<View style={{backgroundColor: 'white', height: 700, borderTopEndRadius: 40, borderTopStartRadius: 40, borderBottomStartRadius: 40, borderBottomEndRadius: 40}}>

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
                marginTop: 40}}
        >
        <Text style={{fontSize: 18, color: 'white'}}>
                ENTRAR
        </Text>
        </RectButton>



            <BotPassworVis
            title="Mostrar senha"
            onPress={()=>{setPasswordVisible(!passwordVisibility)}}/>

</View>

            
</LinearGradient>

    )
}
