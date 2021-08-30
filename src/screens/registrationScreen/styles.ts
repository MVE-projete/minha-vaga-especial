import React from 'react';
import { StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    container: {
       
        flex: 1,
        
        justifyContent: 'center',
        //alignItems: 'center',
        
    },
    icon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 200,
        height: 200
        
    },
    input: {
        backgroundColor: 'white',
        height: 56,
        borderRadius: 8,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        fontSize: 20
    },
    text: {
        alignItems: 'center',
        marginLeft: 'auto',
    },
    loginlink: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    title: {
        fontSize: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold'
    }
})