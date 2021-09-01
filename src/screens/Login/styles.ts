import React from 'react';
import { StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 200
    },
    icon: {
        marginLeft: 20,
        marginRight: 5,
        width: 100,
        height: 100
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
    title: {
        fontSize: 30,
        marginLeft: 12,
        marginRight: 'auto',
        fontWeight: 'bold'
    }
})