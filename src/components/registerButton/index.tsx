import React from 'react';
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { styles } from './styles'


export function BotRegist({...rest}: RectButtonProps ){
    return(
        <RectButton 
            style={styles.regist}
            {...rest}
        >
        <Text style={styles.text}>
            Registrar
        </Text>
        </RectButton>
    );
}

export function BotLogin({...rest}: RectButtonProps ){
    return(
        <RectButton 
            style={styles.login}
            {...rest}
        >
        <Text style={styles.text2}>
            Faça Login.
        </Text>
        </RectButton>
    );
}

export function BotHome({...rest}: RectButtonProps){
    return(
        <RectButton 
        
            style={styles.regist}
            
            {...rest}
        >
        <Text style={styles.text2}>
            Registre-se 
        </Text>
        </RectButton>
    );
}

export function BotLoginSegundo({...rest}: RectButtonProps ){
    return(
        <RectButton 
            style={styles.loginsegundo}
            {...rest}
        >
        <Text style={styles.text2}>
            Login
        </Text>
        </RectButton>
    );
}

export function Botlogout({...rest}: RectButtonProps ){
    return(
        <RectButton 
            style={styles.loginsegundo}
            {...rest}
        >
        <Text style={styles.text2}>
            Deslogar
        </Text>
        </RectButton>
    );
}