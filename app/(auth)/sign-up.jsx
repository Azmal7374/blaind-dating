// app/sign-up.js
import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, Alert, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { supabase } from "../../supabase";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Email is required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      Alert.alert("Success", "Check your email for the confirmation link!");
      router.push("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Animatable.Image
          source={{ uri: "https://img.freepik.com/premium-photo/asian-indian-young-indian-people-eating-restaurant-evening_466689-13660.jpg" }}
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
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off" : "eye"}
            handleRightIconPress={toggleShowPassword}
          />
          <FormField
            title="Confirm Password"
            value={confirmPassword}
            handleChangeText={setConfirmPassword}
            otherStyles="mt-7"
            keyboardType="default"
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off" : "eye"}
            handleRightIconPress={toggleShowPassword}
          />

          <Animatable.View animation="fadeInUp" duration={1500}>
            <CustomButton
              title="Sign Up"
              handlePress={handleSignUp}
              containerStyles="w-full mt-7 bg-pink-500 rounded-lg py-3 shadow-lg"
            />
          </Animatable.View>

          <Text className="text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Text
              className="text-pink-500 font-bold"
              onPress={() => router.push("/sign-in")}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;