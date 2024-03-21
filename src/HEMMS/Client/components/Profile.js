import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Device({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      
      <Button
          title="Devices"
          onPress={() => {
            navigation.navigate('Devices');
          }}
        />
        <Button
          title="Main"
          onPress={() => {
            navigation.navigate('Main');
          }}
        />
      <Button
          title="Notifications"
          onPress={() => {
            navigation.navigate('Notifications');
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