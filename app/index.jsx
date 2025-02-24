import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import CustomButton from "../components/CustomButton";

const RootLayout = () => {
  const router = useRouter();
  let Image_Http_URL = {
    uri: "https://img.freepik.com/free-photo/young-friends-smiling-looking-tablet-pink_176420-7374.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.Image
          source={Image_Http_URL}
          style={{ height: 350, resizeMode: "cover", margin: 5 }}
          animation="fadeIn"
          duration={1500}
        />

        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, marginTop: 48 }}>
          <Animatable.View
            animation="fadeInUp"
            duration={1500}
            delay={500}
          >
            <Text className="font-bold text-xl">Let's get closer 😊</Text>
            <Text className="text-3xl mt-2">The best place to meet your future partner</Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            duration={1200}
            delay={1000}
            style={{ padding: 4 }}
          >
            <CustomButton
              title="Get Started"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7"
            />
          </Animatable.View>
          <CustomButton
              title="Home"
              handlePress={() => router.push("/home")}
              containerStyles="w-full mt-7 mb-4"
            />
        </SafeAreaView>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

export default RootLayout;
