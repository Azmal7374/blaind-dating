import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
     const router = useRouter();
    return (
        <View>
            <SafeAreaView className="flex-1 px-1 my-12 justify-between">
                       <View>
                         <Text className="text-center text-white font-bold text-4xl">
                           This is Home Page
                         </Text>
                       
                       </View>
                       <View className='w-40 flex-1 justify-center items-center'>
                         <Button
                           onPress={() => router.push("/")}
                           title="Go To Root Page"
                         />
                       </View>
                     </SafeAreaView>
        </View>
    );
};

export default HomePage;