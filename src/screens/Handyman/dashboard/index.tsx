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
  Pressable,
  Alert,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { colors, typography } from '../../../design-system';
import { horizontalScale, verticalScale } from '../../../utils/screenSize';
import Select from '../../../components/Dropdown';
import {
  fixer_accept,
  fixer_dashboard_information,
  get_single_booking,
  job_complete_fixer,
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
import { RootSate, Store } from '../../../redux/Store/store';
import { formatTime } from '../../../utils/time_format';
import { pusherService } from '../../../services/pusherService';
import { useRoute } from '@react-navigation/native';

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
  const [loadingJobId, setLoadingJobId] = React.useState<
    number | null | string
  >(null);
  // const [shouldScrollToItem, setShouldScrollToItem] = useState(false);

  const route = useRoute();

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
    let isMounted = true;

    const setupPusher = async () => {
      if (!isMounted || !user_info?.id) return;
      
      try {
        // Initialize Pusher service
        await pusherService.initialize();
        
        // Subscribe to fixer-specific channel
        await pusherService.subscribeToChannel(
          `private-fixer.${user_info.id}`,
          'booking.created',
          (data) => {
            console.log('📨 New booking received:', data);
            
            if (data.booking && isMounted) {
              // Add the new booking to available jobs
              setAvailableJobs(prevJobs => {
                const alreadyExists = prevJobs.some(
                  job => job.id === data.booking.id,
                );
                if (alreadyExists) return prevJobs; // avoid duplicates
                return [data.booking, ...prevJobs];
              });
              
              // Show notification
              Alert.alert(
                'New Booking Available',
                'A new job has been posted and is available for you to accept.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              );
            }
          }
        );
        
      } catch (error) {
        console.error('Failed to setup Pusher:', error);
      }
    };

    setupPusher();

    return () => {
      isMounted = false;
      pusherService.disconnect();
    };
  }, [user_info?.id]);

  // const flatListRef = React.useRef<FlatList>(null);

  const { bookingId } = (route.params as any) ?? {};

  // Ensure bookingId is cleaned (avoid "undefined" string issue)
  const parsedBookingId =
    bookingId && bookingId !== 'undefined' ? bookingId : null;
  useEffect(() => {
    fetchFixerInfo();
    parsedBookingId && single_booking(parsedBookingId);
  }, []);

  // useEffect(() => {
  //   if (parsedBookingId && availableJobs.length > 0 && shouldScrollToItem) {
  //     const index = availableJobs.findIndex(
  //       job => job.id.toString() === parsedBookingId.toString(),
  //     );

  //     if (index !== -1 && flatListRef.current) {
  //       console.log("Index is : ", index);
  //       // Small delay to ensure the list is rendered
  //       setTimeout(() => {
  //         flatListRef.current?.scrollToIndex({
  //           animated: true,
  //           viewPosition: 10,
  //           index: 2,
  //         });
  //         console.log("item is scrolling")
  //       }, 500);

  //       console.log("Scrolling")
  //       // Reset the flag after scrolling
  //       setShouldScrollToItem(false);
  //     }
  //   }
  // }, [availableJobs, parsedBookingId, shouldScrollToItem]);

  const single_booking = async (id: string | number) => {
    try {
      const response = await get_single_booking(id);
      console.group(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFixerInfo = async () => {
    try {
      const response = await fixer_dashboard_information();
      const result = response.data;
      // Sort available jobs: newest first (assuming 'created_at' exists)
      const sortedAvailable = [...result.available_requests].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setAvailableJobs(sortedAvailable);
      setVisibleJobs(sortedAvailable.slice(0, PAGE_SIZE));
      setAcceptedJobs(result.fixer_accepted_requests);
      setFixerData(result);
      setInProgressJobs(result.in_progress_requests);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // const mapApiToBooking = (job: any): BookingRequest => {
  //   return {
  //     id: job?.id,
  //     fixer_id: job?.fixer_id,
  //     category_id: job?.category_id,
  //     subcategory_id: job?.subcategory_id,
  //     service_id: job?.service_id,
  //     service_detail_id: job?.service_detail_id,
  //     date: job?.date, // already in DD-MM-YYYY
  //     time: job?.min_time, // you can also merge min_time + max_time if needed
  //     address: job?.address,
  //     name: `${job?.customer?.first_name} ${job?.customer?.last_name}`,
  //     serve: job?.service?.name, // or category/service detail name
  //     latitude: job?.latitude,
  //     longitude: job?.longitude,
  //     urgency_level: job?.urgency_level,
  //     duration: job?.duration ?? null,
  //     price: job?.fixer_service?.price ?? null,
  //     fromTime: job?.min_time,
  //     toTime: job?.max_time,
  //     instruction: job?.instruction,
  //     distance: job?.distance,
  //   };
  // };


  const fixerAcceptJob = async (id: string | number) => {
    console.log('The id is: ', id);
    const data = {
      booking_id: id,
    };
    console.log('Accepting job with data:', data);
    setIsLoading(true);
    try {
      const response = await fixer_accept(data);
      setLoadingJobId(id);
      console.log('Job accepted successfully:', response);
      setAvailableJobs(prev => prev.filter(job => job.id !== id));
      setAcceptedJobs(prev => [...prev, response.data]);
      setIsLoading(false);
      navigateToScreen(navigation, 'Success');
      return response;
    } catch (error) {
      console.log('Error accepting job:', error);
      // Handle error (e.g., show error message)
      setIsLoading(false);
    }
  };

  const fixer_complete_job = async (id: number | string) => {
    const data = {
      booking_id: id,
    };
    console.log(data);
    setIsLoading(true);
    try {
      const response = await job_complete_fixer(data);
      console.log(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
        loading={isLoading && loadingJobId === item.id} // ✅ only true for the clicked job
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
    const fixer = item.customer.id ? item.fixer : null;

    return (
      <View
        className={`flex-row items-center justify-between p-2 py-6 bg-gray-50 rounded-lg mb-2`}
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
              {`${formatTime(item.min_time)} ${formatTime(item.max_time)}`}
            </Text>
          </View>
        </View>
        <View className={`flex-row items-center gap-2`}>
          <Pressable
            className={`flex-row items-center bg-green-100 rounded-md px-10 py-1`}
            onPress={() => fixer_complete_job(item.id)}
          >
            <Text
              style={{
                ...typography.link,
                color: colors.secondary[500],
              }}
            >
              Done
            </Text>
          </Pressable>
          {/* <TouchableOpacity
            className={`border border-gray-200 rounded-md px-3 py-1`}
            // onPress={() => navigateToScreen(navigation, 'track')}
          >
            <Text className={`text-xs`}>Track</Text>
          </TouchableOpacity> */}
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
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
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
                  // ref={flatListRef}
                  data={availableJobs}
                  scrollEnabled={false}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderAvailableJob}
                  onEndReached={loadMoreJobs}
                  onEndReachedThreshold={0.5}
                  removeClippedSubviews
                  initialNumToRender={5}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                  // onScrollToIndexFailed={({ index, averageItemLength }) => {
                  //   // Fallback handler if scroll fails
                  //   flatListRef.current?.scrollToOffset({
                  //     offset: index * averageItemLength,
                  //     animated: true,
                  //   });
                  // }}
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
                  scrollEnabled={false}
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
                  scrollEnabled={false}
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
