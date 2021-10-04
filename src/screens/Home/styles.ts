import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts, TitilliumWeb_300Light, TitilliumWeb_600SemiBold } from '@expo-google-fonts/titillium-web';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center'
        
    },
    icon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 80,
        borderRadius: 8,
        width: 250,
        height: 250,
        
    },
    title:{
        fontSize: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold'

    },
    subtitle:{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        fontSize: 23,
        fontFamily: 'TitilliumWeb_300Light'
        
    },
    subtitledois:{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 1,
        fontSize: 40,
        fontFamily: 'TitilliumWeb_700Bold'
        
    },
    regist: {
        borderColor: '#FF11FF',
        borderWidth: 12,
        marginRight: 'auto',
        marginLeft: 'auto',
        height: 45,
        width: 150,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
        
    },
    text: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb_600SemiBold'
    }
})

