import { useRouter } from "expo-router";
import { Button, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-purple-500">
            <SafeAreaView className="flex-1 px-4 my-12 justify-between">
                <View className="items-center">
                    <Text className="text-center text-white font-bold text-4xl mb-4">
                      Home Page After User Logged in
                    </Text>
                  
                </View>
               
                <View className="w-full items-center">
                    <Button
                        onPress={() => router.push("/")}
                        title="Go To Root Page"
                        color="#111111"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default HomePage;