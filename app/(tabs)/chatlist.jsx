import { useRouter } from "expo-router";
import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const ChatList = () => {
    const route=useRouter()
  const chatData = [
    {
      id: "1",
      name: "Jason Derulo",
      message: "Hey, I am thinking maybe we can grab coffee sometimes.",
      time: "4:40 PM",
      avatar: "https://img.freepik.com/free-photo/portrait-young-bearded-hipster-man-looking-camera-taking-selfie-against-yellow_58466-11455.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
    },
    {
      id: "2",
      name: "Jason Derulo",
      message: "Hey, I am thinking maybe we can grab coffee sometimes.",
      time: "2:20 PM",
      avatar: "https://img.freepik.com/free-photo/portrait-young-bearded-hipster-man-looking-camera-taking-selfie-against-yellow_58466-11455.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
    },
    {
      id: "3",
      name: "Jason Derulo",
      message: "Hey, I am thinking maybe we can grab coffee sometimes.",
      time: "4:40 PM",
      avatar: "https://img.freepik.com/free-photo/portrait-young-bearded-hipster-man-looking-camera-taking-selfie-against-yellow_58466-11455.jpg?ga=GA1.1.1056540666.1740382155&semt=ais_hybrid",
    },
  ];

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => route.push('/message')}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  chatList: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#EC4899",
  },
});
