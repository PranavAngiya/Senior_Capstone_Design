import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, RefreshControl } from 'react-native';

import LineChart from '../../components/LineChart';
import { powerData } from '../../constants/PowerData';
import { costData } from '../../constants/CostData';
import { images } from '../../constants';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // re call graph -> if any new data appeared
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
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
            <Text className="text-xl text-center font-psemibold text-white mt-2">
              Real-time updates on your home energy usage
            </Text>
          </View>
        </View>

        <View className="flex-1 px-4 mt-6">
          <View className="mb-4">
            <Text className="text-xl text-white font-psemibold mb-2">
              Power
            </Text>
            <View className="bg-white p-4 rounded-lg shadow-md">
              <LineChart
                height={200}
                width={300}
                data={powerData}
                bottomPadding={20}
                leftPadding={0}
              />
            </View>
          </View>
          <View>
            <Text className="text-xl text-white font-psemibold mb-2">
              Cost
            </Text>

            <View className="bg-white p-4 rounded-lg shadow-md">
              <LineChart
                height={200}
                width={300}
                data={costData}
                bottomPadding={20}
                leftPadding={0}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
