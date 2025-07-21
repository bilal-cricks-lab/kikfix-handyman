import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Bell,
  House,
  Sparkles,
  Car,
  Wrench,
  Navigation,
  ChevronDown,
  Clock,
  Droplets,
  Zap,
  Wind,
  ArrowLeft,
  Search,
  Building,
  Heart,
  Star,
  MapPin,
  MessageSquare,
  Phone,
  Filter,
  Calendar,
  Mail,
} from 'lucide-react-native';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/screenSize';
import IMAGES from '../../../constants/Images';
import { colors, typography } from '../../../design-system';
import Select from '../../../components/Dropdown';
import { format, addDays, isToday, isTomorrow } from 'date-fns';

interface ServiceProvider {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  distanceValue: number;
  responseTime: string;
  hourlyRate: number;
  specialties: string[];
  isVerified: boolean;
  isAvailable: boolean;
  completedJobs: number;
  availableTimeSlots: string[];
  serviceAreas: string[];
}

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

interface ServiceProvidersProps {
  serviceName: string;
  location: LocationData;
  timing: TimingData;
  onBack: () => void;
  onProviderSelect: (
    providerId: number,
    providerName: string,
    providerImage?: string,
    providerRating?: number,
  ) => void;
  onNext: () => void;
}

const mockProviders: ServiceProvider[] = [
  {
    id: 1,
    name: 'John Smith',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 127,
    distance: '0.8 miles',
    distanceValue: 0.8,
    responseTime: '10 mins',
    hourlyRate: 50,
    specialties: ['Plumbing', 'Emergency Repairs'],
    isVerified: true,
    isAvailable: true,
    completedJobs: 234,
    availableTimeSlots: ['8-10', '10-12', '14-16', '16-18', 'now', 'within-2h'],
    serviceAreas: ['Springfield', 'Downtown', 'Westside'],
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616c9564b68?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 89,
    distance: '1.2 miles',
    distanceValue: 1.2,
    responseTime: '15 mins',
    hourlyRate: 55,
    specialties: ['Electrical', 'Smart Home'],
    isVerified: true,
    isAvailable: true,
    completedJobs: 156,
    availableTimeSlots: ['10-12', '12-14', '16-18', '18-20'],
    serviceAreas: ['Springfield', 'Eastside', 'Midtown'],
  },
  {
    id: 3,
    name: 'Mike Davis',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 203,
    distance: '2.1 miles',
    distanceValue: 2.1,
    responseTime: '25 mins',
    hourlyRate: 45,
    specialties: ['HVAC', 'Maintenance'],
    isVerified: true,
    isAvailable: false,
    completedJobs: 278,
    availableTimeSlots: ['8-10', '14-16'],
    serviceAreas: ['Springfield', 'Northside'],
  },
  {
    id: 4,
    name: 'Lisa Chen',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 145,
    distance: '1.5 miles',
    distanceValue: 1.5,
    responseTime: '12 mins',
    hourlyRate: 60,
    specialties: ['Plumbing', 'Bathroom Renovation'],
    isVerified: true,
    isAvailable: true,
    completedJobs: 189,
    availableTimeSlots: ['8-10', '12-14', '16-18', 'within-4h'],
    serviceAreas: ['Springfield', 'Downtown', 'Southside'],
  },
];

const ServiceProviders = ({
  serviceName,
  location,
  timing,
  onBack,
  onProviderSelect,
  onNext,
}: ServiceProvidersProps) => {
  const filteredProviders = mockProviders.filter(provider => {
    const isTimeSlotAvailable = provider.availableTimeSlots.includes(
      timing.timeSlot,
    );
    const isUrgencyCompatible =
      timing.urgency === 'emergency'
        ? provider.availableTimeSlots.some(
            slot => slot.includes('now') || slot.includes('within'),
          )
        : timing.urgency === 'urgent'
        ? provider.availableTimeSlots.some(
            slot => slot.includes('within') || provider.isAvailable,
          )
        : true;
    const isWithinRange = provider.distanceValue <= 5;

    return isTimeSlotAvailable && isUrgencyCompatible && isWithinRange;
  });

  const availableProviders = filteredProviders.filter(
    provider => provider.isAvailable,
  );
  const unavailableProviders = filteredProviders.filter(
    provider => !provider.isAvailable,
  );

  const getUrgencyBadgeColor = () => {
    switch (timing.urgency) {
      case 'emergency':
        return '#ef4444';
      case 'urgent':
        return '#f97316';
      default:
        return '#3b82f6';
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

  const renderProviderItem = ({ item }: { item: ServiceProvider }) => (
    <View style={styles.providerCard}>
      <View style={styles.providerHeader}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          {item.isVerified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
          )}
          {timing.urgency === 'emergency' &&
            item.availableTimeSlots.includes('now') && (
              <View style={styles.asapBadge}>
                <Text style={styles.asapText}>ASAP</Text>
              </View>
            )}
        </View>

        <View style={styles.providerInfo}>
          <View style={styles.providerNameRow}>
            <Text style={styles.providerName}>{item.name}</Text>
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingRow}>
            <Star size={16} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.jobsCount}>{item.completedJobs} jobs</Text>
          </View>

          <View style={styles.specialtiesContainer}>
            {item.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyBadge}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.detailText}>{item.distance}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={16} color="#6b7280" />
              <Text style={styles.detailText}>{item.responseTime}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.providerFooter}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.chatButton}>
            <MessageSquare size={16} color="black" />
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Phone size={16} color="black" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${item.hourlyRate}/hr</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => {
              onProviderSelect(item.id, item.name, item.image, item.rating);
              onNext();
            }}
          >
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderUnavailableProvider = ({ item }: { item: ServiceProvider }) => (
    <View style={[styles.providerCard, styles.unavailableCard]}>
      <View style={styles.providerHeader}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.providerInfo}>
          <View style={styles.providerNameRow}>
            <Text style={styles.providerName}>{item.name}</Text>
            <Text style={styles.unavailableText}>Not Available</Text>
          </View>
          <View style={styles.ratingRow}>
            <Star size={16} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
        </View>
      </View>
      <View style={styles.unavailableFooter}>
        <Text style={styles.nextAvailableText}>
          Next available: Tomorrow morning
        </Text>
        <TouchableOpacity style={styles.scheduleButton} disabled>
          <Text style={styles.scheduleButtonText}>Schedule Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      className="bg-gray-50"
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}

      {/* Service & Location Info */}
      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <View>
            <Text style={styles.serviceNameText}>{serviceName}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#4b5563" />
              <Text style={styles.locationText}>{location.address}</Text>
            </View>
          </View>
          <View
            style={[
              styles.urgencyBadge,
              { backgroundColor: getUrgencyBadgeColor() },
            ]}
          >
            <Text style={styles.urgencyText}>
              {timing.urgency + timing.urgency}
            </Text>
          </View>
        </View>
        <View style={styles.timeInfoRow}>
          <View style={styles.timeSlotRow}>
            <Clock size={16} color="#4b5563" />
            <Text style={styles.timeSlotText}>
              {getTimeSlotLabel(timing.timeSlot)}
            </Text>
          </View>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.availableCount}>
            {availableProviders.length} available
          </Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterCard}>
        <View style={styles.filterRow}>
          <View style={styles.filterLabel}>
            <Filter size={16} color="#6b7280" />
            <Text style={styles.filterText}>Sort by:</Text>
          </View>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortButtonText}>Distance</Text>
          </TouchableOpacity>
          <View style={styles.avgPriceContainer}>
            <Text style={styles.avgPriceText}>
              Avg: $
              {Math.round(
                availableProviders.reduce((sum, p) => sum + p.hourlyRate, 0) /
                  (availableProviders.length || 1),
              )}
              /hr
            </Text>
          </View>
        </View>
      </View>

      {/* Available Providers */}
      <View style={styles.providersSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Now</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {availableProviders.length} providers
            </Text>
          </View>
        </View>
        <FlatList
          data={mockProviders}
          renderItem={renderProviderItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.emptyStateCard}>
        <Clock size={48} color="#9ca3af" />
        <Text style={styles.emptyStateTitle}>No providers available</Text>
        <Text style={styles.emptyStateText}>
          No handymen are available for your selected time slot in this area.
        </Text>
        <TouchableOpacity style={styles.emptyStateButton} onPress={onBack}>
          <Text style={styles.emptyStateButtonText}>Choose Different Time</Text>
        </TouchableOpacity>
      </View>

      {/* Unavailable Providers */}
      {unavailableProviders.length > 0 && (
        <View style={styles.unavailableSection}>
          <Text style={styles.unavailableSectionTitle}>
            Not Available for This Time
          </Text>
          <FlatList
            data={unavailableProviders}
            renderItem={renderUnavailableProvider}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* No Results Message */}
      {filteredProviders.length === 0 && (
        <View style={styles.noResultsCard}>
          <MapPin size={48} color="#9ca3af" />
          <Text style={styles.noResultsTitle}>No providers in your area</Text>
          <Text style={styles.noResultsText}>
            We couldn't find any handymen available for your location and time.
            Try expanding your search area or choosing a different time.
          </Text>
          <View style={styles.noResultsButtons}>
            <TouchableOpacity style={styles.changeTimeButton} onPress={onBack}>
              <Text style={styles.changeTimeButtonText}>Change Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.expandSearchButton}>
              <Text style={styles.expandSearchButtonText}>
                Expand Search Area
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

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
      {/* Header */}

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
            className={`w-5 h-5 rounded-md border mr-3 mt-1 items-center justify-center ${
              acceptTerms ? 'bg-green-500 border-green-500' : 'border-gray-400'
            }`}
          >
            {acceptTerms && <Text className="text-white text-xs">✓</Text>}
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
        <Text className="text-white font-medium">Confirm Booking</Text>
      </TouchableOpacity>

      <Text className="text-center text-xs text-gray-500 mt-3">
        You'll receive a confirmation and the handyman's contact details
        shortly.
      </Text>
    </ScrollView>
  );
}

const FixedHeader = ({
  onBack,
  currentStep,
}: {
  onBack?: () => void;
  currentStep: number;
}) => {
  const steps = ['Service Category', 'Specific Service', 'Job Details'];

  return (
    <View
      className=""
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
          <View className="flex-row items-center space-x-3 gap-4">
            <TouchableOpacity className="relative p-2">
              <Bell className="w-5 h-5" />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white-50">3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="relative h-8 w-8 rounded-full">
              <Image
                source={{ uri: 'https://avatar.vercel.sh/demo@kikfix.com' }}
                className="h-8 w-8 rounded-full"
                alt="User"
              />
            </TouchableOpacity>
          </View>
        </View>
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
    </View>
  );
};

// Service Category Step
const ServiceCategoryStep = ({
  onNext,
}: {
  onNext: (category: any) => void;
}) => {
  const categories = [
    {
      id: 1,
      name: 'Home Repair & Maintenance',
      icon: House,
      servicesCount: '4 services',
    },
    {
      id: 2,
      name: 'Cleaning Services',
      icon: Sparkles,
      servicesCount: '3 services',
    },
    {
      id: 3,
      name: 'Auto Services',
      icon: Car,
      servicesCount: '12 services',
    },
    {
      id: 4,
      name: 'Home Improvement',
      icon: Wrench,
      servicesCount: '3 services',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Choose Service Category</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              className="w-full md:w-[48%] flex-row items-center gap-4 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-
              "
              onPress={() => onNext(category)}
            >
              <View className="p-3 bg-gray-200 rounded-lg">
                <category.icon className="w-6 h-6" />
              </View>
              <View>
                <Text className="font-medium">{category.name}</Text>
                <Text className="text-sm text-gray-500">
                  {category.servicesCount}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Specific Service Step
const SpecificServiceStep = ({
  category,
  onBack,
  onNext,
}: {
  category: any;
  onBack: () => void;
  onNext: (service: any) => void;
}) => {
  const services = [
    {
      id: 1,
      name: 'Plumbing Repair',
      icon: Droplets,
      description:
        'Professional plumbing services for leaks, clogs, and installations',
      price: '$50-80/hr',
      duration: '1-4 hours typical',
    },
    {
      id: 2,
      name: 'Electrical Work',
      icon: Zap,
      description:
        'Licensed electrical services for safe and reliable installations',
      price: '$60-90/hr',
      duration: '1-6 hours typical',
    },
    {
      id: 3,
      name: 'HVAC Service',
      icon: Wind,
      description:
        'Heating, ventilation, and air conditioning maintenance and repair',
      price: 'Quote based',
      duration: 'Project dependent',
    },
    {
      id: 4,
      name: 'General Repairs',
      icon: Wrench,
      description: 'Handyman services for various home maintenance needs',
      price: '$40-70/hr',
      duration: '1-8 hours typical',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Select Specific Service</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {services.map(service => (
            <TouchableOpacity
              key={service.id}
              className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
              onPress={() => onNext(service)}
            >
              <View className="flex-row items-center gap-3">
                <View className="p-2 bg-gray-200 rounded-lg">
                  <service.icon className="w-5 h-5" />
                </View>
                <Text className="font-medium">{service.name}</Text>
              </View>
              <Text className="text-sm text-gray-500">
                {service.description}
              </Text>
              <View className="flex-row items-center justify-between w-full mt-2">
                <View className="flex-col">
                  <Text className="font-medium">{service.price}</Text>
                  <Text className="text-xs text-gray-500">
                    {service.duration}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Job Details Step
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

// Location Timing Step
const LocationTimingStep = ({
  jobSize,
  onBack,
  onNext,
}: {
  jobSize: any;
  onBack: () => void;
  onNext: (data: any) => void;
}) => {
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [customAddress, setCustomAddress] = useState('');
  const [value, setValue] = useState<string>('');

  const generateDates = () => {
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);

      let label = format(date, 'EEE, MMM d'); // e.g., Wed, Jul 23
      if (isToday(date)) {
        label = 'Today';
      } else if (isTomorrow(date)) {
        label = 'Tomorrow';
      }

      dates.push({
        label,
        value: format(date, 'yyyy-MM-dd'),
      });
    }

    return dates;
  };

  const data = generateDates();

  const locations = [
    {
      id: 1,
      name: 'Home',
      type: 'home',
      address: '123 Main St, Springfield, IL 62701',
    },
    {
      id: 2,
      name: 'Office',
      type: 'office',
      address: '456 Business Ave, Springfield, IL 62702',
    },
  ];

  const urgencyOptions = [
    {
      id: 'standard',
      name: 'Standard',
      timeframe: 'Within 1-2 days',
      color: 'bg-green-100',
      border: 'border-green-300',
    },
    {
      id: 'urgent',
      name: 'Urgent',
      timeframe: 'Today/Tomorrow',
      color: 'bg-orange-100',
      border: 'border-orange-300',
    },
    {
      id: 'emergency',
      name: 'Emergency',
      timeframe: 'ASAP',
      color: 'bg-red-100',
      border: 'border-red-300',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="flex-col gap-6 rounded-xl border p-4 mb-6 bg-green-100 border-green-300">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-medium text-green-900">{jobSize.name}</Text>
              <Text className="text-sm text-green-700">
                {jobSize.description}
              </Text>
            </View>
            <View className="text-right">
              <Text className="text-sm text-green-700">Step 4 of 4</Text>
              <View className="w-16 h-1 bg-green-300 rounded-full mt-1">
                <View className="w-full h-full bg-green-700 rounded-full"></View>
              </View>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">
            How urgent is this service?
          </Text>
          <View className="flex-row flex-wrap justify-between gap-3">
            {urgencyOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                className={`w-full md:w-[30%] flex-col gap-2 rounded-xl border p-3 ${
                  option.color
                } ${option.border} ${
                  selectedUrgency === option.id
                    ? 'ring-2 ring-offset-2 ring-green-500'
                    : ''
                }`}
                // onPress={() => setSelectedUrgency(option.id)}
              >
                <View className="text-center">
                  <Text className="font-medium text-sm">{option.name}</Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {option.timeframe}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">Service Location</Text>
          <TouchableOpacity className="w-full mb-3 flex-row items-center gap-2 h-12 px-4 py-2 border border-gray-300 rounded-md bg-white">
            <Navigation className="w-4 h-4" />
            <Text>Use Current Location</Text>
          </TouchableOpacity>

          <View className="space-y-2 mb-4">
            {locations.map(loc => (
              <TouchableOpacity
                key={loc.id}
                className={`flex-row items-center gap-3 p-3 rounded-xl border ${
                  selectedLocation === loc.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white'
                }`}
                onPress={() => setSelectedLocation(loc.id)}
              >
                <View className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {loc.type === 'home' ? (
                    <House className="w-4 h-4" />
                  ) : (
                    <Building className="w-4 h-4" />
                  )}
                </View>
                <View>
                  <Text className="font-medium text-sm">{loc.name}</Text>
                  <Text className="text-xs text-gray-500">{loc.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="space-y-2">
            <Text className="text-sm font-medium">
              Or enter a different address
            </Text>
            <View className="flex-row gap-2">
              <TextInput
                className="flex-1 h-12 border border-gray-300 rounded-md px-3 py-1 bg-white"
                placeholder="Enter street address, city, state"
                value={customAddress}
                onChangeText={setCustomAddress}
              />
              <TouchableOpacity
                className="h-12 w-12 rounded-md border border-gray-300 flex items-center justify-center"
                disabled={!customAddress}
              >
                <Search className="w-4 h-4" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">Preferred Date</Text>
          {/* <TouchableOpacity className="w-full flex-row items-center justify-between gap-2 h-12 px-3 py-2 border border-gray-300 rounded-md bg-white">
            <Text>Select a date</Text>
            <ChevronDown className="size-4 opacity-50" />
          </TouchableOpacity> */}
          <Select
            items={data}
            selectedValue={value}
            onValueChange={text => setValue(text)}
            placeholder="Select a date"
          />
        </View>

        <View className="mb-8">
          <Text className="text-sm font-medium mb-3">Preferred Time</Text>
          {/* <TouchableOpacity className="w-full flex-row items-center justify-between gap-2 h-12 px-3 py-2 border border-gray-300 rounded-md bg-white">
            <Text>Select a time slot</Text>
            <ChevronDown className="size-4 opacity-50" />
          </TouchableOpacity> */}

          <Select
            items={data}
            selectedValue={value}
            onValueChange={text => setValue(text)}
            placeholder="Select a date"
          />
        </View>

        <TouchableOpacity
          className="w-full h-12 px-4 py-2 bg-green-700 rounded-md flex-row items-center justify-center"
          disabled={false}
          onPress={() =>
            onNext({
              urgency: selectedUrgency,
              location: selectedLocation
                ? locations.find(l => l.id === selectedLocation)
                : customAddress,
              customAddress: customAddress,
            })
          }
        >
          <Text className="text-white-50 font-medium">
            Find Available Handymen
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-xs text-gray-500 mt-3">
          We'll show you handymen available for your selected location and time.
        </Text>
      </View>
    </ScrollView>
  );
};

// Main Component
const ServiceRequestScreen = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedJobSize, setSelectedJobSize] = useState<any>(null);
  const [timing, setTiming] = useState<TimingData>({
    date: new Date().toISOString(),
    timeSlot: '8-10',
    urgency: 'standard',
  });

  const [location, setLocation] = useState<LocationData>({
    address: '123 Main St, Springfield',
    latitude: 39.7817,
    longitude: -89.6501,
    type: 'home',
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServiceCategoryStep onNext={handleCategorySelect} />;
      case 2:
        return (
          <SpecificServiceStep
            category={selectedCategory}
            onBack={() => setStep(1)}
            onNext={handleServiceSelect}
          />
        );
      case 3:
        return (
          <JobDetailsStep
            service={selectedService}
            onBack={() => setStep(2)}
            onNext={handleJobSizeSelect}
          />
        );
      case 4:
        return (
          <LocationTimingStep
            jobSize={selectedJobSize}
            onBack={() => setStep(3)}
            onNext={handleLocationTimingSubmit}
          />
        );
      case 5:
        return (
          <ServiceProviders
            onBack={() => setStep(4)}
            serviceName={selectedService?.name || 'Plumbing'}
            timing={timing}
            location={location}
            onProviderSelect={() => {}}
            onNext={() => setStep(6)}
          />
        );
      case 6:
        return (
          <BookingForm
            onBack={() => setStep(6)}
            providerName="John Name"
            serviceName="Plumbing"
            timing={timing}
            location={location}
            onBookingComplete={() => []}
          />
        );
      default:
        return <ServiceCategoryStep onNext={handleCategorySelect} />;
    }
  };

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setStep(3);
  };

  const handleJobSizeSelect = (jobSize: any) => {
    setSelectedJobSize(jobSize);
    setStep(4);
  };

  const handleLocationTimingSubmit = (data: any) => {
    console.log('Form submitted:', {
      category: selectedCategory,
      service: selectedService,
      jobSize: selectedJobSize,
      ...data,
    });
    setTiming({
      date: data.date,
      timeSlot: data.timeSlot,
      urgency: data.urgency,
    });
    setLocation(data.location);
    setStep(5);
  };

  return (
    <View className="flex-1 bg-white-50">
      <FixedHeader
        onBack={step > 1 ? () => setStep(step - 1) : undefined}
        currentStep={step}
      />
      {renderStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: verticalScale(0),
  },
  contentContainer: {
    padding: 18,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoCard: {
    backgroundColor: '#e6ffec',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  serviceNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065f46',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 4,
  },
  urgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  urgencyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  timeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 4,
  },
  separator: {
    marginHorizontal: 8,
    color: '#6b7280',
  },
  availableCount: {
    fontSize: 14,
    color: '#4b5563',
  },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 8,
  },
  sortButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  avgPriceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  avgPriceText: {
    fontSize: 14,
    color: '#6b7280',
  },
  providersSection: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary[40],
  },
  badge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 14,
    color: '#4b5563',
  },
  providerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unavailableCard: {
    opacity: 0.6,
  },
  providerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: '#10b981',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  asapBadge: {
    position: 'absolute',
    bottom: -8,
    left: 16,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  asapText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  providerInfo: {
    flex: 1,
  },
  providerNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  favoriteButton: {
    padding: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#111827',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  jobsCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  specialtyBadge: {
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: '#374151',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  providerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  chatButtonText: {
    fontSize: 14,
    color: 'blacks',
    marginLeft: 4,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  callButtonText: {
    fontSize: 14,
    color: 'black',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  selectButton: {
    backgroundColor: colors.primary[40],
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  selectButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  unavailableSection: {
    marginTop: 24,
  },
  unavailableSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 12,
  },
  unavailableText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
  },
  unavailableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextAvailableText: {
    fontSize: 14,
    color: '#6b7280',
  },
  scheduleButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  scheduleButtonText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  emptyStateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyStateButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyStateButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  noResultsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  noResultsButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  changeTimeButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  changeTimeButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  expandSearchButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  expandSearchButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});

export default ServiceRequestScreen;
