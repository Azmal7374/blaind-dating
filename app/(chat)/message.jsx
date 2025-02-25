import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ChatInbox = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "John Doe",
      text: "Hey, how are you?",
      timestamp: "2:30 PM",
      type: "text",
    },
    {
      id: "2",
      sender: "Me",
      text: "I'm good, thanks! How about you?",
      timestamp: "2:31 PM",
      type: "text",
    },
    {
      id: "3",
      sender: "John Doe",
      text: "Can we meet tomorrow?",
      timestamp: "2:32 PM",
      type: "text",
    },
    {
      id: "4",
      sender: "Me",
      text: "Sure, let's meet at noon.",
      timestamp: "2:33 PM",
      type: "text",
    },
    {
      id: "5",
      sender: "John Doe",
      text: "https://example.com/sample.jpg",
      timestamp: "2:35 PM",
      type: "image",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  // Request permissions for media library access
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  // Function to pick image or video
  const pickImageOrVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,  // Allow both images and videos
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.mediaType === 'image') {
        setImage(result.uri);  // Handle image
        sendMessage(result.uri, 'image');
      } else if (result.mediaType === 'video') {
        setVideo(result.uri);  // Handle video
        sendMessage(result.uri, 'video');
      }
    }
  };

  // Function to send a message
  const sendMessage = (text, type = 'text') => {
    if (text.trim() === '') return;
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: "Me",
      text: text,
      timestamp: "Just now",
      type: type,
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "Me" && styles.myMessageContainer,
      ]}
    >
      {item.type === "text" ? (
        <Text style={styles.messageText}>{item.text}</Text>
      ) : item.type === 'image' ? (
        <Image source={{ uri: item.text }} style={styles.messageImage} />
      ) : item.type === 'video' ? (
        <Text style={styles.messageText}>Video shared: {item.text}</Text>
      ) : null}
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(inputMessage)}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton} onPress={pickImageOrVideo}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatList: {
    paddingHorizontal: 16,
    marginBottom: 64,
  },
  messageContainer: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    maxWidth: "75%",
    backgroundColor: "#E5E7EB",
    alignSelf: "flex-start",
  },
  myMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#3B82F6",
  },
  messageText: {
    color: "#111827",
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  timestamp: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "#F3F4F6",
  },
  sendButton: {
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 24,
  },
  mediaButton: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 24,
    marginLeft: 8,
  },
});

export default ChatInbox;
