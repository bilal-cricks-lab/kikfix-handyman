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

import { colors, typography } from '../../design-system';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
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
  
  return (
    <ScrollView className="flex-1 bg-white-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Choose Sub Category</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {category.map((category: SpecificService) => (
            <TouchableOpacity
              key={category.id}
              className="w-full md:w-[48%] flex-row items-center gap-4 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-
                 "
              onPress={() => onNext(category.id)}
            >
              <View className="p-3 bg-gray-200 rounded-lg">
                <Image
                  className="w-10 h-10"
                  source={{ uri: category.category_image }}
                />
              </View>
              <View>
                <Text style={{...typography.h5}}>{category.name}</Text>
                <Text style={{...typography.bodyXs, color: colors.gray[500]}}>
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

export default SpecificServiceStep;
