import { View, Text, ScrollView, Image, FlatList, ActivityIndicator, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Link } from "expo-router";

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import usStates from '../../constants/usStates';
import { url } from '../../connection';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    selectedState: ''
  });

  const handleSignup = () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    fetch(url + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        selectedState: form.selectedState
      }),
    })
    .then(response => {
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully');
        router.push('sign-in');
      } else if (response.status === 400) {
        Alert.alert('Error', 'Username already exists');
      }
      else {
        Alert.alert('Error', 'Failed to create account');
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
            Sign up to HEMMS
          </Text>

          <FormField
            title="Username"
            placeholder="Enter username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Password"
            placeholder="Enter password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Confirm Password"
            placeholder="Enter password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Place of Residence"
            placeholder="Select state"
            value={form.selectedState}
            handleChangeText={(e) => setForm({ ...form, selectedState: e })}
            otherStyles="mt-7"
            options={usStates.map(state => ({label: state.value, value: state.value}))}
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSignup}
            containerStyles="mt-7"
          />

          <View className="justify-center pd-5 flex-row gap-2 mt-6">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>

            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
