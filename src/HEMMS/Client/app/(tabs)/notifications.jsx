import { Text, ScrollView, View, RefreshControl, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notifications = () => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    // re call notifications -> if any new data appeared
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <ScrollView className="px-4 my-6">
              <Text className="text-2xl text-white font-psemibold">
                View Notifications
              </Text>
            </ScrollView>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Notifications;
