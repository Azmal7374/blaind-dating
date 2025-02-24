import { useState } from "react";
import {useRouter } from "expo-router";
import { View, Text, Alert,TextInput, Button } from "react-native";

const SignIn = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
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

  return (
      <View className="flex-1 justify-center p-4 bg-gray-900">
      <Text className="text-white text-center text-2xl font-bold mb-6">
        Sign In
      </Text>

      <TextInput
        className="p-3 bg-gray-800 text-white mb-4 rounded"
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        className="p-3 bg-gray-800 text-white mb-6 rounded"
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Sign In" onPress={handleSignIn} />

      <Text className="text-white text-center mt-6">
        Don't have an account?{' '}
        <Text
          className="text-blue-400 font-bold"
          onPress={() => router.push('/sign-up')}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default SignIn;