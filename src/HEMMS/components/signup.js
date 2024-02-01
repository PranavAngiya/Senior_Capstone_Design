import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function SignUp({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <Button title="Sign Up"/>

      <Text>Already have an account?</Text>
      <Button
        title="Log In"
        onPress={() => {
          navigation.navigate('Log In');
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
