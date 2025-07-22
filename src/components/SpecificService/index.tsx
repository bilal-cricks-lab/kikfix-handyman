import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { Droplets, Zap, Wind, Wrench } from "lucide-react-native";

const SpecificServiceStep = ({
  category,
  onBack,
  onNext,
}: {
  category: any;
  onBack: () => void;
  onNext: (service: any) => void;
}) => {
  const services = [
    {
      id: 1,
      name: 'Plumbing Repair',
      icon: Droplets,
      description:
        'Professional plumbing services for leaks, clogs, and installations',
      price: '$50-80/hr',
      duration: '1-4 hours typical',
    },
    {
      id: 2,
      name: 'Electrical Work',
      icon: Zap,
      description:
        'Licensed electrical services for safe and reliable installations',
      price: '$60-90/hr',
      duration: '1-6 hours typical',
    },
    {
      id: 3,
      name: 'HVAC Service',
      icon: Wind,
      description:
        'Heating, ventilation, and air conditioning maintenance and repair',
      price: 'Quote based',
      duration: 'Project dependent',
    },
    {
      id: 4,
      name: 'General Repairs',
      icon: Wrench,
      description: 'Handyman services for various home maintenance needs',
      price: '$40-70/hr',
      duration: '1-8 hours typical',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Select Specific Service</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {services.map(service => (
            <TouchableOpacity
              key={service.id}
              className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
              onPress={() => onNext(service)}
            >
              <View className="flex-row items-center gap-3">
                <View className="p-2 bg-gray-200 rounded-lg">
                  <service.icon className="w-5 h-5" />
                </View>
                <Text className="font-medium">{service.name}</Text>
              </View>
              <Text className="text-sm text-gray-500">
                {service.description}
              </Text>
              <View className="flex-row items-center justify-between w-full mt-2">
                <View className="flex-col">
                  <Text className="font-medium">{service.price}</Text>
                  <Text className="text-xs text-gray-500">
                    {service.duration}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SpecificServiceStep