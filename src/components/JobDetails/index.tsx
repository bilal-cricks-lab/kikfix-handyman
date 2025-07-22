import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { Clock } from "lucide-react-native";

const JobDetailsStep = ({
  service,
  onBack,
  onNext,
}: {
  service: any;
  onBack: () => void;
  onNext: (jobSize: any) => void;
}) => {
  const jobSizes = [
    {
      id: 1,
      name: 'Quick Fix',
      duration: '1-2 hours',
      description: 'Leaky faucet, clogged drain',
      tags: ['Minor repairs', 'Simple installations'],
    },
    {
      id: 2,
      name: 'Standard Repair',
      duration: '2-4 hours',
      description: 'Toilet repair, pipe replacement',
      tags: ['Standard repairs', 'Basic installations'],
    },
    {
      id: 3,
      name: 'Major Work',
      duration: '4-8 hours',
      description: 'Multiple fixtures, complex repairs',
      tags: ['Multiple repairs', 'Complex installations'],
    },
    {
      id: 4,
      name: 'Custom Hours',
      duration: 'custom hours',
      description: 'Set your own timeframe',
      tags: ['Project-specific', 'Custom requirements'],
    },
  ];

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
          {jobSizes.map(jobSize => (
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
                {jobSize.tags.map((tag, index) => (
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