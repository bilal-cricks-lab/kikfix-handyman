import React, { useMemo, useCallback } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { SpecificService } from '../../types/service';
import { WrenchIcon } from 'lucide-react-native';

const SpecificServices = ({
  services = [],
  selectedSubcategoryId,
  onBack,
  onNext,
}: {
  services: SpecificService[];
  selectedSubcategoryId: number;
  onBack: () => void;
  onNext: (service: SpecificService) => void;
}) => {
  function formatDurationRange(min: number, max: number): string {
    const minHours = Math.floor(min / 60);
    const maxHours = Math.ceil(max / 60);

    if (minHours === maxHours) {
      return `${minHours} hr`;
    }

    return `${minHours} - ${maxHours} hr`;
  }
  // ✅ Memoize filtered services for performance
  const filteredServices = useMemo(() => {
    return services.filter(
      service => service.subcategory_id === selectedSubcategoryId,
    );
  }, [services, selectedSubcategoryId]);

  // ✅ Memoized renderItem for performance
  const renderItem = useCallback(
    ({ item }: { item: SpecificService }) => {
      // const fixer = item.fixer_services?.[0]; // if needed
      return (
        <TouchableOpacity
          className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
          onPress={() => onNext(item)}
        >
          <View className="flex-row items-center gap-3">
            <View className="p-2 bg-gray-200 rounded-lg">
              <WrenchIcon className="w-5 h-5" />
            </View>
            <Text className="font-medium">{item.name}</Text>
          </View>

          <Text className="text-sm text-gray-500">{item.description}</Text>

          <View className="flex-row items-center justify-between w-full mt-2">
            <View className="flex-col">
              <Text className="font-medium">
                $ {item.min_price} - {item.max_price} / hr
              </Text>
              <Text className="text-xs text-gray-500">
                {formatDurationRange(item.min_duration, item.max_duration)}{' '}
                typical
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [onNext],
  );

  return (
    <View className="flex-1 bg-white-50 px-6">
      <Text className="text-xl font-bold mb-6 pt-6">
        Select Specific Service
      </Text>
      <FlatList
        data={filteredServices}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

export default SpecificServices;
