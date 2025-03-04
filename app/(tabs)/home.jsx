import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Share,
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const TabHome = ({ userId }) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isInterestModalVisible, setIsInterestModalVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, [userId]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://192.168.1.102:8000/api/users?userId=${userId}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const currentUser = users[currentUserIndex];
  const currentImage = currentUser?.profile_pics?.[currentImageIndex]
    ? `http://192.168.1.102:8000/${currentUser.profile_pics[
        currentImageIndex
      ].replace(/\\/g, "/")}`
    : "https://via.placeholder.com/150";

  const handleLike = async () => {
    try {
      await axios.post("http://192.168.1.102:8000/api/matches", {
        user1: userId,
        user2: currentUser._id,
        action: "like",
      });
      setLikedUsers([...likedUsers, currentUser._id]);
      moveToNextImage();
    } catch (error) {
      console.error("Error liking user:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post("http://192.168.1.102:8000/api/matches", {
        user1: userId,
        user2: currentUser._id,
        action: "pass",
      });
      setDislikedUsers([...dislikedUsers, currentUser._id]);
      moveToNextUser();
    } catch (error) {
      console.error("Error disliking user:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to grant storage permissions to download images."
        );
        return;
      }

      const fileUri = `${FileSystem.cacheDirectory}${
        currentUser.name || "image"
      }.jpg`;
      const downloadedImage = await FileSystem.downloadAsync(
        currentImage,
        fileUri
      );
      await MediaLibrary.createAssetAsync(downloadedImage.uri);

      Alert.alert("Download Complete", "Image has been saved to your gallery.");
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert(
        "Download Failed",
        "There was an error downloading the image."
      );
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this profile: ${currentImage}`,
      });
    } catch (error) {
      Alert.alert("Users End", "No More Users Remaining!!");
    }
  };

  const moveToNextUser = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentImageIndex(0);
    } else {
      console.log("No more users to show.");
    }
  };

  const moveToNextImage = () => {
    if (currentImageIndex < currentUser.profile_pics.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      moveToNextUser();
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      !likedUsers.includes(user._id) && !dislikedUsers.includes(user._id)
  );

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.fadeIn(500);
    }
  }, [currentUserIndex, currentImageIndex]);

  const handleInterestSelect = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        Alert.alert("Maximum Reached", "You can select up to 5 interests.");
      }
    }
  };

  const openInterestModal = () => {
    setIsInterestModalVisible(true);
  };

  const closeInterestModal = () => {
    setIsInterestModalVisible(false);
  };

  const filterUsersByInterests = () => {
    if (selectedInterests.length === 0) return users;

    return users.filter((user) =>
      selectedInterests.some((interest) => user.interests.includes(interest))
    );
  };

  if (filteredUsers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUsersText}>No more users to show.</Text>
      </View>
    );
  }

  const getDetailsForImage = (index, user) => {
    const interests = Array.isArray(user.interests)
      ? user.interests
      : user.interests || "No interests";
    const personalityTraits = Array.isArray(user.personalityTraits)
      ? user.personalityTraits
      : user.personalityTraits || "No personality traits";
    switch (index) {
      case 0:
        return (
          <View>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interestsContainer}>
              {interests.map((interest, index) => (
                <Text key={index} style={styles.interestTag}>
                  {interest}
                </Text>
              ))}
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.sectionTitle}> {user?.distance}160  centimeter </Text>
            <Text style={styles.sectionTitle}>
              {user.university || "University Of Croland"}
            </Text>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.sectionTitle}>Personality Traits</Text>
            <View style={styles.interestsContainer}>
              {personalityTraits.map((trait, index) => (
                <Text key={index} style={styles.interestTag}>{trait}</Text>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Animatable.View ref={imageRef} style={styles.imageContainer}>
          <Image className="mt-8" source={{ uri: currentImage }} style={styles.storyImage} />
        </Animatable.View>

        <View style={styles.iconsContainer} className="flex justify-center items-center">
          <TouchableOpacity onPress={handleDislike} style={styles.iconButton}>
            <FontAwesome name="times-circle" size={40} color="#EC4899" />
          </TouchableOpacity>

          <TouchableOpacity onPress={openInterestModal} style={styles.iconButton}>
            <Ionicons name="filter" size={40} color="#EC4899" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
            <Ionicons name="share-social" size={40} color="#EC4899" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
            <FontAwesome name="heart" size={40} color="#EC4899" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDownload} style={styles.iconButton}>
            <Feather name="download" size={40} color="#EC4899" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{currentUser?.name}</Text>
          <Text className="text-start">
            {getDetailsForImage(currentImageIndex, currentUser)}
          </Text>
        </View>
      </View>

      {/* Interest Selection Modal */}
      <Modal
        transparent={true}
        visible={isInterestModalVisible}
        animationType="slide"
        onRequestClose={closeInterestModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Interests (Max 5)</Text>
            <ScrollView>
              {currentUser?.interests?.map((interest, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.interestButton,
                    selectedInterests.includes(interest) && styles.selectedInterestButton,
                  ]}
                  onPress={() => handleInterestSelect(interest)}
                >
                  <Text style={styles.interestButtonText}>{interest}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={closeInterestModal} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  imageContainer: {
    width: width * 1,
    height: height * 0.55,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  storyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
  },
  detailsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
    color: "#333",
  },
  noUsersText: {
    fontSize: 18,
    color: "#777",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9CA3AF",
    marginBottom: 4,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestTag: {
    backgroundColor: "#EC4899",
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  interestButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedInterestButton: {
    backgroundColor: "#EC4899",
  },
  interestButtonText: {
    textAlign: "center",
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#EC4899",
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default TabHome;