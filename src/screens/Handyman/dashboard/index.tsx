import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { colors, typography } from '../../../design-system';
import { horizontalScale, verticalScale } from '../../../utils/screenSize';
import { JobCard } from '../../../components/JobCard';
import Select from '../../../components/Dropdown';
import CustomButton from '../../../components/Button';
import { fixer_dashboard_information } from '../../../services/appServices/serviceCategory';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  isVerified?: boolean;
  rating?: number;
  completedJobs?: number;
}

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
  paymentConfirmed?: boolean;
  expiresAt?: string;
  postedTime?: string;
}

interface HandymanDashboardProps {
  user: User | null;
  earnings?: {
    today: number;
    week: number;
    month: number;
  };
  stats?: {
    completedJobs: number;
    rating: number;
    responseTime: string;
  };
  availableJobs?: Job[];
  acceptedJobs?: Job[];
  onJobSelect: (job: Job) => void;
  onJobAccept: (jobId: number) => void;
  onJobDecline: (jobId: number) => void;
  onJobCounterOffer: (jobId: number, counterOffer: any) => void;
  onStartNavigation: (job: Job) => void;
}

export const availableJobs = [
  {
    id: 1,
    customerName: 'Ali Khan',
    customerImage: 'https://i.pravatar.cc/100?img=1',
    serviceName: 'AC Repair',
    description: 'AC not cooling properly, needs gas refill and check-up.',
    location: {
      address: 'Gulshan-e-Iqbal, Karachi',
      latitude: 24.9155,
      longitude: 67.0921,
    },
    timing: {
      date: '2025-08-08',
      timeSlot: '2:00 PM - 4:00 PM',
      urgency: 'urgent',
    },
    budget: 1500,
    status: 'pending',
    urgency: 'urgent',
    distance: '5km',
    estimatedDuration: '2 hours',
    paymentConfirmed: true,
    expiresAt: '2025-08-08T14:30:00Z',
    postedTime: '2 hours ago',
  },
  {
    id: 2,
    customerName: 'Ali Khan',
    customerImage: 'https://i.pravatar.cc/100?img=1',
    serviceName: 'AC Repair',
    description: 'AC not cooling properly, needs gas refill and check-up.',
    location: {
      address: 'Gulshan-e-Iqbal, Karachi',
      latitude: 24.9155,
      longitude: 67.0921,
    },
    timing: {
      date: '2025-08-08',
      timeSlot: '2:00 PM - 4:00 PM',
      urgency: 'urgent',
    },
    budget: 1500,
    status: 'pending',
    urgency: 'urgent',
    distance: '5km',
    estimatedDuration: '2 hours',
    paymentConfirmed: true,
    expiresAt: '2025-08-08T14:30:00Z',
    postedTime: '2 hours ago',
  },
  // ... more jobs
];

export const acceptedJobs = [
  {
    id: 2,
    customerName: 'Zain Ahmed',
    customerImage: 'https://i.pravatar.cc/100?img=3',
    serviceName: 'Plumbing Fix',
    description: 'Kitchen sink leaking. Pipe may need replacement.',
    location: {
      address: 'DHA Phase 5, Karachi',
      latitude: 24.8155,
      longitude: 67.0021,
    },
    timing: {
      date: '2025-08-08',
      timeSlot: '6:00 PM - 8:00 PM',
      urgency: 'standard',
    },
    budget: 2000,
    status: 'accepted',
    urgency: 'standard',
    distance: '3km',
    estimatedDuration: '1 hour',
    paymentConfirmed: true,
    postedTime: '3 hours ago',
  },
  {
    id: 3,
    customerName: 'Zain Ahmed',
    customerImage: 'https://i.pravatar.cc/100?img=3',
    serviceName: 'Plumbing Fix',
    description: 'Kitchen sink leaking. Pipe may need replacement.',
    location: {
      address: 'DHA Phase 5, Karachi',
      latitude: 24.8155,
      longitude: 67.0021,
    },
    timing: {
      date: '2025-08-08',
      timeSlot: '6:00 PM - 8:00 PM',
      urgency: 'standard',
    },
    budget: 2000,
    status: 'accepted',
    urgency: 'standard',
    distance: '3km',
    estimatedDuration: '1 hour',
    paymentConfirmed: true,
    postedTime: '3 hours ago',
  },
];

const Sorting = [
  {
    label: 'Emergency',
    value: 'Emergency',
  },
  {
    label: 'Urgent',
    value: 'Urgent',
  },
  {
    label: 'Standard',
    value: 'Standard',
  },
];

const HandymanDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [date, setDate] = useState<string>('');
  const [fixer_data, setFixerData] = useState({
    weekly_earning: 0,
    today_earning: 0,
    total_completed_job: 0,
    weekly_completed_job: 0,
    average_rating: 0,
    avg_response_time: 0,
    member_since: '',
  });

  React.useEffect(() => {
    fetch_fixer_info();
  }, []);

  const statsData = [
    {
      id: 1,
      title: `Today's Earnings`,
      value: `$${fixer_data.today_earning}`,
      icon: 'DollarSign',
      subText: null,
      iconColor: '#84cc16',
    },
    {
      id: 2,
      title: 'Completed Jobs',
      value: fixer_data.total_completed_job,
      icon: 'CheckCircle',
      subText: `+${fixer_data.weekly_completed_job} this week`,
      subIcon: 'TrendingUp',
      iconColor: '#9ca3af',
    },
    {
      id: 3,
      title: 'Response Time',
      value: fixer_data.avg_response_time,
      icon: 'Clock',
      subText: 'Excellent!',
      iconColor: '#9ca3af',
    },
    {
      id: 4,
      title: 'This Week',
      value: `$${fixer_data.weekly_earning}`,
      icon: 'TrendingUp',
      subText: `+$${fixer_data.today_earning} today`,
      iconColor: '#9ca3af',
    },
  ];

  const jobs = activeTab === 'available' ? availableJobs : acceptedJobs;

  const fetch_fixer_info = async () => {
    try {
      const response = await fixer_dashboard_information();
      const result = response.data;
      console.log(result);
      setFixerData(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredJobs = () => {
    let jobs: any = [];
    switch (activeTab) {
      case 'available':
        jobs = availableJobs;
        break;
      case 'accepted':
        jobs = acceptedJobs;
        break;
      case 'in-progress':
        jobs = acceptedJobs.filter(job => job.status === 'in-progress');
        break;
      case 'completed':
        jobs = acceptedJobs.filter(job => job.status === 'completed');
        break;
      default:
        jobs = [];
    }
    if (filterUrgency !== 'all') {
      jobs = jobs.filter((job: any) => job.urgency === filterUrgency);
    }
    return jobs;
  };

  const filteredJobs = getFilteredJobs();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return '#ef4444';
      case 'urgent':
        return colors.secondary[500];
      default:
        return '#6b7280';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return <LucideIcons.AlertTriangle size={16} color="#ef4444" />;
      case 'urgent':
        return '<LucideIcons.Clock size={10} color="#3b82f6" />';
      default:
        return <LucideIcons.Calendar size={16} color="#6b7280" />;
    }
  };

  const getTimeUntilExpiry = (job: Job) => {
    if (!job.expiresAt) return null;

    const now = new Date();
    const expiry = new Date(job.expiresAt);
    const diffInMinutes = Math.floor(
      (expiry.getTime() - now.getTime()) / (1000 * 60),
    );

    if (diffInMinutes <= 0) return 'Expired';
    if (diffInMinutes > 60) {
      return `${Math.floor(diffInMinutes / 60)}h ${diffInMinutes % 60}m`;
    }
    return `${diffInMinutes}m`;
  };

  const renderJobItem = ({ item: job }: { item: Job }) => {
    const timeUntilExpiry = getTimeUntilExpiry(job);
    const isExpired = timeUntilExpiry === 'Expired';

    return (
      <View style={[styles.jobCard, isExpired && styles.expiredJobCard]}>
        <View style={styles.jobHeader}>
          <View style={styles.jobCustomerInfo}>
            <Image source={{ uri: job.customerImage }} style={styles.avatar} />
            <View style={styles.jobDetails}>
              <View style={styles.jobTitleRow}>
                <Text style={styles.jobTitle} numberOfLines={1}>
                  {job.serviceName}
                </Text>
                <View
                  style={[
                    styles.urgencyBadge,
                    { backgroundColor: getUrgencyColor(job.urgency) },
                  ]}
                >
                  <LucideIcons.Clock size={12} color={colors.white[100]} />
                  <Text style={styles.urgencyText}>{job.urgency}</Text>
                </View>
              </View>
              <Text style={styles.customerName}>by {job.customerName}</Text>
              <Text style={styles.jobDescription} numberOfLines={2}>
                {job.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.jobPrice}>
          <Text style={styles.priceText}>${job.budget}</Text>
          <Text style={styles.durationText}>{job.estimatedDuration}</Text>
          {/* {job.postedTime && (
            <Text style={styles.postedTime}>{job.postedTime}</Text>
          )} */}
        </View>

        <View style={styles.jobInfoRow}>
          <View style={styles.infoItem}>
            <LucideIcons.MapPin size={14} color="#6b7280" />
            <Text style={styles.infoText} numberOfLines={1}>
              {job.location.address}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <LucideIcons.Clock size={14} color="#6b7280" />
            <Text style={styles.infoText}>{job.timing.timeSlot}</Text>
          </View>
          <View style={styles.infoItem}>
            <LucideIcons.Navigation size={14} color="#6b7280" />
            <Text style={styles.infoText}>{job.distance} away</Text>
          </View>
        </View>

        <View style={styles.jobActions}>
          <View style={styles.leftActions}>
            <CustomButton
              style={styles.actionButton}
              onPress={() => {}}
              title="View Details"
              textStyle={styles.actionButtonText}
            />
            <CustomButton
              title="Message"
              style={styles.messageButton}
              element={<LucideIcons.MessageCircle size={16} color="#3b82f6" />}
              onPress={() => {}}
              textStyle={styles.messageButtonText}
            />
          </View>

          <View style={styles.rightActions}>
            <View style={styles.secondaryActions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                // onPress={() => onJobDecline(job.id)}
                disabled={isExpired}
              >
                <Text style={styles.secondaryButtonText}>Pass</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.secondaryButton, styles.counterButton]}
                // onPress={() => onJobSelect(job)}
                disabled={isExpired}
              >
                <LucideIcons.Edit3 size={14} color="#3b82f6" />
                <Text style={styles.counterButtonText}>Counter Offer</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.primaryButton, isExpired && styles.disabledButton]}
              //   onPress={() => onJobAccept(job.id)}
              disabled={isExpired}
            >
              <Text style={styles.primaryButtonText}>Accept Job</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderAcceptedJobItem = ({ item: job }: { item: Job }) => {
    return (
      <View style={styles.acceptedJobCard}>
        <View style={styles.jobHeader}>
          <View style={styles.jobCustomerInfo}>
            <Image source={{ uri: job.customerImage }} style={styles.avatar} />
            <View style={styles.jobDetails}>
              <View style={styles.jobTitleRow}>
                <Text style={styles.jobTitle} numberOfLines={1}>
                  {job.serviceName}
                </Text>
                <View style={styles.acceptedBadge}>
                  <Text style={styles.acceptedBadgeText}>Accepted</Text>
                </View>
              </View>
              <Text style={styles.customerName}>by {job.customerName}</Text>

              <View style={[styles.jobInfoRow, { marginTop: 8 }]}>
                <View style={styles.infoItem}>
                  <LucideIcons.MapPin size={14} color="#6b7280" />
                  <Text style={styles.infoText} numberOfLines={1}>
                    {job.location.address}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <LucideIcons.Clock size={14} color="#6b7280" />
                  <Text style={styles.infoText}>{job.timing.timeSlot}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.jobPrice}>
            <Text style={styles.priceText}>${job.budget}</Text>
            <Text style={styles.durationText}>{job.estimatedDuration}</Text>
          </View>
        </View>

        <View
          style={[
            styles.jobActions,
            { borderTopWidth: 1, borderTopColor: '#e5e7eb' },
          ]}
        >
          <View style={styles.leftActions}>
            <TouchableOpacity
              style={styles.callButton}
              //   onPress={() => onJobSelect(job)}
            >
              <LucideIcons.Phone size={16} color="#3b82f6" />
              <Text style={styles.callButtonText}>Call Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <LucideIcons.MessageCircle size={16} color="#3b82f6" />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.navigationButton}
            // onPress={() => onStartNavigation(job)}
          >
            <LucideIcons.Navigation size={16} color="#fff" />
            <Text style={styles.navigationButtonText}>Start Navigation</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyState = (
    icon: string,
    title: string,
    description: string,
  ) => {
    let IconComponent;
    switch (icon) {
      case 'clock':
        IconComponent = <LucideIcons.Clock size={48} color="#9ca3af" />;
        break;
      case 'check':
        IconComponent = <LucideIcons.CheckCircle size={48} color="#9ca3af" />;
        break;
      default:
        IconComponent = <LucideIcons.Clock size={48} color="#9ca3af" />;
    }

    return (
      <View style={styles.emptyState}>
        {IconComponent}
        <Text style={styles.emptyStateTitle}>{title}</Text>
        <Text style={styles.emptyStateDescription}>{description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <View style={{ gap: verticalScale(0) }}>
              <Text style={styles.welcomeTitle}>
                Good morning, {'John'}! 👋
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Ready to help customers today?
              </Text>
              <View style={styles.ratingBadge}>
                <LucideIcons.Star size={14} color="#166534" />

                <Text style={styles.ratingBadgeText}>4.6 Rating</Text>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {statsData.map(item => {
              const Icon = LucideIcons[item.icon];
              const SubIcon = item.subIcon ? LucideIcons[item.subIcon] : null;
              return (
                <View key={item.id} style={styles.statsCard}>
                  <View style={styles.cardContent}>
                    <View>
                      <Text style={styles.cardLabel}>{item.title}</Text>
                      <Text style={styles.cardValue}>{item.value}</Text>

                      {item.subText && (
                        <View style={styles.trendContainer}>
                          {SubIcon && (
                            <SubIcon
                              size={14}
                              color="#166534"
                              style={{ marginRight: 4 }}
                            />
                          )}
                          <Text style={styles.trendText}>{item.subText}</Text>
                        </View>
                      )}

                      {!item.subText && item.title === 'Response Time' && (
                        <Text style={styles.excellentText}>{item.subText}</Text>
                      )}
                    </View>

                    {Icon && <Icon size={24} color={item.iconColor} />}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Jobs Section */}
        <View style={styles.jobsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Job Opportunities</Text>
            <View style={styles.filterContainer}>
              <View style={styles.urgencyFilter}>
                <Select
                  custom_style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: verticalScale(40),
                    paddingLeft: horizontalScale(18),
                    borderColor: '#D9D9D9',
                    backgroundColor: '#F3F3F5',
                    borderRadius: 10,
                    width: horizontalScale(150),
                  }}
                  items={Sorting}
                  selectedValue={date}
                  onValueChange={text => setDate(text)}
                  placeholder="All Urgency"
                />
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View
            className={`bg-gray-100 rounded-full flex-row justify-between px-2 py-2 mb-4`}
          >
            {[
              { key: 'available', label: 'Available', count: 1 },
              {
                key: 'accepted',
                label: 'Accepted',
                count: 1,
              },
              { key: 'progress', label: 'Progess', count: 1 },
              { key: 'done', label: 'Done', count: 1 },
            ].map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  className={`flex-1 mx-1 rounded-full items-center ${
                    isActive ? 'bg-white-50' : ''
                  }`}
                >
                  <Text className="" style={{ ...typography.bodyXs, top: 1 }}>
                    {tab.label}
                  </Text>
                  <Text style={{ ...typography.bodyXs, bottom: 1 }}>
                    ({tab.count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tab Content */}
          {activeTab === 'available' && (
            <View style={styles.tabContent}>
              {filteredJobs.length === 0 ? (
                renderEmptyState(
                  'clock',
                  'No jobs available',
                  'Check back soon for new opportunities!',
                )
              ) : (
                <FlatList
                  data={filteredJobs}
                  renderItem={renderJobItem}
                  keyExtractor={item => item.id.toString()}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => (
                    <View style={styles.jobSeparator} />
                  )}
                />
              )}
            </View>
          )}

          {activeTab === 'accepted' && (
            <View style={styles.tabContent}>
              {acceptedJobs.map((job: any) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant={activeTab}
                  onAccept={() => console.log('Accept', job.id)}
                  onDecline={() => console.log('Decline', job.id)}
                  onCounterOffer={() => console.log('Counter', job.id)}
                  onNavigate={() => console.log('Navigate', job.id)}
                  onViewDetails={() => console.log('View', job.id)}
                />
              ))}
            </View>
          )}

          {activeTab === 'progress' && (
            <View style={styles.tabContent}>
              {renderEmptyState(
                'clock',
                'No jobs in progress',
                "Jobs you're currently working on will appear here.",
              )}
            </View>
          )}

          {activeTab === 'done' && (
            <View style={styles.tabContent}>
              {renderEmptyState(
                'check',
                'No completed jobs today',
                'Recently completed jobs will appear here.',
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 12,
  },
  welcomeSection: {
    marginBottom: 16,
  },
  welcomeHeader: {
    marginBottom: 16,
  },
  welcomeTitle: {
    ...typography.h4,
  },
  welcomeSubtitle: {
    ...typography.bodyXs,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    marginTop: verticalScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.secondary[100],
    height: verticalScale(25),
    width: horizontalScale(100),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary[400],
  },
  ratingBadgeText: {
    ...typography.link,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  verifiedBadgeText: {
    fontSize: 12,
    color: '#1d4ed8',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  earningsCard: {
    flex: 1,
    minWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: colors.secondary[600],
    borderRadius: 12,
    padding: 16,
  },
  statsCard: {
    flex: 1,
    minWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  cardContent: {
    gap: verticalScale(5),
  },
  cardLabel: {
    ...typography.bodySmall,
  },
  cardValue: {
    ...typography.h1,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trendText: {
    fontSize: 12,
    color: '#166534',
    marginLeft: 4,
  },
  excellentText: {
    fontSize: 12,
    color: '#166534',
    marginTop: 4,
  },
  todayEarnings: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  jobsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h5,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urgencyFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  filterInput: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#166534',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#166534',
  },
  tabCount: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
  },
  tabContent: {
    minHeight: 200,
    marginTop: verticalScale(12),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: horizontalScale(360),
    marginBottom: 12,
    padding: 10,
    borderWidth: 0.2,
    borderColor: colors.gray[500],
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary[500],
  },
  expiredJobCard: {
    borderLeftColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  acceptedJobCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  jobCustomerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: horizontalScale(35),
    height: verticalScale(35),
    borderRadius: 24,
    marginRight: 12,
  },
  jobDetails: {
    flex: 1,
  },
  jobTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  jobTitle: {
    ...typography.h5,
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: horizontalScale(75),
    height: verticalScale(25),
    borderRadius: 4,
    marginLeft: horizontalScale(10),
  },
  urgencyText: {
    ...typography.link,
    color: colors.white[100],
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  expiredTimeBadge: {
    backgroundColor: '#ef4444',
  },
  timeBadgeText: {
    fontSize: 10,
    color: '#6b7280',
    marginLeft: 4,
  },
  customerName: {
    ...typography.bodyXs,
    color: colors.black[400],
  },
  jobDescription: {
    ...typography.bodyXs,
    color: colors.black[400],
    lineHeight: 0,
  },
  jobPrice: {
    alignItems: 'center',
  },
  priceText: {
    ...typography.h2,
    color: colors.secondary[400],
  },
  durationText: {
    ...typography.bodyXs,
    color: colors.gray[500],
  },
  postedTime: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 4,
  },
  jobInfoRow: {
    marginTop: verticalScale(15),
    marginBottom: 12,
    gap: verticalScale(6),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8),
    flex: 1,
  },
  infoText: {
    ...typography.bodyXs,
    color: colors.black[400],
  },
  jobActions: {
    alignItems: 'center',
    gap: verticalScale(15),
  },
  leftActions: {
    alignItems: 'center',
    gap: verticalScale(10),
  },
  rightActions: {
    alignItems: 'center',
  },
  secondaryActions: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: horizontalScale(16),
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(320),
    height: verticalScale(40),
  },
  actionButtonText: {
    ...typography.link,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(5),
  },
  messageButtonText: {
    ...typography.link,
    color: '#3b82f6',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    width: horizontalScale(150),
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  counterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#93c5fd',
  },
  counterButtonText: {
    fontSize: 12,
    color: '#3b82f6',
    marginLeft: 4,
  },
  primaryButton: {
    marginTop: verticalScale(15),
    backgroundColor: colors.secondary[400],
    borderColor: '#d1d5db',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(320),
    height: verticalScale(40),
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  primaryButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  acceptedBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  acceptedBadgeText: {
    fontSize: 10,
    color: '#1d4ed8',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  callButtonText: {
    fontSize: 12,
    color: '#3b82f6',
    marginLeft: 4,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#166534',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navigationButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 4,
  },
  jobSeparator: {
    height: 12,
  },
});

export default HandymanDashboard;
