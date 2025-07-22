import { View, Text, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

type Category = {
  id: string | number;
  name: string;
  services: string;
  category_image: string; // or JSX.Element if you're passing component instances
};

const ServiceCategoryStep = ({
  onNext,
  categories = [],
}: {
  categories: Category[];
  onNext: (category: any) => void;
}) => {
  return (
    <ScrollView className="flex-1 bg-white-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Choose Service Category</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {categories.map((category: Category) => (
            <TouchableOpacity
              key={category.id}
              className="w-full md:w-[48%] flex-row items-center gap-4 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-
              "
            //   onPress={() => onNext(category)}
            >
              <View className="p-3 bg-gray-200 rounded-lg">
                <Image className="w-10 h-10" source={{uri: category.category_image}}/>
              </View>
              <View>
                <Text className="font-medium">{category.name}</Text>
                <Text className="text-sm text-gray-500">
                  {category.services} Services
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ServiceCategoryStep;
