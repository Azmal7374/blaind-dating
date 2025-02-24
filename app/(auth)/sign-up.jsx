
import { useState } from "react";
import {useRouter } from "expo-router";
import { View, Text, Alert,TextInput, Button } from "react-native";


const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp= async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username is required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
     

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
      Create an Account
    </Text>

    <TextInput
      className="p-3 bg-gray-800 text-white mb-4 rounded"
      placeholder="Username"
      placeholderTextColor="#999"
      onChangeText={setUsername}
      value={username}
    />
    <TextInput
      className="p-3 bg-gray-800 text-white mb-4 rounded"
      placeholder="Email"
      placeholderTextColor="#999"
      onChangeText={setEmail}
      value={email}
      keyboardType="email-address"
    />
    <TextInput
      className="p-3 bg-gray-800 text-white mb-4 rounded"
      placeholder="Password"
      placeholderTextColor="#999"
      secureTextEntry
      onChangeText={setPassword}
      value={password}
    />
    <TextInput
      className="p-3 bg-gray-800 text-white mb-6 rounded"
      placeholder="Confirm Password"
      placeholderTextColor="#999"
      secureTextEntry
      onChangeText={setConfirmPassword}
      value={confirmPassword}
    />

    <Button title="Sign Up" onPress={handleSignUp} />

    <Text className="text-white text-center mt-6">
      Already have an account?{' '}
      <Text
        className="text-blue-400 font-bold"
        onPress={() => router.push('/sign-in')}
      >
        Sign In
      </Text>
    </Text>
  </View>
  );
};

export default SignUp;
