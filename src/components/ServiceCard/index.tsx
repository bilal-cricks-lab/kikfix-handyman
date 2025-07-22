import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { LucideArrowRight } from 'lucide-react-native';
import { typography } from '../../design-system/typography';
import { colors } from '../../design-system';
import CustomButton from '../Button';

type BulletPoint = {
  color: string;
  text: string;
};

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: BulletPoint[];
  buttonText: string;
  onPress: () => void;
  themeColor: string;
  pressable?: boolean;
};

const ServiceCard: React.FC<Props> = ({
  icon,
  title,
  description,
  bullets,
  buttonText,
  onPress,
  themeColor,
  pressable = true,
}) => {
  const Wrapper = pressable ? Pressable : View;

  return (
    <Wrapper
      className="flex-1 border-2 border-[#0000001a] rounded-xl p-6 shadow-sm active:scale-100 hover:scale-105 transition-all mx-2 mt-12"
      style={{ backgroundColor: colors.white[50] }}
    >
      <View className="items-center">
        <View
          className="w-16 h-16 mb-6 rounded-2xl items-center justify-center"
          style={{ backgroundColor: themeColor + '33' }}
        >
          {icon}
        </View>
        <Text
          className="mb-4 text-center font-bold"
          style={[typography.h4, { color: colors.black[500] }]}
        >
          {title}
        </Text>
        <Text
          className="text-gray-600 text-center mb-4"
          style={[typography.bodySmall, { color: colors.black[300] }]}
        >
          {description}
        </Text>
      </View>

      <View className="gap-3 mt-2">
        {bullets.map((bullet, index) => (
          <View key={index} className="flex-row items-center">
            <View
              className="w-2 h-2 rounded-full mr-3"
              style={{ backgroundColor: bullet.color }}
            />
            <Text
              className="text-sm text-gray-600"
              style={[typography.bodyXs, { color: colors.gray[600] }]}
            >
              {bullet.text}
            </Text>
          </View>
        ))}
      </View>
      <CustomButton
        className="rounded-md h-11 px-6 mt-8 flex-row items-center justify-center"
        style={{ backgroundColor: themeColor }}
        onPress={onPress}
        title={buttonText}
        textStyle={[typography.h6, { color: colors.white[50] }]}
      />
    </Wrapper>
  );
};

export default ServiceCard;
