import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function SignUp({navigation}) {
  return (
    <View style={styles.container}>
      <Text>*Create an account*</Text>
      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />

      <Text>Already have an account?</Text>
      <Button
        title="Log In"
        onPress={() => {
          navigation.navigate('Home');
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
