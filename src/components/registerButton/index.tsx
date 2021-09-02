import React from 'react';
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { styles } from './styles'

type Props = RectButtonProps & {
    title: string;
}

export function BotBig({title, ...rest}: RectButtonProps ){
    return(
        <RectButton 
            style={styles.regist}
            {...rest}
        >
        <Text style={styles.text}>
            { title }
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


export function BotMenor({title, ...rest}: RectButtonProps ){
    return(
        <RectButton 
            style={styles.loginsegundo}
            {...rest}
        >
        <Text style={styles.text2}>
            { title }
        </Text>
        </RectButton>
    );
}
