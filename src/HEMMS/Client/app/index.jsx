import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Empower Your Home & Energize Your Future with{' '}
              <Text className="text-secondary-200">
                HEMMS
              </Text>
            </Text>

            <Image
              source={images.path}
              className="max-w-[340px] w-full h-[15px] absolute -bottom-3 -right-1"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where sustainability meets smart living: embark on a sustainable journey with HEMMS
          </Text>

          <CustomButton
            title="Get Started"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar
        backgroundColor="#161622"
        style="light"
      />
    </SafeAreaView>
  );
}
