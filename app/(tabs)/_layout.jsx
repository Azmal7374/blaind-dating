import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#FFA001",
      tabBarInactiveTintColor: "#CDCDE0",
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#161622",
        borderTopWidth: 1,
        borderTopColor: "#232533",
        height: 84,
      },
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) =><Entypo name="open-book" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons
          name="flower-tulip"
          size={24}
          color={color}
        />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="message1" size={24} color={color} />,
        }}
      />

<Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="profile" size={24} color={color} />,
        }}
      />
    </Tabs>
    <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
