import React, { useState } from 'react';
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import IMAGES from '../../constants/Images';
import {
  verticalScale,
  horizontalScale,
  fontScale,
} from '../../utils/screenSize';
import { colors, typography } from '../../design-system';
import { Bell, ArrowLeft } from 'lucide-react-native';
import UserCard from '../Card';

const FixedHeader = ({
  onBack,
  currentStep,
}: {
  onBack?: () => void;
  currentStep: number;
}) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const steps = ['Service Category', 'Specific SubCat', 'Specific Service'];

  return (
    <View
      style={{
        marginTop:
          Platform.OS === 'ios' ? verticalScale(60) : verticalScale(10),
      }}
    >
      {/* Top Navigation */}
      <View>
        <View className="flex-row items-center justify-between px-4 py-4">
          <View className="flex-row items-center">
            <View
              className="items-center justify-center"
              style={{
                width: horizontalScale(70),
                height: verticalScale(30),
                backgroundColor: colors.secondary[50],
              }}
            >
              <Image
                source={IMAGES.logo}
                style={{
                  width: horizontalScale(70),
                  height: verticalScale(30),
                }}
              />
            </View>
          </View>

          {/* Bell & Avatar */}
          <View className="flex-row items-center space-x-3 gap-4">
            <TouchableOpacity className="relative p-2">
              <Bell className="w-5 h-5" />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white text-xs">3</Text>
              </View>
            </TouchableOpacity>

            {/* Avatar Clickable */}
            <TouchableOpacity
              className="relative h-8 w-8 rounded-full"
              onPress={() => setIsProfileVisible(true)}
            >
              <Image
                source={{ uri: 'https://avatar.vercel.sh/demo@kikfix.com' }}
                style={{ height: 32, width: 32, borderRadius: 999 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <View className="flex-row items-center py-6 px-6">
          {onBack && (
            <TouchableOpacity
              className="mr-3 w-8 h-8 items-center justify-center bg-gray-200 rounded-full"
              onPress={onBack}
            >
              <ArrowLeft size={15} />
            </TouchableOpacity>
          )}
          <Text style={typography.h3}>
            {currentStep === 4
              ? 'Location and Timing'
              : currentStep === 5
              ? 'Available Handyman'
              : currentStep === 6
              ? 'Booking Details'
              : 'Request a Service'}
          </Text>
        </View>
      </View>

      {/* Step Indicator */}
      {currentStep === 5 || currentStep === 6 ? null : (
        <View className="px-8 py-4">
          <View className="flex-row items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep - 1;
              const isActive = index === currentStep - 1;

              return (
                <View
                  key={index}
                  className="flex-row items-center justify-center"
                >
                  <View
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted || isActive ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Text className="text-white-50 font-medium">✓</Text>
                    ) : (
                      <Text
                        className={`text-sm font-medium ${
                          isActive ? 'text-white-50' : 'text-gray-500'
                        }`}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    className={`left-2 w-[58px] ${
                      isActive ? 'font-medium text-gray-900' : 'text-gray-500'
                    }`}
                    style={{ fontSize: fontScale(14) }}
                    numberOfLines={2}
                  >
                    {step}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Modal for profile card */}
      <Modal
        visible={isProfileVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsProfileVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setIsProfileVisible(false)}
        >
          <View style={styles.modalContent}>
            <UserCard
              name="Matt Stevens"
              email="demo@kikfix.com"
              role="Fixer"
              avatar="https://avatar.vercel.sh/demo@kikfix.com"
              onProfilePress={() => {
                console.log('Go to profile');
                setIsProfileVisible(false);
              }}
              onHistoryPress={() => {
                console.log('Go to history');
                setIsProfileVisible(false);
              }}
              onEarningsPress={() => {
                console.log('Go to earnings');
                setIsProfileVisible(false);
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    // width: 320,
    // borderRadius: 16,
    // backgroundColor: '#fff',
    // padding: 16,
    // elevation: 5,
  },
});

export default FixedHeader;
