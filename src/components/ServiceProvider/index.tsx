import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, StyleSheet} from "react-native";
import { Star, MapPin, Clock, MessageSquare, Heart, Phone, Filter } from "lucide-react-native";
import { verticalScale } from "../../utils/screenSize";
import { colors } from "../../design-system";
import { LocationData, TimingData } from "@/types/LocationTimingProps";

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

export default ServiceProviders