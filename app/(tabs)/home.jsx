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
import CustomButton from "@/components/CustomButton";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HomePage = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const imageUrls = [
    "https://img.freepik.com/free-photo/portrait-interesting-young-man-winter-clothes_158595-911.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/smiling-group-friends-outdoors_53876-65323.jpg",
    "https://img.freepik.com/free-photo/handsome-happy-bearded-man_74855-2827.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/close-up-handsome-young-businessman-trendy-suit-smiling-standing-against-white-background_1258-64864.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
  ];

  const toggleFullscreen = (index) => {
    setCurrentIndex(index); // Update the current index
    setIsFullscreen(true); // Enable fullscreen mode
  };

  const closeFullscreen = () => setIsFullscreen(false); // Exit fullscreen mode

  const renderCarouselItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleFullscreen(index)}>
      <Animatable.View animation="zoomIn" duration={500} style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </Animatable.View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {isFullscreen ? (
        <Animatable.View animation="fadeIn" style={styles.fullscreenContainer}>
          <Image
            source={{ uri: imageUrls[currentIndex] }}
            style={styles.fullscreenImage}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeFullscreen}>
            <Ionicons name="close" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.fullscreenTextContainer}>
            <Animatable.Text animation="fadeInUp" style={styles.fullscreenText}>
            John Doe 28
            </Animatable.Text>
            <Animatable.Text animation="fadeInUp" delay={200} style={styles.fullscreenText}>
              Age: 28
            </Animatable.Text>
            <Animatable.Text animation="fadeInUp" delay={400} style={styles.fullscreenText}>
            150 Centemeter
            </Animatable.Text>
            <Animatable.Text animation="fadeInUp" delay={600} style={styles.fullscreenText}>
             CrowlAnd
            </Animatable.Text>
            <Animatable.Text animation="fadeInUp" delay={800} style={styles.fullscreenText}>
             Music, Traveling
            </Animatable.Text>
          </View>
        </Animatable.View>
      ) : (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, marginTop: 48 }}>
          <FlatList
            data={imageUrls}
            renderItem={renderCarouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            pagingEnabled
            onScroll={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / screenWidth
              );
              setCurrentIndex(newIndex);
            }}
          />

          {/* Icon Section */}
          <Animatable.View animation="fadeInUp" style={styles.iconContainer}>
            <Animatable.View animation="pulse" iterationCount="infinite">
              <Ionicons
                name="heart"
                size={40}
                color="#EC4899"
                style={styles.icon}
              />
            </Animatable.View>
            <Animatable.View animation="pulse" iterationCount="infinite" delay={200}>
              <Ionicons
                name="close-circle"
                size={40}
                color="#EC4899"
                style={styles.icon}
              />
            </Animatable.View>
            <Animatable.View animation="pulse" iterationCount="infinite" delay={400}>
              <Ionicons
                name="chatbubble-ellipses"
                size={40}
                color="#EC4899"
                style={styles.icon}
              />
            </Animatable.View>
            <Animatable.View animation="pulse" iterationCount="infinite" delay={600}>
              <Ionicons
                name="star"
                size={40}
                color="#EC4899"
                style={styles.icon}
              />
            </Animatable.View>
          </Animatable.View>
        </SafeAreaView>
      )}
      <View style={{ width: "100%", alignItems: "center", marginTop: 24 }}>
        <CustomButton
          title="Go To Root Page"
          handlePress={() => router.push("/")}
          containerStyles="w-full mt-7 mb-4"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: screenWidth * 0.9,
    height: 500,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 5,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  fullscreenTextContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  fullscreenText: {
    color: "white",
    fontSize: 20,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  icon: {
    marginHorizontal: 20,
  },
});

export default HomePage;
