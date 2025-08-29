import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { typography } from '../../../design-system';
import { horizontalScale, verticalScale } from '../../../utils/screenSize';
import Select from '../../../components/Dropdown';
import {
  fixer_accept,
  fixer_dashboard_information,
} from '../../../services/appServices/serviceCategory';
import FixedHeader from '../../../components/NavBar';
import { JobCard } from '../../../components/JobCard';
import AvailableJobs from '../../../components/AvailableJobs';
import { styles } from './styles';
import { navigateToScreen } from '../../../utils/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import JobCardProps from '../../../types/job';
import { useSelector } from 'react-redux';
import { RootSate } from '../../../redux/Store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

// Types
interface BookingData {
  id: string | number;
  // Add other booking properties as needed
  [key: string]: any;
}

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
  const [activeTab, setActiveTab] = useState<
    'available' | 'accepted' | 'progress' | 'done'
  >('available');
  const [date, setDate] = useState<string>('');
  const [acceptedJobs, setAcceptedJobs] = useState<any[]>([]);
  const [availableJobs, setAvailableJobs] = useState<BookingData[]>([]);
  const [visibleJobs, setVisibleJobs] = useState<BookingData[]>([]);
  const [in_progress_jobs, setInProgressJobs] = useState<BookingData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const PAGE_SIZE = 5; // control how many jobs load per batch

  const [fixer_data, setFixerData] = useState({
    weekly_earning: 0,
    today_earning: 0,
    total_completed_job: 0,
    weekly_completed_job: 0,
    average_rating: 0,
    avg_response_time: 0,
    member_since: '',
  });

  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const user_info = useSelector((state: RootSate) => state.user.user);

  useEffect(() => {
    fetchFixerInfo();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     try {
  //       const data = remoteMessage?.notification?.body
  //         ? JSON.parse(remoteMessage.notification.body)
  //         : null;

  //       if (data) {
  //         const data_booking = {
  //           ...data,
  //           name: remoteMessage.notification?.title ?? 'New Booking',
  //           category: {
  //             id: data.category_id,
  //             name: data.category_name ?? 'Unknown Service',
  //           },
  //           customer: {
  //             id: data.customer_id,
  //             username: data.customer_name ?? 'Anonymous',
  //             profile_image: data.customer_image ?? null,
  //           },
  //           fixer_service: {
  //             fixer_id: data.fixer_id,
  //             price: data.price ?? 0,
  //             estimated_time: data.estimated_time ?? 1,
  //           },
  //         };

  //         setAvailableJobs(prev => [data_booking, ...prev]);
  //         setVisibleJobs(prev => [data_booking, ...prev]); // push into visible list
  //       }
  //     } catch (err) {
  //       console.error('Failed to parse FCM notification:', err);
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const fetchFixerInfo = async () => {
    try {
      const response = await fixer_dashboard_information();
      const result = response.data;
      setAvailableJobs(result.available_requests);
      setVisibleJobs(result.available_requests.slice(0, PAGE_SIZE));
      setAcceptedJobs(result.fixer_accepted_requests);
      setFixerData(result);
      setInProgressJobs(result.in_progress_requests);
    } catch (error) {
      console.log(error);
    }
  };

  const fixerAcceptJob = async (jobId: string | number) => {
    setIsLoading(true);
    try {
      await fixer_accept({ booking_id: jobId });
      setAvailableJobs(prev => prev.filter(job => job.id !== jobId));
      setAcceptedJobs(prev => [
        ...prev,
        availableJobs.find(job => job.id === jobId),
      ]);
      navigateToScreen(navigation, 'Success');
    } catch (error) {
      console.log('Error accepting job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreJobs = () => {
    if (visibleJobs.length >= availableJobs.length) return;
    const nextPage = page + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setVisibleJobs(prev => [...prev, ...availableJobs.slice(start, end)]);
    setPage(nextPage);
  };

  // Memoized stats data
  const statsData = React.useMemo(
    () => [
      {
        id: 1,
        title: `Today's Earnings`,
        value: `$${fixer_data.today_earning}`,
        icon: LucideIcons.DollarSign,
        subText: null,
        iconColor: '#84cc16',
      },
      {
        id: 2,
        title: 'Completed Jobs',
        value: fixer_data.total_completed_job,
        icon: LucideIcons.CheckCircle,
        subText: `+${fixer_data.weekly_completed_job} this week`,
        subIcon: LucideIcons.TrendingUp,
        iconColor: '#9ca3af',
      },
      {
        id: 3,
        title: 'Response Time',
        value: fixer_data.avg_response_time,
        icon: LucideIcons.Clock,
        subText: 'Excellent!',
        iconColor: '#9ca3af',
      },
      {
        id: 4,
        title: 'This Week',
        value: `$${fixer_data.weekly_earning}`,
        icon: LucideIcons.TrendingUp,
        subText: `+$${fixer_data.today_earning} today`,
        iconColor: '#9ca3af',
      },
    ],
    [fixer_data],
  );

  const renderAvailableJob = React.useCallback(
    ({ item }: any) => (
      <AvailableJobs
        job={item as JobCardProps['job']}
        onAccept={() => fixerAcceptJob(item.id)}
        loading={isLoading}
      />
    ),
    [isLoading],
  );

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

  const renderServiceItem = ({ item }: any) => {
    const category = item.customer?.id ? item.category : null;
    const service = item.customer?.id ? item.fixer_service : null;
    const fixer = item.customer.id ? item.fixer : null;

    return (
      <View
        className={`flex-row items-center justify-between p-2 py-8 bg-gray-50 rounded-lg mb-2`}
      >
        <View className={`flex-row items-center`}>
          <Image
            source={{ uri: fixer.profile_image }}
            className={`w-10 h-10 rounded-full`}
          />
          <View className="">
            <Text style={{ ...typography.h6, left: 8 }}>{category.name}</Text>
            <Text style={{ ...typography.link, left: 8 }}>
              {`${fixer.first_name} ${fixer.last_name}`} •{' '}
              {`${item.min_time} ${item.max_time}`}
            </Text>
          </View>
        </View>
        <View className={`flex-row items-center gap-2`}>
          <View
            className={`flex-row items-center bg-blue-100 rounded-md px-1 py-1`}
          >
            <LucideIcons.CheckCircle size={16} color="#3b82f6" />
            <Text className={`text-xs text-blue-800 ml-1 capitalize`}>
              {item.status}
            </Text>
          </View>
          <TouchableOpacity
            className={`border border-gray-200 rounded-md px-3 py-1`}
            // onPress={() => navigateToScreen(navigation, 'track')}
          >
            <Text className={`text-xs`}>Track</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
      }}
    >
      <StatusBar barStyle={'dark-content'} />
      <FixedHeader />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: verticalScale(50),
        }}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <View style={{ gap: verticalScale(0) }}>
              <Text style={styles.welcomeTitle}>
                Good morning, {user_info?.username}! 👋
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Ready to help customers today?
              </Text>
              <View style={styles.ratingBadge}>
                <LucideIcons.Star size={14} color="#166534" />
                <Text style={styles.ratingBadgeText}>
                  {fixer_data.average_rating.toFixed(1)} Rating
                </Text>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {statsData.map(item => {
              const Icon = item.icon;
              const SubIcon = item.subIcon ? item.subIcon : null;
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
          <View style={styles.tabsContainer}>
            {[
              {
                key: 'available',
                label: 'Available',
                count: availableJobs.length,
              },
              {
                key: 'accepted',
                label: 'Accepted',
                count: acceptedJobs.length,
              },
              {
                key: 'progress',
                label: 'Progress',
                count: in_progress_jobs.length,
              },
              { key: 'done', label: 'Done', count: 0 },
            ].map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key as any)}
                  style={[styles.tab, isActive && styles.activeTab]}
                >
                  <Text style={styles.tabText}>{tab.label}</Text>
                  <Text style={styles.tabCount}>({tab.count})</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tab Content */}
          {activeTab === 'available' && (
            <View style={styles.tabContent}>
              {availableJobs.length === 0 ? (
                renderEmptyState(
                  'clock',
                  'No jobs available',
                  'Check back soon for new opportunities!',
                )
              ) : (
                <FlatList
                  data={availableJobs}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderAvailableJob}
                  onEndReached={loadMoreJobs}
                  onEndReachedThreshold={0.5}
                  removeClippedSubviews
                  initialNumToRender={5}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                />
              )}
            </View>
          )}

          {activeTab === 'accepted' && (
            <View style={styles.tabContent}>
              {acceptedJobs.length === 0 ? (
                renderEmptyState(
                  'clock',
                  'No accepted jobs',
                  'Jobs you accept will appear here.',
                )
              ) : (
                <FlatList
                  data={acceptedJobs}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <JobCard
                      job={item}
                      variant={activeTab}
                      onCounter={() => console.log('Counter pressed')}
                    />
                  )}
                />
              )}
            </View>
          )}

          {activeTab === 'progress' && (
            <View>
              {in_progress_jobs.length > 0 ? (
                <FlatList
                  data={in_progress_jobs}
                  renderItem={renderServiceItem}
                  keyExtractor={(item: any) => item.customer.id}
                />
              ) : (
                <View style={styles.tabContent}>
                  {renderEmptyState(
                    'clock',
                    'No jobs in progress',
                    "Jobs you're currently working on will appear here.",
                  )}
                </View>
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

export default HandymanDashboard;
