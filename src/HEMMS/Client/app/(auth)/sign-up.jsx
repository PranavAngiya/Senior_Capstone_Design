import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Link } from "expo-router";

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import usStates from '../../constants/usStates';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    selectedState: ''
  });

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
            handlePress={() => router.push('/home')}
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
