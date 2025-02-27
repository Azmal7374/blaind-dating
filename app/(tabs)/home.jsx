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
} from "react-native";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const TabHome = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const imageRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.1.103:8000/api/users/");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const currentUser = users[currentUserIndex];
  const currentImage = currentUser?.profile_pics?.[currentImageIndex]
    ? `http://192.168.1.103:8000/${currentUser.profile_pics[
        currentImageIndex
      ].replace(/\\/g, "/")}`
    : "https://via.placeholder.com/150";

  const handleLike = () => {
    setLikedUsers([...likedUsers, currentUser._id]);
    moveToNextImage();
  };

  const handleDislike = () => {
    setDislikedUsers([...dislikedUsers, currentUser._id]);
    moveToNextUser();
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
      Alert.alert("Users End", "No More SUers Remaining!!");
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
          <View >
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
          <View >
            <Text  style={styles.sectionTitle}> {user?.distance}160  centemeter </Text>
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
                  <Text  key={index} style={styles.interestTag}>{trait}</Text>
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
    // alignItems: 'center',
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
});

export default TabHome;
