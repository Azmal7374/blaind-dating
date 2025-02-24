import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutPage = () => {
     const router = useRouter();
    return (
        <View className="flex-1 ">
            <SafeAreaView className="flex-1 px-1 my-12 justify-between">
                       <View className="">
                         <Text className="text-center text-white font-bold text-4xl">
                           This is About Page
                         </Text>
                       
                       </View>
                       <View className="w-full items-center">
                         <Button
                           onPress={() => router.push("/")}
                           title="Go To Root Page"
                         />
                       </View>
                     </SafeAreaView>
        </View>
    );
};

export default AboutPage;