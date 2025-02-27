import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather, MaterialIcons, FontAwesome,AntDesign,} from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#7D7D8C",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
            elevation: 8,
            paddingBottom: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            title: 'Register',
            tabBarIcon: ({ color }) => (
              <Feather name="edit-3" size={26} color={color} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="info-outline" size={28} color={color} />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="chatlist"
          options={{
            title: 'Chat List',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="match"
          options={{
            title: 'Match',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart-o" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
