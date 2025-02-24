import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';

const RootLayout = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#161622' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, marginTop: 48 }}>
     
          <View
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 36,
              }}
            >
              Welcome to Blind Dating App
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'gray',
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Where connections are based on personality, not appearances.
            </Text>
          </View>

        

          {/* Buttons Section */}
          <View className='mt-20' style={{ alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity
              onPress={() => router.push('/home')}
              style={{
                backgroundColor: '#4CAF50',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="home" size={24} color="white" style={{ marginRight: 8 }} />
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Explore Home</Text>
            </TouchableOpacity>
          </View>

          {/* Call to Action */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity   onPress={() => router.push('/sign-in')}
              style={{
                backgroundColor: '#4CAF50',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
   
    <AntDesign name="user" size={24} ccolor="white" style={{ marginRight: 8 }}/>
    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>User</Text>
            </TouchableOpacity>
              
                </View>
          <View
           
          >
          
          </View>
        </SafeAreaView>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

export default RootLayout;