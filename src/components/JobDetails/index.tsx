import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Clock } from "lucide-react-native";

const JobDetailsStep = ({
  service = [],
  onBack,
  onNext,
}: {
  service: [];
  onBack: () => void;
  onNext: (jobSize: any) => void;
}) => {

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="mb-6">
          <Text className="text-xl font-bold mb-2">Job Size</Text>
          <View className="text-sm text-gray-500">
            <Text>
              <Text className="font-bold">Service:</Text> {service.name}
            </Text>
            <Text>
              <Text className="font-bold">Rate:</Text> {service.price}
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-4">
          {service.map((jobSize: any) => (
            <TouchableOpacity
              key={jobSize.id}
              className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
              onPress={() => onNext(jobSize)}
            >
              <View className="flex-row items-center justify-between w-full">
                <Text className="font-medium">{jobSize.name}</Text>
                <View className="flex-row items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <Text>{jobSize.duration}</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-500">
                {jobSize.description}
              </Text>
              <View className="flex-row flex-wrap gap-1 mt-2">
                {jobSize.tags.map((tag: any, index: any) => (
                  <View
                    key={index}
                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                  >
                    <Text className="text-xs">{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default JobDetailsStep;