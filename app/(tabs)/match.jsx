import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const mockData = {

  user1: {
    name: "Alice",
    image: "https://img.freepik.com/premium-photo/portrait-beautiful-caucasian-girl-young-attractive-stylish-elegant-brunette-woman-with-long-hair-red-beret-gloves-blue-coat-looking-camera-outdoors-walking-beach-ocean_157823-1786.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
  },
  user2: {
    name: "Bob",
    image: "https://img.freepik.com/free-photo/portrait-adventurous-hiker-forest_329181-19290.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
  },
};

const MatchScreen = ({ onMessage, onExplore }) => {
  const user1 = mockData.user1;
  const user2 = mockData.user2;
  const route=useRouter()

  if (!user1 || !user2) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No match data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <Animatable.View
          animation="bounceInLeft"
          delay={300}
          style={[styles.imageWrapper, styles.imageLeft]}
        >
          <Image source={{ uri: user1.image }} style={styles.image} />
          <View style={styles.heartIcon}>
            <AntDesign name="heart" size={16} color="#EC4899" />
          </View>
        </Animatable.View>
        <Animatable.View
          animation="bounceInRight"
          delay={300}
          style={[styles.imageWrapper, styles.imageRight]}
        >
          <Image source={{ uri: user2.image }} style={styles.image} />
          <View style={styles.heartIcon}>
            <AntDesign name="heart" size={16} color="#EC4899" />
          </View>
        </Animatable.View>
      </View>

      <Animatable.Text
        animation="fadeInDown"
        delay={600}
        style={styles.matchText}
      >
        It’s a match, {user1.name} and {user2.name}!
      </Animatable.Text>
      <Animatable.Text
        animation="fadeInUp"
        delay={800}
        style={styles.subText}
      >
        Best of luck, lovers!
      </Animatable.Text>

      <Animatable.View animation="zoomIn" delay={1000}>
        <TouchableOpacity style={styles.messageButton} onPress={() => route.push('/message')}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exploreButton} onPress={onExplore}>
          <Text style={styles.exploreButtonText}>Keep Exploring</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
    width: 120,
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
    backgroundColor: "white",
  },
  imageLeft: {
    transform: [{ rotate: "-10deg" }],
    marginRight: -20,
  },
  imageRight: {
    transform: [{ rotate: "10deg" }],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
    elevation: 2,
  },
  matchText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EC4899",
    marginBottom: 8,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 30,
    textAlign: "center",
  },
  messageButton: {
    backgroundColor: "#EC4899",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 15,
  },
  exploreButton: {
    borderWidth: 1,
    borderColor: "#EC4899",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  exploreButtonText: {
    color: "#EC4899",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
});
