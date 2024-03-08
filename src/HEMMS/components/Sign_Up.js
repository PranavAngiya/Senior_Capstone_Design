import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function SignUp({navigation}) {
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const HandleSignUp = () => {
    if (Fname === 'example' && Lname === 'password') {
      navigation.navigate('Home');
    } else {
      alert('Invalid');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create an Account!</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFname(text)}
        value={Fname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setLname(text)}
        value={Lname}
        secureTextEntry={true}
      />
      <Button
        title="Create Account"
        onPress={HandleSignUp}
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
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth:1,
    marginVertical:10,
    paddingHorizontal:10,
  },
})
