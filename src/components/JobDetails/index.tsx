import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Subcategory, SpecificService } from '../../types/service';

const JobDetailsStep = ({
  services = [],
  selectedSubcategoryId,
  onBack,
  onNext,
}: {
  services: Subcategory[];
  selectedSubcategoryId: number;
  onBack: () => void;
  onNext: (service: any) => void;
}) => {
  const selectedSubcategory = services.find(
    (sub) => sub.id === selectedSubcategoryId,
  );

  const filteredServices: SpecificService[] =
    selectedSubcategory?.services_list ?? [];

  return (
    <>
    <ScrollView className="flex-1 bg-white-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Select Specific Service</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {filteredServices.map((service: SpecificService) => (
            <TouchableOpacity
              key={service.id}
              className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
              onPress={() => onNext(service.id)}
            >
              <Text className="font-medium text-black-50">{service.name}</Text>
              <Text className="text-sm text-gray-500">
                {service.description}
              </Text>
              <View className="flex-row items-center justify-between w-full mt-2">
                <View className="flex-col">
                  <Text className="font-medium">Rs. {service.price}</Text>
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
    </>
  );
};

export default JobDetailsStep;
