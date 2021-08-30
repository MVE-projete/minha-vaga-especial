import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Menu } from './src/screens/Menu'
import { RegistrationScreen }  from './src/screens/registrationScreen/';
import { Home } from './src/screens/Home/';
import {Background} from './src/components/Background'
import {LinearGradient} from 'expo-linear-gradient';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './src/screens/Login';

const { Navigator, Screen } = createStackNavigator();


export default function App() {
  return (
    <LinearGradient
            style={{ flex: 1}}
            colors={['#931fff','#20f6fe']}
            start={[0,0]}
            end={[1,1]}>
          
            <NavigationContainer 
              theme={mainTheme}>
    <Navigator
            initialRouteName="Home"
            headerMode="none"
            screenOptions={{
              cardStyle:{
                  backgroundColor: 'transparent'
              }
          }}
            >
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="Menu"
                component={Menu}
            />
            <Screen 
                name="RegistrationScreen"
                component={RegistrationScreen}
            />
            <Screen 
                name="Login"
                component={Login}
            />
        </Navigator>
    
    </NavigationContainer>
        </LinearGradient>
    
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#B3E0FF',
  }
})

const mainTheme = { //Esta constante serve para colocar o background do navigation como transparente
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
}