import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from './components/login';
import SignUp from './components/signup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Log In" component={LogIn} options={{ headerShown: true }}/>
        <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome to H.E.M.M.S.!</Text>

      <Text>Already have an account?</Text>
      <Button
        title="Log In"
        onPress={() => {
          navigation.navigate('Log In');
        }}
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
});
