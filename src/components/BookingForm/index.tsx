import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  Calendar,
  Mail,
} from 'lucide-react-native';
import { verticalScale, horizontalScale, fontScale } from '../../utils/screenSize';
import { colors, typography } from '../../design-system';


interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
  type: 'home' | 'office' | 'other';
}

interface TimingData {
  date: string;
  timeSlot: string;
  urgency: 'standard' | 'urgent' | 'emergency';
}

interface BookingFormProps {
  providerName: string;
  serviceName: string;
  location?: LocationData;
  timing?: TimingData;
  onBack: () => void;
  onBookingComplete: () => void;
}

function BookingForm({
  providerName,
  serviceName,
  location,
  timing,
  onBack,
  onBookingComplete,
}: BookingFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [contactPreference, setContactPreference] = useState<
    'phone' | 'email' | 'text'
  >('phone');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const isValid = customerName && customerPhone && customerEmail && acceptTerms;
  const handleSubmit = () => {
    if (isValid) {
      onBookingComplete();
    }
  };

  const getTimeSlotLabel = (timeSlot: string) => {
    const slots: Record<string, string> = {
      now: 'ASAP (within 1 hour)',
      'within-2h': 'Within 2 hours',
      'within-4h': 'Within 4 hours',
      '8-10': '8:00 - 10:00 AM',
      '10-12': '10:00 AM - 12:00 PM',
      '12-14': '12:00 - 2:00 PM',
      '14-16': '2:00 - 4:00 PM',
      '16-18': '4:00 - 6:00 PM',
      '18-20': '6:00 - 8:00 PM',
      'today-evening': 'This evening (6-9 PM)',
      'tomorrow-morning': 'Tomorrow morning (8-12 PM)',
    };
    return slots[timeSlot] || timeSlot;
  };

  const getDateLabel = (dateValue: string) => {
    const date = new Date(dateValue);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-500';
      case 'urgent':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Service Summary */}
      <View className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
        <View className="flex-row justify-between items-center mb-3">
          <View>
            <Text className="text-base font-semibold text-green-800">
              {serviceName}
            </Text>
            <Text className="text-sm text-green-700">with {providerName}</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            }}
            className="w-12 h-12 rounded-full"
          />
        </View>

        {location && (
          <View className="flex-row items-center mb-2">
            <MapPin size={16} color="#4b5563" />
            <Text className="text-sm text-gray-700 ml-2">
              {location.address}
            </Text>
          </View>
        )}

        {timing && (
          <View className="flex-row items-center flex-wrap">
            <View className="flex-row items-center mr-4">
              <Calendar size={16} color="#4b5563" />
              <Text className="text-sm text-gray-700 ml-2">
                {getDateLabel(timing.date)}
              </Text>
            </View>
            <View className="flex-row items-center mr-4">
              <Clock size={16} color="#4b5563" />
              <Text className="text-sm text-gray-700 ml-2">
                {getTimeSlotLabel(timing.timeSlot)}
              </Text>
            </View>
            <View
              className={`${getUrgencyColor(
                timing.urgency,
              )} px-2 py-1 rounded-full`}
            >
              <Text className="text-xs text-white">
                {timing.urgency + timing.urgency}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Contact Information */}
      <View className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
        <Text className="text-base font-semibold mb-4">
          Contact Information
        </Text>
        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium mb-1">Full Name</Text>
            <TextInput
              style={{
                paddingLeft: horizontalScale(18),
                fontSize: fontScale(14),
                color: 'black',
                width: horizontalScale(355),
                height: verticalScale(40),
                borderColor: '#D9D9D9',
                backgroundColor: '#F3F3F5',
                borderRadius: 10,
              }}
              placeholder="Enter your full name"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>

          <View>
            <Text className="text-sm font-medium mb-1">Phone Number *</Text>
            <TextInput
              style={{
                paddingLeft: horizontalScale(18),
                fontSize: fontScale(14),
                color: 'black',
                width: horizontalScale(355),
                height: verticalScale(40),
                borderColor: '#D9D9D9',
                backgroundColor: '#F3F3F5',
                borderRadius: 10,
              }}
              placeholder="+1 (555) 123-4567"
              value={customerPhone}
              onChangeText={setCustomerPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View>
            <Text className="text-sm font-medium mb-1">Email Address *</Text>
            <TextInput
              style={{
                paddingLeft: horizontalScale(18),
                fontSize: fontScale(14),
                color: 'black',
                width: horizontalScale(355),
                height: verticalScale(40),
                borderColor: '#D9D9D9',
                backgroundColor: '#F3F3F5',
                borderRadius: 10,
              }}
              placeholder="your.email@example.com"
              value={customerEmail}
              onChangeText={setCustomerEmail}
              keyboardType="email-address"
            />
          </View>
        </View>
      </View>

      {/* Communication Preferences */}
      <View className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
        <Text className="text-base font-semibold mb-4">
          How would you like to be contacted?
        </Text>
        <View className="flex-row justify-between">
          {[
            { value: 'phone', label: 'Phone Call', icon: Phone },
            { value: 'text', label: 'Text', icon: MessageSquare },
            { value: 'email', label: 'Email', icon: Mail },
          ].map(option => {
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={option.value}
                className={`w-28 items-center p-3 rounded-lg border ${
                  contactPreference === option.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300'
                }`}
                onPress={() => setContactPreference(option.value as any)}
              >
                <Icon
                  size={20}
                  color={
                    contactPreference === option.value ? '#10b981' : '#6b7280'
                  }
                />
                <Text
                  className={`text-sm mt-2 ${
                    contactPreference === option.value
                      ? 'text-green-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Special Instructions */}
      <View className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
        <Text className="text-base font-semibold mb-4">
          Special Instructions (Optional)
        </Text>
        <TextInput
          placeholder="Any specific details, access instructions, or special requirements..."
          value={specialInstructions}
          onChangeText={setSpecialInstructions}
          multiline
          style={{
            backgroundColor: '#F3F3F5',
          }}
          numberOfLines={3}
          className="border border-gray-50 rounded-md px-3 py-2 text-base h-24 bg-gray-50"
        />
        <Text className="text-xs text-gray-500 mt-2">
          Include any relevant details like gate codes, parking instructions, or
          specific areas to focus on.
        </Text>
      </View>

      {/* Terms and Conditions */}
      <View className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
        <View className="flex-row items-start">
          <TouchableOpacity
            onPress={() => setAcceptTerms(!acceptTerms)}
            className={`w-6 h-6 rounded-md border mr-3 mt-1 items-center justify-center ${
              acceptTerms ? 'bg-green-500 border-green-500' : 'border-gray-400'
            }`}
          >
            {acceptTerms && <Text className="text-white-50 text-xs">✓</Text>}
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-sm">
              I agree to the{' '}
              <Text className="text-green-600">Terms of Service</Text> and{' '}
              <Text className="text-green-600">Privacy Policy</Text>
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              By proceeding, you agree to our terms and authorize the selected
              handyman to contact you.
            </Text>
          </View>
        </View>
      </View>

      {/* Pricing Estimate */}
      <View className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
        <Text className="text-base font-semibold mb-2">Estimated Cost</Text>
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-700">Service Rate:</Text>
            <Text className="text-sm text-gray-700">$50/hour</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-700">Estimated Duration:</Text>
            <Text className="text-sm text-gray-700">2-3 hours</Text>
          </View>
          <View className="flex-row justify-between border-t border-gray-200 pt-2">
            <Text className="text-sm font-medium text-gray-900">
              Estimated Total:
            </Text>
            <Text className="text-sm font-medium text-gray-900">
              $100 - $150
            </Text>
          </View>
        </View>
        <Text className="text-xs text-gray-500 mt-2">
          Final cost may vary based on actual work performed. No payment
          required until service is completed.
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className={`w-full py-3 rounded-md items-center justify-center ${
          isValid ? 'bg-green-600' : 'bg-gray-400'
        }`}
        onPress={handleSubmit}
        disabled={!isValid}
      >
        <Text style={{...typography.h6, color: colors.white[100]}}>Confirm Booking</Text>
      </TouchableOpacity>

      <Text className="text-center text-xs text-gray-500 mt-3">
        You'll receive a confirmation and the handyman's contact details
        shortly.
      </Text>
    </ScrollView>
  );
}

export default BookingForm;