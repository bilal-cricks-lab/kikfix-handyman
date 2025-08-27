import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Alert,
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
import Pusher from 'pusher-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [activeTab, setActiveTab] = useState('available');
  const [date, setDate] = useState<string>('');
  const [acceptedJobs, setAcceptedJobs] = useState<any[]>([]);
  const [available_jobs, setAvailableJobs] = useState<BookingData[]>([]);
  const [counter_offer, setCounterOffer] = React.useState<any>([]);
  const [fixer_data, setFixerData] = useState({
    weekly_earning: 0,
    today_earning: 0,
    total_completed_job: 0,
    weekly_completed_job: 0,
    average_rating: 0,
    avg_response_time: 0,
    member_since: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const user_info = useSelector((state: RootSate) => state.user.user);

  useEffect(() => {
    fetch_fixer_info();
  }, []);

  useEffect(() => {
    let pusher: Pusher | null | any = null;

    const setupPusher = async () => {
      pusher = await initializePusher();
    };

    setupPusher();

    return () => {
      if (pusher) {
        console.log('Pusher disconnected on unmount');
      }
    };
  }, []);

  const statsData = [
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
  ];

  const getAuthToken = async (): Promise<string> => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      console.log(token);
      return token || '';
    } catch (error) {
      console.error('Error getting auth token:', error);
      return '';
    }
  };

  const initializePusher = async () => {
    try {
      const authToken = await getAuthToken();
      const userId = user_info?.id?.toString() || '';

      if (!authToken || !userId) {
        console.error('Missing auth token or userId');
        return;
      }

      console.log('Initializing Pusher for user:', userId);

      // Initialize Pusher with your credentials
      const pusher = new Pusher('d8f959cdefeb458660a2', {
        userAuthentication: {
          endpoint: '/broadcasting/auth',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            "X-CSRF-Token": `${authToken}`
          },
          transport: 'ajax'
        },
        channelAuthorization: {
          endpoint: 'https://kikfix-com.stackstaging.com/broadcasting/auth',
          transport: 'ajax',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
        enabledTransports: [
          'ws',
          'sockjs'
        ],
        authTransport: 'ajax',
        disabledTransports: ['xhr_streaming'],
        authEndpoint: '/broadcasting/auth',
        cluster: 'ap2',
        forceTLS: true,
        auth: {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
      });

      

      // Subscribe to the private channel for the logged-in fixer
      const channel = pusher.subscribe(`chat`);

      channel.bind('pusher:subscription_succeeded', (status: any) => {
        console.log('Successfully subscribed to private channel');
        console.log(status)
        console.log('Pusher', pusher);
      });

      channel.bind('pusher:subscription_error', (status: any) => {
        console.error('Subscription error:', status);
      });

      // Listen for new booking events
      channel.bind('booking.created', (data: any) => {
        console.log('New booking received:', data);

        // Add the new booking to available jobs
        if (data.booking) {
          setAvailableJobs(prevJobs => {
            const alreadyExists = prevJobs.some(
              job => job.id === data.booking.id,
            );
            console.log(alreadyExists);
            if (alreadyExists) return prevJobs; // avoid duplicates
            return [data.booking, ...prevJobs];
          });
          // Show an alert notification
          Alert.alert(
            'New Booking Available',
            'A new job has been posted and is available for you to accept.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          );
        }
      });

      // Handle connection events for debugging
      pusher.connection.bind('connected', () => {
        console.log('Pusher connected successfully');
        console.log('Socket ID:', pusher.connection.socket_id);
      });

      console.log(channel);

      pusher.connection.bind('error', (err: any) => {
        console.error('Pusher connection error:', err);
      });

      
      pusher.connection.bind('state_change', function (states: any) {
        // states = {previous: 'oldState', current: 'newState'}
        console.log(states);
      });
      pusher.signin();
    } catch (error) {
      console.error('Error initializing Pusher:', error);
    }
  };

  const fetch_fixer_info = async () => {
    try {
      const response = await fixer_dashboard_information();
      const result = response.data;
      console.log(result.available_requests);
      setAvailableJobs(result.available_requests);
      setAcceptedJobs(result.fixer_accepted_requests);
      setCounterOffer(result.counter_offer);
      setFixerData(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const fixerAcceptJob = async (jobId: string | number) => {
    const data = {
      booking_id: jobId,
    };
    console.log('Accepting job with data:', data);
    setIsLoading(true);
    try {
      const response = await fixer_accept(data);
      console.log('Job accepted successfully:', response);
      setIsLoading(false);

      // Remove the job from available jobs and add to accepted jobs
      setAvailableJobs(prev => prev.filter(job => job.id !== jobId));
      setAcceptedJobs(prev => [
        ...prev,
        available_jobs.find(job => job.id === jobId),
      ]);

      // Navigate to success screen or show success message
      navigateToScreen(navigation, 'Success');
    } catch (error) {
      console.log('Error accepting job:', error);
      // Handle error (e.g., show error message)
    }
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
                count: available_jobs.length,
              },
              {
                key: 'accepted',
                label: 'Accepted',
                count: acceptedJobs.length,
              },
              { key: 'progress', label: 'Progress', count: 0 },
              { key: 'done', label: 'Done', count: 0 },
            ].map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
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
              {available_jobs.length === 0 ? (
                renderEmptyState(
                  'clock',
                  'No jobs available',
                  'Check back soon for new opportunities!',
                )
              ) : (
                <FlatList
                  data={available_jobs}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <AvailableJobs
                      job={item as JobCardProps['job']}
                      onAccept={() => fixerAcceptJob(item.id)}
                      loading={isLoading}
                    />
                  )}
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

export default HandymanDashboard;
