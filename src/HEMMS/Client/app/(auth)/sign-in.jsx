import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { url } from '../../connection';

// const port = 5050
// const url = "http://192.168.1.154:" + port

const SignIn = () => {
  const [form, setform] = useState({
    username: '',
    password: ''
  })

  const handleLogin = () => {
    fetchurl = url +'/signin?username='+ form.username +'&password=' + form.password;
    fetch(fetchurl)
    .then(response => {
      if (response.ok) {
        router.push('/home');
      } else if (response.status === 400) {
        Alert.alert('Error', 'Invalid username or password');
      }
      else {
        Alert.alert('Error', 'Failed to Sign in');
      }
    })
    .catch(error => {
      Alert.alert("Network Error", "Failed to connect to the server");
    });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to HEMMS
          </Text>

          <FormField
            title="Username"
            placeholder="Enter username"
            value={form.username}
            handleChangeText={(e) => setform({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Password"
            placeholder="Enter password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            // handlePress={handleLogin}
            handlePress={() => router.push('/home')}
            containerStyles="mt-7"
          />

          <View className="justify-center pd-5 flex-row gap-2 mt-6">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>

            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;
