import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
    Platform,
    Button
    } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export function Touchid({navigation}) {

        const [isModalVisible, setIsModalVisible] = useState(false);

        async function authenticate() {
            const hasPassword = await LocalAuthentication.isEnrolledAsync();
            if (!hasPassword) return;
            const { success, error } = await LocalAuthentication.authenticateAsync();
            if (success) 
            {
            Alert.alert("Bem vindo!");
            } 
            else 
            {
            Alert.alert("A autenticação falhou. Por favor, digite sua senha!");
            }
            setIsModalVisible(false);
        }


    Platform.OS === "ios" && authenticate();

  return (
    <SafeAreaView style={styles.container}>
     
      
      {Platform.OS === "android" && (
        <Modal
        
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onShow={authenticate}
          
        >
          
         
        </Modal>
      )}
      <Text style={styles.titulo} >Bem vindo!</Text>
      <Button 
        onPress = {()=>{setIsModalVisible(true)}} 
        title="Autentique-se"
        />
      
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#7159c1",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#7159c1",
    backgroundColor: "#7159c1",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#333",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "40%"
  },
  cancelText: {
    color: "red",
    fontSize: 16
  },
  authText: {
    color: "white",
    fontSize: 16
  },
  titulo:{
    fontSize:20,
    color: 'white',
    justifyContent: "center",
    alignItems: "center",
    marginTop:0,
    padding:40,
   paddingRight: 40,
    fontWeight: "bold",
  },
});