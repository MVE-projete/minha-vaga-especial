import React from 'react';
import { StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        height: 300,
        width: 500
    },
    icon: {
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 200,
        height: 200
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 2,
        height: 56,
        borderRadius: 8,
        marginTop: 18,
        marginLeft: 15,
        marginRight: 25,
        paddingLeft: 10,
        fontSize: 20,
        borderBottomWidth: 0.7,
         width: 300,
    },
    title: {
        fontSize: 30,
        marginLeft: 12,
        marginRight: 'auto',
        fontFamily: 'TitilliumWeb_700Bold'
    }
})