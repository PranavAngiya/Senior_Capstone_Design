import { View, Text, SafeAreaView, FlatList, ScrollView, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';

import { icons, images } from '../../constants';

const Devices = () => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    // re call devices -> if any new data appeared
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
              <ScrollView className="px-4 my-6">
                <Text className="text-2xl text-white font-psemibold">
                  View Devices
                </Text>
              </ScrollView>

            <View className="flex-col items-center px-4 mb-14">
              <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                  <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image source={images.profile} className="w-full h-full rounded-lg" resizeMode='cover'/>
                  </View>

                  <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                      General Device
                    </Text>
                  </View>
                </View>

                <View className="pt-2">
                  <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
              </View>
            </View>

            <View className="flex-col items-center px-4 mb-14">
              <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                  <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image source={images.profile} className="w-full h-full rounded-lg" resizeMode='cover'/>
                  </View>

                  <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                      Aditya's Device
                    </Text>
                  </View>
                </View>

                <View className="pt-2">
                  <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
              </View>
            </View>

            <View className="flex-col items-center px-4 mb-14">
              <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                  <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image source={images.profile} className="w-full h-full rounded-lg" resizeMode='cover'/>
                  </View>

                  <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                      Monali's Device
                    </Text>
                  </View>
                </View>

                <View className="pt-2">
                  <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
              </View>
            </View>

            <View className="flex-col items-center px-4 mb-14">
              <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                  <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image source={images.profile} className="w-full h-full rounded-lg" resizeMode='cover'/>
                  </View>

                  <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                      Kat's Device
                    </Text>
                  </View>
                </View>

                <View className="pt-2">
                  <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
              </View>
            </View>

            <View className="flex-col items-center px-4 mb-14">
              <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                  <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image source={images.profile} className="w-full h-full rounded-lg" resizeMode='cover'/>
                  </View>

                  <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                      Sean's Device
                    </Text>
                  </View>
                </View>

                <View className="pt-2">
                  <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
              </View>
            </View>

            <View className="flex-col items-center px-4 mb-14">
              <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                  <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image source={images.profile} className="w-full h-full rounded-lg" resizeMode='cover'/>
                  </View>

                  <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                      Pranav's Device
                    </Text>
                  </View>
                </View>

                <View className="pt-2">
                  <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
              </View>
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Devices;
