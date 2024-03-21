import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Device({navigation}) {
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Lrname, setLrname] = useState('');
  const [Place, setPlace] = useState('');
  const HandleSignUp = () => {
    if (Fname === 'example' && Lname === 'password') {
      navigation.navigate('Home');
    } else {
      alert('Invalid');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      
      <Button
          title="Devices"
          onPress={() => {
            navigation.navigate('Devices'); // Navigate to 'Devices' screen
          }}
        />
        <Button
          title="Main"
          onPress={() => {
            navigation.navigate('Main'); // Navigate to 'Devices' screen
          }}
        />
      <Button
          title="Notifications"
          onPress={() => {
            navigation.navigate('Notifications'); // Navigate to 'Devices' screen
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