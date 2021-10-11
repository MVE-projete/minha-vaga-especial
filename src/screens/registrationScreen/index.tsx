import React from 'react';
import { styles } from './styles';
import {  Text, TextInput, View, Image, Alert, Platform, Pressable  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import firebase from '../../firebaseConnection';
import * as LocalAuthentication from "expo-local-authentication";
import { RectButton } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';



export function RegistrationScreen({navigation}){
        const [senha, setSenha] = useState();
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [name, setName] = useState('')
        const [selectedOption, setSelectedOption] = useState('0');
        const [value, setValue] = useState(0);
        const [valueaux, setValueaux] = useState(0);
        const [isModalVisible2, setIsModalVisible2] = useState(true);
        
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
                <View>
                    <StatusBar
      hidden={true} />
        <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
          transparent={true}
          isVisible={isModalVisible2}
        >

            <View style={{height: 250, 
                width: 300, 
                backgroundColor: 'white', 
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 20,
                marginTop: 'auto',
                marginBottom: 'auto'}}>
                <Text style={{
                        marginLeft: 10,
                        marginRight: 'auto',
                        fontSize: 20,
                        marginBottom: 10,
                        marginTop: 10
                }}>
                    O cadastro de um novo usuário requer a presença
                    de um agente de trânsito. 
                </Text>
                
                <TextInput
                    style={{marginLeft: 10, paddingLeft: 7, borderBottomColor: 'black', borderBottomWidth: 0.5, borderRadius: 5, marginRight: 20, height: 40}}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={texto => {
                        setSenha(texto)
                    }}/>
                <Pressable style={{marginLeft: 'auto', marginRight:'auto', marginTop: 30, backgroundColor: '#6c68ff', width: 100, height: 30, borderRadius: 8}}
                    onPress={() => {if(senha == 'senha')
                    {
                        setIsModalVisible2(!isModalVisible2)
                    }
                    else
                    {
                        alert('Senha incorreta!')
                    }}}>
                        <Text style={{color: 'white', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
                            CONFIRMAR
                        </Text>
                    </Pressable>

                    


                    <Pressable style={{marginLeft: 'auto', marginRight:'auto',borderColor: '#6c68ff', borderWidth: 1, marginTop: 12, backgroundColor: 'white', width: 100, height: 30, borderRadius: 8}}
                    onPress={() => {
                            setIsModalVisible2(!isModalVisible2)
                            
                            setTimeout(()=>{navigation.navigate("Home")},300)}
                            }>
                        <Text style={{color: 'black', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
                            VOLTAR
                        </Text>
                    </Pressable>



            </View>
          
         
        </Modal>
        </View>
      )}

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