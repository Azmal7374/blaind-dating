import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter } from 'expo-router';
import { Button } from 'react-native';
const RootLayout = () => {
  const router = useRouter();
  return (
    <View  className="flex-1">
      <ScrollView>

      <SafeAreaView className="flex-1 px-1 my-12 justify-between">
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Blind Dating Appp
              </Text>
            
            </View>
            <View className='w-40 flex-1 justify-center items-center'>
              <Button
                onPress={() => router.push("/home")}
                title="Home"
              />
            </View>
          </SafeAreaView>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

export default RootLayout;