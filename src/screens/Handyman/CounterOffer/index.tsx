import { ArrowLeft, Calendar, Check, Clock, MapPin } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fixer_counter } from '../../../services/appServices/serviceCategory';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import { useSelector } from 'react-redux';
import { RootSate } from '../../../redux/Store/store';
import { horizontalScale, verticalScale } from '../../../utils/screenSize';
import Select from '../../../components/Dropdown';
import { addDays, format, isToday, isTomorrow } from 'date-fns';
import { navigateToScreen } from '../../../utils/navigation';
import Toast from '../../../components/Toast';
import { colors, typography } from '../../../design-system';
import { generateTimeOptions, formatTime } from '../../../utils/time_format';

const reasons = [
  'Already have another appointment',
  'Travel time conflict',
  'Equipment not available',
  'Better time for quality work',
  'Other commitment',
  'Custom reason',
];

export default function CounterOfferScreen() {
  const [selectedReason, setSelectedReason] = useState('');
  const [message, setMessage] = useState('');
  const [fromTime, setFromTime] = useState<string>('');
  const [toTime, setToTime] = useState<string>('');
  const [error, setError] = useState('');
  const [date, setDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'warning',
  });

  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const user_booking = useSelector((state: RootSate) => state.booking.booking);
  
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning',
  ) => {
    setToast({ visible: true, message, type });
  };

  const fixerCounterOffer = async () => {
    const data = {
      date: date,
      min_time: `${fromTime.toString()}`.toString(),
      max_time: `${toTime?.toString()}`.toString(),
      booking_id: user_booking?.id,
      reason: selectedReason,
    };
    console.log('Counter Offer Data:', data);
    setLoading(true);
    try {
      const response = await fixer_counter(data);
      if (response.data) {
        showToast('Counter offer sent successfully!', 'success');
        setTimeout(() => {
          navigateToScreen(navigation, 'Serv');
        }, 3000);
      }
      console.log('Counter offer response:', response);
      setLoading(false);
      return response;
    } catch (error) {
      console.log('Error sending counter offer:', error);
      setLoading(false);
      throw error;
    }
  };

  const validateAndProceed = () => {
    if (!fromTime || !toTime) {
      setError('Please select both "From" and "To" times.');
      return;
    }

    if (fromTime >= toTime) {
      setError('“From” time must be earlier than “To” time.');
      return;
    }
    setError(''); // Clear error
    // Save to Redux
  };


  const timeOptions = generateTimeOptions();

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);
      let label = format(date, 'EEE, MMM d');
      if (isToday(date)) {
        label = 'Today';
      } else if (isTomorrow(date)) {
        label = 'Tomorrow';
      }
      dates.push({
        label,
        value: format(date, 'dd-MM-yyyy'),
      });
    }
    return dates;
  };
  const data = generateDates();

  return (
    <SafeAreaView className="flex-1 bg-white-50">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity>
          <ArrowLeft
            size={24}
            color="#000"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-2 text-black-900">
          Counter-Offer Time
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Job Details */}
        <View className="px-4 mt-2">
          <Text
            className="mb-2"
            style={{
              ...typography.h5,
              color: colors.black[900],
            }}
          >
            Job Details
          </Text>
          <View className="bg-gray-100 rounded-xl p-4">
            <View className="flex-row items-center">
              <Clock size={20} color="#16a34a" />
              <Text
                className="ml-2"
                style={{
                  ...typography.h6,
                }}
              >
                {user_booking?.serve}
              </Text>
            </View>
            <Text
              className="ml-7 text-gray-500"
              style={{
                ...typography.bodyXs,
              }}
            >
              Customer: {user_booking?.name}
            </Text>

            <View className="flex-row items-center mt-2">
              <MapPin size={20} color="#6b7280" />
              <Text
                className="ml-2 text-gray-700"
                style={{
                  ...typography.bodyXs,
                  lineHeight: verticalScale(20),
                  width: horizontalScale(300),
                }}
              >
                {user_booking?.address}
              </Text>
            </View>

            <View className="flex-row items-center mt-2 bg-orange-50 p-3 rounded-lg">
              <Calendar size={20} color="#f97316" />
              <Text
                className="ml-2 text-orange-700"
                style={{
                  ...typography.link,
                }}
              >
                {`Requested Time: ${user_booking?.date} at ${formatTime(
                  user_booking?.fromTime,
                )} - ${formatTime(user_booking?.toTime)}`}
              </Text>
            </View>
          </View>
        </View>

        {/* Propose New Time */}
        <View className="px-4 mt-6">
          <Text
            className="text-black-900 mb-2"
            style={{
              ...typography.h6,
            }}
          >
            Propose New Date
          </Text>
          {/* Date */}
          <Select
            items={data}
            element={<Calendar size={15} />}
            selectedValue={date}
            onValueChange={text => setDate(text)}
            placeholder="Select a date"
            custom_style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: horizontalScale(375),
              height: verticalScale(40),
              paddingLeft: horizontalScale(18),
              borderColor: '#D9D9D9',
              backgroundColor: colors.gray[100],
              borderRadius: 10,
            }}
          />

          {/* Time Slots */}
          <Text
            className="text-black-900 mb-2 top-6"
            style={{
              ...typography.h6,
            }}
          >
            Propose New Time
          </Text>
          <View className="flex-row gap-3 mt-5">
            {/* FROM */}
            <View className="flex-1">
              <Text className="text-xs text-black-900 mb-1 left-1">From</Text>
              <Select
                element={<Clock size={15} />}
                items={timeOptions}
                custom_style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: verticalScale(40),
                  paddingLeft: horizontalScale(18),
                  borderColor: '#D9D9D9',
                  backgroundColor: colors.gray[100],
                  borderRadius: 10,
                  width: horizontalScale(170),
                }}
                selectedValue={fromTime}
                onValueChange={(value: string) => {
                  setFromTime(value);
                  if (toTime && value >= toTime) {
                    setError('“From” time must be earlier than “To” time.');
                  } else {
                    setError('');
                  }
                }}
                placeholder="Start"
              />
            </View>

            {/* TO */}
            <View className="flex-1">
              <Text className="text-xs text-black-900 mb-1 left-1">To</Text>
              <Select
                element={<Clock size={15} />}
                custom_style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: verticalScale(40),
                  paddingLeft: horizontalScale(18),
                  borderColor: '#D9D9D9',
                  backgroundColor: colors.gray[100],
                  borderRadius: 10,
                  width: horizontalScale(170),
                }}
                items={timeOptions}
                selectedValue={toTime}
                onValueChange={(value: string) => {
                  setToTime(value);
                  if (fromTime >= value) {
                    setError('“From” time must be earlier than “To” time.');
                  } else {
                    setError('');
                  }
                }}
                placeholder="End"
              />
            </View>
          </View>

          {/* Reason for Change */}
          <Text className="mt-6 text-black-900 mb-2">Reason for Change</Text>
          {reasons.map(reason => {
            const isSelected = selectedReason === reason;
            return (
              <TouchableOpacity
                key={reason}
                onPress={() => setSelectedReason(reason)}
                className={`flex-row items-center p-3 mb-2 rounded-lg border ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-white-50 bg-gray-100'
                }`}
              >
                {/* Tick Icon */}
                {isSelected ? (
                  <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center mr-3">
                    <Check size={16} color="#fff" />
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border border-gray-400 mr-3" />
                )}

                {/* Reason text */}
                <Text
                  className={isSelected ? 'text-green-600' : 'text-gray-700'}
                >
                  {reason}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Additional Message */}
          <Text className="mt-6 text-gray-500 mb-2">
            Additional Message (Optional)
          </Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Add any additional details for the customer..."
            multiline
            className="border border-white-50 bg-gray-100 rounded-lg p-3 h-24 text-gray-700"
          />
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View className="flex-row p-4 bg-white-50">
        <TouchableOpacity className="flex-1 border border-gray-300 py-3 rounded-lg mr-2">
          <Text className="text-center text-gray-700 font-medium">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-green-500 py-3 rounded-lg"
          onPress={fixerCounterOffer}
        >
          <Text className="text-center text-white-50 font-medium">
            {loading ? 'Sending...' : 'Send Counter Offer'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Error Message */}
      {toast && (
        <Toast
          onClose={() => setToast(prev => ({ ...prev, visible: false }))}
          message={toast.message}
          visible={toast.visible}
          type={toast.type}
        />
      )}
    </SafeAreaView>
  );
}
