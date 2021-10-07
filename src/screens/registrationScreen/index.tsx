import React from 'react';
import { styles } from './styles';
import { Button, Text, TextInput, View, Image, Alert, Modal, Platform  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BotBig, BotLogin } from '../../components/registerButton';
import { Background } from '../../components/Background';
import auth from '@react-native-firebase/auth';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFonts, TitilliumWeb_300Light, TitilliumWeb_700Bold,TitilliumWeb_600SemiBold } from '@expo-google-fonts/titillium-web';
import firebase from '../../firebaseConnection';
import * as LocalAuthentication from "expo-local-authentication";
import { RectButton } from 'react-native-gesture-handler';
//import DeviceInfo from 'react-native-device-info';



export function RegistrationScreen({navigation}){
    
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [name, setName] = useState('')
        const [selectedOption, setSelectedOption] = useState('0');
        const [value, setValue] = useState(0);
        const [valueaux, setValueaux] = useState(0);
        
    const [isModalVisible, setIsModalVisible] = useState(false);

    async function pushMethod()
            {        
                firebase.database().ref('usuarios/valor').on('value', (snapshot) => {
                    setValue(snapshot.val());
                });
                
                const emailcompleto = email.replace('.','');
                
                const refer = firebase.database().ref('/users/'+ emailcompleto);
                refer
                    .set({
                        tipo: selectedOption,
                        valor: value,
                        email: email,
                        nome: name,
                        validacao: 0
                    })
                const reset = firebase.database().ref('usuarios');
                reset.set({
                    valor: value + 1
                })

            }


    async function createUser(){

        const hasPassword = await LocalAuthentication.isEnrolledAsync();
            if (!hasPassword) return;
            const { success, error } = await LocalAuthentication.authenticateAsync();
            if (success) 
            {
                    

                    await firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then( (value) => {
                        alert('Usuário criado com sucesso');
                        setValueaux(1);
                        pushMethod();

                        

                    })
                    .catch( (error) => {
                        setValueaux(0);
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

        

        Platform.OS === "ios" && createUser();
       
        
    }
    



    


    return(
        <View style={ styles.container }>
            

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

<View style={{backgroundColor: 'white', borderTopEndRadius: 40, borderTopStartRadius: 40,
height: 450}}>

<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
<MaterialIcons 
        name='person' 
        size={26} 
        color="grey"  />

            <TextInput
                style={styles.input}
                placeholder="Nome"
                onChangeText={texto => {
                    setName(texto)
                }}
                />
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
                style={styles.input}
                placeholder="Senha"
                onChangeText={texto => {
                    setPassword(texto)
                }}
                value={password}
                />

</View>
            
            <Picker 
                selectedValue={selectedOption}
                onValueChange={(itemValue, itemIndex) => 
                    setSelectedOption(itemValue)
                }
                style={{height:50, width: 150, marginLeft: 'auto', marginRight: 'auto'}}> 
                
                <Picker.Item label="Idoso" value="Idoso"/>
                <Picker.Item label="PCD" value="PCD"/>
                <Picker.Item label= "Selecionar" value='0'/>
            
            </Picker>



            <RectButton 
            style={{borderColor: '#FF11FF',
            borderWidth: 12,
            marginRight: 'auto',
            marginLeft: 'auto',
            height: 40,
            width: 200,
            backgroundColor: '#6c68ff',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10}}
            onPress={()=>{setIsModalVisible(true)}} 
        >
        <Text style={{fontSize: 17, color: 'white'}}>
            REGISTRAR
        </Text>
        </RectButton>


        
      
            <View style={styles.loginlink}>
                <Text style={styles.text}>
                    Já possui conta?
                </Text>


                <RectButton 
            style={{
            borderWidth: 0.5,
            borderColor: 'black',
            marginRight: 'auto',
            marginLeft: 10,
            height: 30,
            width: 70,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 1}}
            onPress={ () => navigation.navigate('Login')} 
        >
            <Text style ={{fontSize: 15}}>
            Entrar
            </Text>
        </RectButton>

            </View>

            </View>
    
        </View>
    );




    }