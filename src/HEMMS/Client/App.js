import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from './components/Sign_Up';
import Main from './components/Main';
import Device from './components/Device';
import Profile from './components/Profile';
import Notification from './components/Notifications';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Main" component={Main} />
          <Tab.Screen name="Devices" component={Device} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Notifications" component={Notification} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function HomeScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const HandleLogIn = () => {
    if (username === 'example' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to H.E.M.M.S.!</Text>
      <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
      />
      <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
      />
      <Button
        title="Log In"
        onPress={HandleLogIn}
      />
      <Text>Don't have an account?</Text>
      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate('Sign Up');
        }}
      />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:10,
    marginBottom:10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth:1,
    marginVertical:10,
    paddingHorizontal:10,
  },
});
