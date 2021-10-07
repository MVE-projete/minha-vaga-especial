import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Menu } from './src/screens/Menu'
import { Home } from './src/screens/Home/';
import { Login } from './src/screens/Login';
import { RegistrationScreen }  from './src/screens/registrationScreen/';
import { MapaVaga } from './src/screens/MapaVaga';
import { MapaVaga2 } from './src/screens/MapaVaga2';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Touchid } from './src/screens/Touchid';

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
            <Screen
                name="MapaVaga"
                component={MapaVaga}
            />
            <Screen 
                name="Touchid"
                component={Touchid}
            />
            <Screen 
                name="MapaVaga2"
                component={MapaVaga2}
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