import { useRouter } from "expo-router";
import { Button, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable"; // Import Animatable for animations
import CustomButton from "@/components/CustomButton";

const Message = () => {
  const router = useRouter();
  let Image_Http_URL4 = {
    uri: "https://www.freepik.com/premium-photo/young-man-with-beard-isolated-keeping-arms-crossed-frontal-position_6181731.htm#from_element=detail_alsolike",
  };
  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 px-4 my-12 justify-between">
        {/* Header Section with Animation */}
        <Animatable.View
          animation="fadeIn"
          duration={800}
          className="items-center mb-6"
        >
          <Text className="text-center text-balck font-bold text-5xl mb-2">
            Message Page
          </Text>
          <Text className="text-center text-black text-lg">
            Welcome to your messages. Stay connected with friends and updates!
          </Text>
        </Animatable.View>

        {/* Image Section */}
        <Animatable.View
          animation="zoomIn"
          duration={1200}
          className="flex items-center mb-8"
        >
          <Image
            source={Image_Http_URL4}
            style={{ width:200, height: 200 }}
          />
        </Animatable.View>

       

        <Animatable.View
          animation="slideInUp"
          duration={1200}
          className="w-full items-center"
        >
          <CustomButton
            title="Go To Root Page"
            handlePress={() => router.push("/")}
            containerStyles="w-full mt-7 mb-4"
          />
        </Animatable.View>
      </SafeAreaView>
    </View>
  );
};

export default Message;
