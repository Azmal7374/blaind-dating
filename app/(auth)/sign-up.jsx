import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, Alert, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!username.trim()) {
      Alert.alert("Error", "Username is required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  let Image_Http_URL2 = {
    uri: "https://img.freepik.com/premium-photo/asian-indian-young-indian-people-eating-restaurant-evening_466689-13660.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Animatable.Image
          source={Image_Http_URL2}
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
            title="UserName"
            value={username}
            handleChangeText={setUsername}
            otherStyles="mt-7"
            keyboardType="default"
          />
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
          <FormField
            title="Confirm Password"
            value={confirmPassword}
            handleChangeText={setConfirmPassword}
            otherStyles="mt-7"
            keyboardType="default"
            secureTextEntry
          />

          <Animatable.View animation="fadeInUp" duration={1500}>
            <CustomButton
              title="Get Started"
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
