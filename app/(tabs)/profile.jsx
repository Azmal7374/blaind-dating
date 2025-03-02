import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable"; // Import Animatable
import { supabase } from '../../supabase';

const Profile = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State for user email
  const [loading, setLoading] = useState(true); // State for loading

  let Image_Http_URL = {
    uri: "https://img.freepik.com/premium-photo/man-with-headphones_1368-70297.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
  };

  // Fetch the current user's email
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          setUserEmail(session.user.email); // Set the user's email
        } else {
          console.log("No user is currently logged in.");
        }
      } catch (error) {
        console.error("Error fetching user session:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmail();
  }, []);

  // Open modal
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  // Close modal
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/sign-in"); // Redirect to Sign In screen
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 px-4 my-12 justify-between">
        {/* Header Section */}
        <View className="flex-1 justify-center items-center">
          <Image
            source={Image_Http_URL}
            style={{ width: 100, height: 100 }}
            className="rounded-full mb-4"
          />
          <Text className="text-black text-xl font-bold">Azmal Gazi, 24</Text>
          <Text className="text-gray-400 text-sm">Profile 99% complete</Text>
          {userEmail && (
            <Text className="text-gray-500 text-sm mt-2">
              Logged in as: {userEmail}
            </Text>
          )}
          <TouchableOpacity
            className="items-center mt-6"
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={30} color="#EC4899" />
            <Text className="text-black text-sm mt-2">Logout</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity
            className="items-center"
            onPress={() => alert("Settings clicked")}
          >
            <Ionicons name="settings-outline" size={30} color="#EC4899" />
            <Text className="text-black text-sm mt-2">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => alert("Edit Profile clicked")}
          >
            <Ionicons name="pencil-outline" size={30} color="#EC4899" />
            <Text className="text-black text-sm mt-2">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={handleModalOpen}
          >
            <Ionicons name="add-circle-outline" size={30} color="#EC4899" />
            <Text className="text-black text-sm mt-2">Add Medium</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for Add Media */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={handleModalClose}
        >
          {/* Animated View using Animatable */}
          <Animatable.View
            animation="fadeIn"
            duration={500}
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View className="bg-pink-500 rounded-lg p-4 w-4/5">
              <Text className="text-black text-xl font-bold mb-4">Add Media</Text>
              <TextInput
                placeholder="Enter media title"
                className="border border-gray-200 rounded-lg p-2 mb-4"
              />
              <TextInput
                placeholder="Enter media description"
                className="border border-gray-300 rounded-lg p-2 mb-4"
                multiline
              />
              <View className="flex-row justify-between">
                <TouchableOpacity
                  className="bg-gray-900 p-4 justify-center items-center rounded-lg flex-1 mr-2"
                  onPress={handleModalClose}
                >
                  <Text className="text-white text-center">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-900 p-4 justify-center items-center rounded-lg flex-1 ml-2"
                  onPress={() => {
                    alert("Media added!");
                    handleModalClose();
                  }}
                >
                  <Text className="text-white text-center">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default Profile;