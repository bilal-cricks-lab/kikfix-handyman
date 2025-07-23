import { verticalScale } from '../../utils/screenSize';
import { colors, typography } from '../../design-system';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

type Category = {
  id: string | number;
  name: string;
  services: string;
  category_image: string;
};

type Props = {
  categories: Category[];
  onNext: (category: any) => void;
  onLoadMore: () => void;
  isLoadingMore: boolean;
};

const ServiceCategoryStep = ({
  categories = [],
  onNext,
  onLoadMore,
  isLoadingMore,
}: Props) => {
  return (
    <View className="flex-1 bg-white-50">
      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: verticalScale(24) }}
        ListHeaderComponent={
          <Text className="text-xl font-bold mb-6">
            Choose Service Category
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-full flex-row items-center gap-4 p-4 mb-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
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
              <Text
                style={{
                  ...typography.bodyXs,
                  color: colors.gray[600],
                }}
              >
                {item.services} SubCategories
              </Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? (
            <View className="items-center py-4">
              <ActivityIndicator size="small" color="#999" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default ServiceCategoryStep;
