import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { supabase } from "../../supabase";

const ProfileScreen = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the initial session
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      console.log("Initial session:", session);
      console.log("Error:", error);

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }

      if (session) {
        setUserEmail(session.user.email);
      }
      setLoading(false);
    };

    fetchSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed. Event:", event);
      console.log("Session:", session);

      if (session) {
        setUserEmail(session.user.email);
      } else {
        setUserEmail(null); // Clear email if user logs out
      }
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userEmail ? (
        <Text>Logged in as: {userEmail}</Text>
      ) : (
        <Text>No user is currently logged in.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;