import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function LogIn({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Log In</Text>
      <Button title="Log In"/>

      <Text>Don't have an account?</Text>
      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate('Sign Up');
        }}
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
