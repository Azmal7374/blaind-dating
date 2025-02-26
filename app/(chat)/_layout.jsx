import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View } from 'react-native';

const AuthLayout = () => {
    return (
        <>
          <Stack>
          <Stack.Screen name="message" options={{headerShown:false}} />
          </Stack>
          <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};

export default AuthLayout;