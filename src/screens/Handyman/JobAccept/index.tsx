import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';
import {
  CheckCircle,
  Navigation,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  Zap,
  ArrowRight,
} from 'lucide-react-native';
import { typography } from '../../../design-system';
import { colors } from '../../../design-system/colors';
import { useSelector } from 'react-redux';
import { RootSate } from '../../../redux/Store/store';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import { navigateToScreen } from '../../../utils/navigation';
import { horizontalScale, verticalScale } from '../../../utils/screenSize';

interface Job {
  id: number;
  customerName: string;
  customerImage: string;
  serviceName: string;
  description: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
    type?: 'home' | 'office' | 'other';
  };
  timing: {
    date: string;
    timeSlot: string;
    urgency: 'standard' | 'urgent' | 'emergency';
  };
  budget: number;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  urgency: 'standard' | 'urgent' | 'emergency';
  distance: string;
  estimatedDuration: string;
}

interface Props {
  job: Job;
  onStartNavigation: (job: Job) => void;
  onContactCustomer: () => void;
  onViewDashboard: () => void;
  onChat: () => void;
}

export default function JobAcceptanceSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [notificationSent, setNotificationSent] = useState(false);
  const { width, height } = Dimensions.get('window');

  // Animated confetti pieces
  const confetti = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      left: Math.random() * width,
      top: Math.random() * (height * 0.6),
      size: 6 + Math.random() * 8,
      delay: Math.random() * 800,
      duration: 1500 + Math.random() * 1500,
      rotate: Math.random() * 360,
      colorIndex: Math.floor(Math.random() * 5),
    }));
  }, [width, height]);

  const animatedValues = useRef(
    confetti.map(() => new Animated.Value(0)),
  ).current;
  const user_data = useSelector((state: RootSate) => state.user.user);
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const user_booking = useSelector((state: RootSate) => state.booking.booking);

  useEffect(() => {
    const notifyTimer = setTimeout(() => setNotificationSent(true), 2000);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);

    // launch confetti animations
    Animated.stagger(
      30,
      animatedValues.map((av, i) =>
        Animated.timing(av, {
          toValue: 1,
          useNativeDriver: true,
          duration: confetti[i].duration,
          delay: confetti[i].delay,
        }),
      ),
    ).start();

    return () => {
      clearTimeout(notifyTimer);
      clearTimeout(confettiTimer);
      animatedValues.forEach(av => av.stopAnimation());
    };
  }, [animatedValues, confetti]);

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  const getUrgencyClasses = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const color = ['#22c55e', '#06b6d4', '#f97316', '#ef4444', '#60a5fa'];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#dffcea',
      }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="items-center justify-center mb-6">
          <View
            className="w-20 h-20 rounded-full items-center justify-center shadow-lg"
            style={{ backgroundColor: '#10b981' }}
          >
            <CheckCircle color="#fff" width={36} height={36} />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mt-4">
            🎉 Job Accepted!
          </Text>
          <Text
            className="text-center mt-2 max-w-[400px]"
            style={{
              ...typography.bodySmall,
            }}
          >
            Great! You've successfully accepted this job. The customer has been
            notified and is expecting you.
          </Text>
        </View>

        {/* Notification status card */}
        <View className="rounded-xl p-4 mb-6 bg-white-50 shadow-md">
          <View className="flex-row items-center justify-center space-x-3 gap-4">
            {notificationSent ? (
              <>
                <CheckCircle color="#10b981" width={20} height={20} />
                <Text className="text-green-600 font-medium">
                  Customer notified successfully!
                </Text>
              </>
            ) : (
              <>
                <View
                  className="w-5 h-5 rounded-full border-2"
                  style={{
                    borderColor: '#10b981',
                    borderTopColor: 'transparent',
                  }}
                >
                  {/* spinner visual only */}
                </View>
                <Text className="text-gray-600">Notifying customer...</Text>
              </>
            )}
          </View>
        </View>

        {/* Job summary card */}
        <View className="rounded-2xl p-4 bg-white-50 shadow-2xl">
          <View className="flex-row items-start space-x-4 justify-center mb-4">
            <View
              className="w-16 h-16 rounded-full"
              style={{ borderColor: 'rgba(16,185,129,0.16)' }}
            >
              {user_data && user_data.social_image ? (
                <Image
                  source={{ uri: user_data.social_image || '' }}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <View className="flex-1 items-center justify-center bg-gray-200">
                  <Text className="text-lg text-gray-700">
                    {user_data ? user_data.display_name?.charAt(0) : ''}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-1 left-4">
              <View className="flex-row items-center space-x-2 gap-5">
                <Text
                  style={{
                    ...typography.h5,
                  }}
                >
                  Service Name
                </Text>
                <View
                  className={
                    `px-3 rounded-md border items-center justify-center ${getUrgencyClasses(
                      user_booking?.urgency_level || 'standard',
                    )}` as any
                  }
                >
                  <Text
                    className=""
                    style={{
                      ...typography.link,
                    }}
                  >
                    {user_booking?.urgency_level
                      ? user_booking.urgency_level.charAt(0).toUpperCase() +
                        user_booking.urgency_level.slice(1)
                      : 'Standard'}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  ...typography.bodySmall,
                }}
              >
                for John Dohn
              </Text>
              <Text
                style={{
                  ...typography.bodySmall,
                }}
              >
                Kitchen is sinking
              </Text>
            </View>
          </View>

          {/* Details grid */}
          <View className="flex-row flex-wrap -mx-2 mb-4">
            <View className="w-1/2 px-2 mb-3">
              <View className="flex-row items-center space-x-2">
                <DollarSign width={18} height={18} color="#10b981" />
                <View className="ml-3">
                  <Text
                    style={{
                      ...typography.bodySmall,
                    }}
                  >
                    Payment
                  </Text>
                  <Text
                    style={{
                      ...typography.h5,
                      color: colors.secondary[400],
                    }}
                  >
                    $ 19000
                  </Text>
                </View>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-3">
              <View className="flex-row items-center space-x-2">
                <Clock width={18} height={18} color="#2563eb" />
                <View className="ml-3">
                  <Text className="text-sm text-gray-600">Duration</Text>
                  <Text className="font-medium text-gray-900">2 min</Text>
                </View>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-3">
              <View className="flex-row items-center space-x-2">
                <MapPin width={18} height={18} color="#7c3aed" />
                <View className="ml-3">
                  <Text className="text-sm text-gray-600">Location</Text>
                  <Text className="font-medium text-gray-900">1900 away</Text>
                </View>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-3">
              <View className="flex-row items-center space-x-2">
                <Calendar width={18} height={18} color="#f97316" />
                <View className="ml-3">
                  <Text className="text-sm text-gray-600">Scheduled</Text>
                  <Text className="font-medium text-gray-900">2 to 3</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Address */}
          <View className="bg-gray-50 rounded-lg p-4">
            <Text className="font-semibold text-gray-900">Service Address</Text>
            <Text className="text-gray-700 mt-4">Township</Text>
            <Text className="text-sm text-gray-600 mt-1">
              {formatDate(user_booking?.time ?? '')}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View className="mt-6 items-center space-y-4">
          <Pressable
            // onPress={() => onStartNavigation(job)}
            style={{
              width: horizontalScale(375),
              height: verticalScale(45),
              borderRadius: 8,
              backgroundColor: '#10b981',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Navigation color="#fff" width={20} height={20} />
            <Text
              className="ml-3"
              style={{
                ...typography.h6,
              }}
            >
              Start Navigation to Customer
            </Text>
            <ArrowRight
              color="#fff"
              width={18}
              height={18}
              style={{ marginLeft: 10 }}
            />
          </Pressable>

          <View className="flex-row gap-8 mt-6">
            <Pressable
              //   onPress={onContactCustomer}
              style={{
                width: horizontalScale(170),
                height: verticalScale(45),
                borderRadius: 8,
                backgroundColor: '#fff',
                borderColor: '#10b981',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View className="flex-row items-center">
                <Phone width={18} height={18} color="#10b981" />
                <Text className="ml-2 text-green-600">Call Customer</Text>
              </View>
            </Pressable>

            <Pressable
              //   onPress={onChat}
              style={{
                width: horizontalScale(170),
                height: verticalScale(45),
                borderRadius: 8,
                backgroundColor: '#fff',
                borderColor: '#10b981',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View className="flex-row items-center">
                <MessageCircle width={18} height={18} color="#10b981" />
                <Text className="ml-2 text-green-600">Send Message</Text>
              </View>
            </Pressable>
          </View>

          <Pressable
            onPress={() => navigateToScreen(navigation, 'Serv')}
            className="w-full rounded-xl py-3 items-center justify-center mt-4"
          >
            <Text className="text-gray-600" style={{
                ...typography.h6
            }}>Back to Dashboard</Text>
          </Pressable>
        </View>

        {/* Pro tips */}
        <View className="mt-6 rounded-xl p-4 bg-white-50 shadow-md">
          <View className="flex-row items-start space-x-3">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center"
              style={{ backgroundColor: '#3b82f6' }}
            >
              <Zap color="#fff" width={16} height={16} />
            </View>
            <View className="flex-1 left-3">
              <Text className="font-semibold text-gray-900 mb-2">
                Pro Tips for Success
              </Text>
              <View>
                <Text className=" text-gray-700" style={{
                    ...typography.bodyXs
                }}>
                  • Contact the customer before heading
                </Text>
                <Text className=" text-gray-700" style={{
                    ...typography.bodyXs
                }}>
                  • Arrive on time and call if you're running late
                </Text>
                <Text className=" text-gray-700" style={{
                    ...typography.bodyXs
                }}>
                  • Take before/after photos for your portfolio
                </Text>
                <Text className=" text-gray-700" style={{
                    ...typography.bodyXs
                }}>
                  • Provide excellent service to earn 5-star reviews
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Confetti layer - absolute positioned */}
        {showConfetti && (
          <View className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
            {confetti.map((c, i) => {
              const av = animatedValues[i];
              const translateY = av.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200 + Math.random() * 200],
              });
              const opacity = av.interpolate({
                inputRange: [0, 0.6, 1],
                outputRange: [0, 1, 0],
              });
              const rotate = av.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', `${c.rotate}deg`],
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    position: 'absolute',
                    left: c.left,
                    top: c.top,
                    width: c.size,
                    height: c.size,
                    borderRadius: c.size / 2,
                    backgroundColor: color[c.colorIndex % color.length],
                    transform: [{ translateY }, { rotate }],
                    opacity,
                  }}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
