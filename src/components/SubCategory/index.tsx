// import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

// type SpecificService = {
//   id: number | string;
//   name: string;
//   description: string;
//   price: number;
//   duration: string;
// };

// const SpecificServiceStep = ({
//   onBack,
//   onNext,
//   categories = [],
// }: {
//   categories: SpecificService[];
//   onBack: () => void;
//   onNext: (service: SpecificService) => void;
// }) => {
//   return (
//     <ScrollView className="flex-1 bg-white-50">
//       <View className="p-6">
//         <Text className="text-xl font-bold mb-6">Select Specific Service</Text>
//         <View className="flex-row flex-wrap justify-between gap-4">
//           {categories.map((service: SpecificService) => (
//             <TouchableOpacity
//               key={service.id}
//               className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
//               onPress={() => onNext(service)}
//             >
//               <Text className="font-medium">{service.name}</Text>
//               <Text className="text-sm text-gray-500">
//                 {service.description}
//               </Text>
//               <View className="flex-row items-center justify-between w-full mt-2">
//                 <View className="flex-col">
//                   <Text className="font-medium">Rs. {service.price}</Text>
//                   <Text className="text-xs text-gray-500">
//                     {service.duration}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SpecificServiceStep;

import React, { useMemo, useCallback, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
import { colors, typography } from '../../design-system';
import { SpecificService } from '../../types/service';

const SpecificServiceStep = ({
  onBack,
  onNext,
  category = [],
}: {
  category: SpecificService[];
  onBack: () => void;
  onNext: (service: any) => void;
}) => {
  // Memoize filtered data to avoid re-filtering on every render
  const filteredCategories = useMemo(() => {
    return category.filter((item: SpecificService) => item.id);
  }, [category]);

  useEffect(() => {
    console.log(filteredCategories);
  }, [filteredCategories]);

  // Memoize renderItem for FlatList optimization
  const renderItem = useCallback(
    ({ item }: { item: SpecificService }) => (
      <TouchableOpacity
        key={item.id}
        className="w-full md:w-[48%] flex-row items-center gap-4 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-"
        onPress={() => onNext(item.id)}
      >
        <View className="p-3 bg-gray-200 rounded-lg">
          <Image
            className="w-10 h-10"
            source={{ uri: item.category_image }}
          />
        </View>
        <View>
          <Text style={{ ...typography.h5 }}>{item.name}</Text>
          <Text style={{ ...typography.bodyXs, color: colors.gray[500] }}>
            {item.services} Services
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [onNext]
  );

  return (
    <View className="flex-1 bg-white-50 px-6">
      <Text className="text-xl font-bold mb-6 pt-6">Choose Sub Category</Text>
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 16,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

export default SpecificServiceStep;