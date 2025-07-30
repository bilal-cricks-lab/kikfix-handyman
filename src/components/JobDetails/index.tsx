import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Clock } from 'lucide-react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootSate, Store } from '../../redux/Store/store';
import { JobDetails } from '../../types/service';
import { setBookingData } from '../../redux/Reducers/bookingSlice';

const JobDetailsStep = ({
  service = [],
  onBack,
  onNext,
}: {
  service: JobDetails[];
  onBack: () => void;
  onNext: (jobSize: any) => void;
}) => {
  const user_state_ids = useSelector(
    (state: RootSate) => state.booking.booking,
  );

  React.useEffect(() => {
    console.log(user_state_ids);
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="mb-6">
          <Text className="text-xl font-bold mb-2">Job Size</Text>
          <View className="text-sm text-gray-500">
            <Text>
              <Text className="font-bold">Service:</Text> {}
            </Text>
            <Text>
              <Text className="font-bold">Rate:</Text> {}
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-4">
          {service.map((jobSize: JobDetails) => {
            const tags = jobSize.tags
              .replace(/[\[\]\\]/g, '')
              .split(',')
              .map((tag: string) => tag.trim()); 
            return (
            <TouchableOpacity
              key={jobSize.id}
              className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
              onPress={() => {
                onNext(jobSize.id)
                Store.dispatch(setBookingData({
                  category_id: user_state_ids?.category_id,
                  subcategory_id: user_state_ids?.subcategory_id,
                  service_id: user_state_ids?.service_id,
                  service_detail_id: jobSize.id,
                  fixer_id: user_state_ids?.fixer_id,
                  name: user_state_ids?.name,
                  serve: jobSize.title,
                }))
              }}
            >
              <View className="flex-row items-center justify-between w-full">
                <Text className="font-medium">{jobSize.title}</Text>
                <View className="flex-row items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" size={20}/>
                  <Text>{jobSize.min_duration}-{jobSize.max_duration} Hours</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-500">
                {jobSize.description}
              </Text>
              <View className="flex-row flex-wrap gap-1 mt-2">
                {tags.map((tag: any, index: any) => (
                  <View
                    key={index}
                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                  >
                    <Text className="text-xs">{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          )})}
        </View>
      </View>
    </ScrollView>
  );
};

export default JobDetailsStep;
