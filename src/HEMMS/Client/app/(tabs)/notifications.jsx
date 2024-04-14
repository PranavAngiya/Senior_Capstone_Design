import { Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notifications = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          View Notifications
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notifications;
