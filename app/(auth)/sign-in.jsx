import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignIn = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  let Image_Http_URL = {
    uri: "https://img.freepik.com/premium-photo/asian-indian-young-indian-people-eating-restaurant-evening_466689-13660.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Animatable.Image
          source={Image_Http_URL}
          style={{ height: 350, resizeMode: "cover", margin: 5 }}
          animation="fadeIn"
          duration={1500}
        />
        <View className="p-4">
          <Animatable.Text
            className="text-black text-center text-3xl font-bold mb-6"
            animation="bounceIn"
            duration={1200}
          >
            Sign in to a lovely life
          </Animatable.Text>

          <FormField
            title="Email"
            value={email}
            handleChangeText={setEmail}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={setPassword}
            otherStyles="mt-7"
            keyboardType="default"
            secureTextEntry
          />

          <Animatable.View animation="fadeInUp" duration={1500}>
            <CustomButton
              title="Get Started"
              handlePress={handleSignIn}
              containerStyles="w-full mt-7 bg-pink-500 rounded-lg py-3 shadow-lg"
            />
          </Animatable.View>

          <Text className="text-gray-500 text-center mt-6">
            Don't have an account?{" "}
            <Text
              className="text-pink-500 font-bold"
              onPress={() => router.push("/sign-up")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
