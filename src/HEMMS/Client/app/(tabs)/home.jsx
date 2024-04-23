import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Dimensions } from 'react-native';

import { images } from '../../constants';
import LineChart from '../../components/LineChart';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    // re call graph -> if any new data appeared
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  User
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logo}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="w-full flex-1 pt-5 pb-8 justify-center items-center px-4">
              <Text className="text-xl text-center font-psemibold text-white mt-2 mb-6">
                Real-time updates on your home energy usage
              </Text>
            </View>

            <LineChart/>
          </View>
        )}

        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      />
    </SafeAreaView>
  )
}

export default Home;
