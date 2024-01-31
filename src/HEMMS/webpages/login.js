import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function Login(){
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button
                title="Login"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:10,
        marginTop:10,

    },
})