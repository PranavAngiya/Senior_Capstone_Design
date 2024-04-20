import { View, Image, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { router } from "expo-router";

import { icons, images } from "../../constants";
import InfoBox from "../../components/InfoBox";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import usStates from "../../constants/usStates";

const Profile = () => {
  const logout = async () => {
    router.replace("../sign-in");
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    // re call profile -> if any new data appeared
    setRefreshing(false);
  };
  const [form, setForm] = useState({
    username: '',
    newPassword: '',
    confirmNewPassword: '',
    selectedState: ''
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}>
        <View className="my-6 px-4 space-y-6">
          <View className="px-4 my-6">
            <Text className="text-2xl text-white font-psemibold">
              View Profile
            </Text>

            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={images.thumbnail}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title="User"
              containerStyle="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title="6"
                subtitle="Devices"
                titleStyles="text-xl"
              />
            </View>
          </View>

          <FormField
            title="Change Username"
            placeholder="Enter username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-8"
          />
          <FormField
            title="Change Password"
            placeholder="Enter password"
            value={form.newPassword}
            handleChangeText={(e) => setForm({ ...form, newPassword: e })}
            otherStyles="mt-6"
          />
          <FormField
            title="Confirm Password"
            placeholder="Enter password"
            value={form.confirmNewPassword}
            handleChangeText={(e) => setForm({ ...form, confirmNewPassword: e })}
            otherStyles="mt-6"
          />
          <FormField
            title="Change Place of Residence"
            placeholder="Select state"
            value={form.selectedState}
            handleChangeText={(e) => setForm({ ...form, selectedState: e })}
            otherStyles="mt-6"
            options={usStates.map(state => ({label: state.value, value: state.value}))}
          />

          <CustomButton
            title="Save Changes"
            handlePress={() => router.push('../sign-in')}
            containerStyles="mt-6"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
