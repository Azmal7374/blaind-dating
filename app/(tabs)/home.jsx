import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const { width: screenWidth } = Dimensions.get("window");

const HomePage = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const profiles = [
    {
      name: "Jason Derulo",
      occupation: "Dancer and Actress",
      interests: ["Football", "Gym", "Movies"],
      essentials: {
        distance: "20 Km Distance",
        height: "5.3 Feet",
        education: "University of Dhaka",
        location: "Mirpur, Dhaka",
        languages: "Bangla, English",
        gender: "Male",
      },
      image:
        "https://img.freepik.com/free-photo/portrait-interesting-young-man-winter-clothes_158595-911.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
    },
    {
      name: "John Doe",
      occupation: "Musician",
      interests: ["Music", "Traveling"],
      essentials: {
        distance: "15 Km Distance",
        height: "5.8 Feet",
        education: "University of XYZ",
        location: "Banani, Dhaka",
        languages: "Bangla, English, French",
        gender: "Male",
      },
      image:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
    },
  ];

  const renderProfileCard = ({ item }) => (
    <Animatable.View animation="fadeInUp" style={styles.cardContainer} className="">
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.profileImage} />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.closeButton]}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.loveButton]}>
            <Ionicons name="heart" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.occupation}>{item.occupation}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {item.interests.map((interest, index) => (
              <Text key={index} style={styles.interestTag}>
                {interest}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Essentials</Text>
          {Object.values(item.essentials).map((essential, index) => (
            <Text key={index} style={styles.essentialItem}>
              {essential}
            </Text>
          ))}
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={profiles}
        renderItem={renderProfileCard}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / screenWidth
          );
          setCurrentIndex(newIndex);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: screenWidth * 0.9,
    borderRadius: 12,
    marginHorizontal: screenWidth * 0.05,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "cover",
  },
  iconContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: "#EC4899",
    padding: 16,
    borderRadius: 50,
  },
  closeButton: {
    alignSelf: "flex-start",
  },
  loveButton: {
    alignSelf: "flex-start",
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  occupation: {
    fontSize: 16,
    color: "#4B5563",
    marginVertical: 4,
  },
  sectionContainer: {
    marginTop: 12,
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
  essentialItem: {
    fontSize: 14,
    color: "#6B7280",
    marginVertical: 2,
  },
});

export default HomePage;
