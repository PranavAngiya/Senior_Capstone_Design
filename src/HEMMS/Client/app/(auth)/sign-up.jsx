import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignUp = () => {
  const [form, setform] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    placeOfResidence: '',
  })

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to HEMMS</Text>

          <FormField
            title="Username"
            placeholder={form.username}
            handleChangeText={(e) => setform({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Password"
            placeholder={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Confirm Password"
            placeholder={form.confirmPassword}
            handleChangeText={(e) => setform({ ...form, ConfirmPassword: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Place of Residence"
            placeholder={form.placeOfResidence}
            handleChangeText={(e) => setform({ ...form, placeOfResidence: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={() => router.push('/home')}
            containerStyles="mt-7"
          />

          <View className="justify-center pd-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;
