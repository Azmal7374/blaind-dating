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
import { supabase } from '../../supabase';
const { width, height } = Dimensions.get("window");

const TabHome = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const imageRef = useRef(null);
  const [userEmail, setUserEmail] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [currentUserData, setCurrentUserData] = useState(null); 


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


  useEffect(() => {
    fetchCurrentUserData();
    fetchUsers();
  }, [userEmail]);

console.log(userEmail)
  // Fetch current user's data
  const fetchCurrentUserData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.102:8000/api/users/current?email=${userEmail}`);
      setCurrentUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching current user data:", error);
    }
  };

  console.log("Current users Data", currentUserData)

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get("http://192.168.1.102:8000/api/users/");
  //     setUsers(response.data.users);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };


  const fetchUsers = async () => {
    try {
      // Fetch all users
      const response = await axios.get(`http://192.168.1.102:8000/api/users`);
      const allUsers = response.data.users;
  
      // Fetch the current logged-in user's data
      const currentUserResponse = await axios.get(
        `http://192.168.1.102:8000/api/users/current?email=${userEmail}`
      );
      const currentUser = currentUserResponse.data.user;
  
      // Filter out the current logged-in user's data from the list
      const filteredUsers = allUsers.filter(
        (user) => user.email !== currentUser.email
      );
  
      // Update the state with the filtered users
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  

// console.log("All Users", users)
  const currentUser = users[currentUserIndex];
  const currentImage = currentUser?.profile_pics?.[currentImageIndex]
    ? `http://192.168.1.102:8000/${currentUser.profile_pics[
        currentImageIndex
      ].replace(/\\/g, "/")}`
    : "https://via.placeholder.com/150";

    // const handleLike = async () => {
    //   try {
    //     await axios.post("http://192.168.1.102:8000/api/matches", {
    //       user1: userId,
    //       user2: currentUser._id,
    //       action: "like",
    //     });
    //     setLikedUsers([...likedUsers, currentUser._id]);
    //     moveToNextImage();
    //   } catch (error) {
    //     console.error("Error liking user:", error);
    //   }
    // };

    // const handleDislike = async () => {
    //   try {
    //     await axios.post("http://192.168.1.102:8000/api/matches", {
    //       user1: userId,
    //       user2: currentUser._id,
    //       action: "pass",
    //     });
    //     setDislikedUsers([...dislikedUsers, currentUser._id]);
    //     moveToNextUser();
    //   } catch (error) {
    //     console.error("Error disliking user:", error);
    //   }
    // };

    const handleLike = () => {
      setLikedUsers([...likedUsers, currentUser._id]);
      moveToNextImage();
    }

    const handleDislike = () => {
      setDislikedUsers([...dislikedUsers, currentUser._id]);
      moveToNextUser();
    }

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
      <View style={styles.noUsersContainer}>
        {/* Icon */}
        <Ionicons name="sad-outline" size={80} color="#EC4899" />
  
        {/* Title */}
        <Text style={styles.noUsersTitle}>No more users to show</Text>
  
        {/* Subtitle */}
        <Text style={styles.noUsersSubtitle}>
          You've reached the end of the list. Check back later or refresh to see new profiles!
        </Text>
  
        {/* Refresh Button */}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchUsers} // Call the fetchUsers function to refresh the list
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
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
            <Text style={styles.sectionTitle}>
              {" "}
              {user?.distance}160 centemeter{" "}
            </Text>
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
                <Text key={index} style={styles.interestTag}>
                  {trait}
                </Text>
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
          <Image
            className="mt-8"
            source={{ uri: currentImage }}
            style={styles.storyImage}
          />
        </Animatable.View>

        <View
          style={styles.iconsContainer}
          className="flex justify-center items-center"
        >
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
          {userEmail && (
            <Text className="text-gray-500 text-sm mt-2">
              Logged in as: {userEmail}
            </Text>
          )}
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
  noUsersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  noUsersTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  noUsersSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
  },
  refreshButton: {
    marginTop: 30,
    backgroundColor: "#EC4899",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TabHome;
