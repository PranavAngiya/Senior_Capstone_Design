import { View, Text, ScrollView, Image, FlatList, ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Link } from "expo-router";

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import usStates from '../../constants/usStates';

const port = 5050
const url = "http://192.168.1.154:" + port

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    selectedState: ''
  });

  const [rateData, setRateData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRate();
  }, []);

  const fetchRate = async () => {
    try {
      const response = await fetch(`${url}/rates?state=New Jersey`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRateData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
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

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : rateData ? (
            <Text style={{ color: 'white', fontSize: 16 }}>
              Rate: {rateData}
            </Text>
          ) : (
            <Text style={{ color: 'white', fontSize: 16 }}>
              No rate found for the state
            </Text>
          )}

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
