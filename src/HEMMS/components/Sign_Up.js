import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function SignUp({navigation}) {
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Lrname, setLrname] = useState('');
  const [Place, setPlace] = useState('');
  const HandleSignUp = () => {
    if (Fname === 'example' && Lname === 'password' && Lrname === 'password' && Place === 'random') {
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
        placeholder="Email"
        onChangeText={text => setFname(text)}
        value={Fname}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setLname(text)}
        value={Lname}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={text => setLrname(text)}
        value={Lrname}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Place of Residency"
        onChangeText={text => setPlace(text)}
        value={Place}
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
