import React from "react";
import { View, Text } from "react-native";
import { typography } from "../../design-system/typography";
import FeatureProps from "@/types/feature";

const FeatureItem = ({ Icon, color, title, subtitle }: FeatureProps) => (
  <View className="w-1/2 items-center mb-4">
    <View className="w-12 h-12 mb-3 bg-gray-100 rounded-xl items-center justify-center">
      <Icon size={24} color={color} />
    </View>
    <Text className="text-2xl font-bold text-gray-900">{title}</Text>
    <Text className="text-sm text-gray-600" style={typography.bodySmall}>
      {subtitle}
    </Text>
  </View>
);

export default FeatureItem;
