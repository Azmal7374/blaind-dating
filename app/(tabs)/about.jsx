import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { supabase } from '../../supabase';

const MatchesScreen = () => {
  const [userId, setUserId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null); 


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
    }
    fetchUserEmail();
  }, []);

console.log(userEmail)

  // Fetch user ID by email
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`http://192.168.1.102:8000/api/users/current?email=${userEmail}`);
        setUserId(response.data.user._id);
        console.log("Users Data",response.data?.user.email)
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [userEmail]);

  console.log("Users id",userId)
  // Fetch matches for the user
  useEffect(() => {
    if (!userId) return;

    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.102:8000/api/match/${userId}`
        );
        setMatches(response.data.matches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Matches</Text>
      {matches.length === 0 ? (
        <Text>No matches found.</Text>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.matchId}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <Text style={styles.matchName}>{item.user.username}</Text>
              <Text>Email: {item.user.email}</Text>
              <Text>Compatibility Score: {item.compatibilityScore}</Text>
              <Text>Matched On: {new Date(item.matchedAt).toLocaleDateString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  matchCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  matchName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MatchesScreen;

















// import React, { useState } from "react";

// import { useRouter } from "expo-router";
// import {
//   Text,
//   View,
//   Image,
//   Dimensions,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import * as Animatable from "react-native-animatable";

// const { width: screenWidth } = Dimensions.get("window");

// const HomePage = () => {
//   const router = useRouter();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const profiles = [
//     {
//       name: "Jason Derulo",
//       occupation: "Dancer and Actress",
//       interests: ["Football", "Gym", "Movies"],
//       essentials: {
//         distance: "20 Km Distance",
//         height: "5.3 Feet",
//         education: "University of Dhaka",
//         location: "Mirpur, Dhaka",
//         languages: "Bangla, English",
//         gender: "Male",
//       },
//       image:
//         "https://img.freepik.com/free-photo/portrait-interesting-young-man-winter-clothes_158595-911.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
//     },
//     {
//       name: "John Doe",
//       occupation: "Musician",
//       interests: ["Music", "Traveling"],
//       essentials: {
//         distance: "15 Km Distance",
//         height: "5.8 Feet",
//         education: "University of XYZ",
//         location: "Banani, Dhaka",
//         languages: "Bangla, English, French",
//         gender: "Male",
//       },
//       image:
//         "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
//     },
//   ];

//   const renderProfileCard = ({ item }) => (
//     <Animatable.View animation="fadeInUp" style={styles.cardContainer} className="">
//       <View style={styles.imageContainer}>
//         <Image source={{ uri: item.image }} style={styles.profileImage} />
//         <View style={styles.iconContainer}>
//           <TouchableOpacity style={[styles.actionButton, styles.closeButton]}>
//             <Ionicons name="close" size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.actionButton, styles.loveButton]}>
//             <Ionicons name="heart" size={30} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.occupation}>{item.occupation}</Text>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Interests</Text>
//           <View style={styles.interestsContainer}>
//             {item.interests.map((interest, index) => (
//               <Text key={index} style={styles.interestTag}>
//                 {interest}
//               </Text>
//             ))}
//           </View>
//         </View>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Essentials</Text>
//           {Object.values(item.essentials).map((essential, index) => (
//             <Text key={index} style={styles.essentialItem}>
//               {essential}
//             </Text>
//           ))}
//         </View>
//       </View>
//     </Animatable.View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <FlatList
//         data={profiles}
//         renderItem={renderProfileCard}
//         keyExtractor={(_, index) => index.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         onScroll={(e) => {
//           const newIndex = Math.round(
//             e.nativeEvent.contentOffset.x / screenWidth
//           );
//           setCurrentIndex(newIndex);
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     width: screenWidth * 0.9,
//     borderRadius: 12,
//     marginHorizontal: screenWidth * 0.05,
//   },
//   imageContainer: {
//     position: "relative",
//   },
//   profileImage: {
//     width: "100%",
//     height: 300,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     resizeMode: "cover",
//   },
//   iconContainer: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   actionButton: {
//     backgroundColor: "#EC4899",
//     padding: 16,
//     borderRadius: 50,
//   },
//   closeButton: {
//     alignSelf: "flex-start",
//   },
//   loveButton: {
//     alignSelf: "flex-start",
//   },
//   detailsContainer: {
//     padding: 16,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1F2937",
//   },
//   occupation: {
//     fontSize: 16,
//     color: "#4B5563",
//     marginVertical: 4,
//   },
//   sectionContainer: {
//     marginTop: 12,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#9CA3AF",
//     marginBottom: 4,
//   },
//   interestsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   interestTag: {
//     backgroundColor: "#EC4899",
//     color: "white",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 8,
//     marginRight: 8,
//     marginBottom: 8,
//     fontSize: 12,
//   },
//   essentialItem: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginVertical: 2,
//   },
// });

// export default HomePage;
