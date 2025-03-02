import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  secureTextEntry,
  rightIcon,
  handleRightIconPress,
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-500">{title}</Text>
      <View className="flex-row items-center w-full h-16 px-4 bg-gray-100 rounded-lg border border-gray-200 focus:border-pink-500">
        <TextInput
          className="flex-1 text-black text-base"
          value={value}
          onChangeText={handleChangeText}
          placeholder={title}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && (
          <TouchableOpacity onPress={handleRightIconPress}>
            <Ionicons name={rightIcon} size={24} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;