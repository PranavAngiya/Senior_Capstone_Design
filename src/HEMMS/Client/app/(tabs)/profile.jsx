import { View, Image, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { router } from "expo-router";

import { icons, images } from "../../constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const logout = async () => {
    router.replace("../sign-in");
  };

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    // re call graph -> if any new data appeared
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image source={icons.logout} className="w-6 h-6" resizeMode='contain'/>
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image source={images.thumbnail} className="w-[90%] h-[90%] rounded-lg" resizeMode='cover'/>
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
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Profile;
