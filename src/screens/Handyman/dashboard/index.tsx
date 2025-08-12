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
// Types

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
  const [available_jobs, setAvailableJobs] = useState<{ id: string | number }[]>([]);
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

  React.useEffect(() => {
    fetch_fixer_info();
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

  const fetch_fixer_info = async () => {
    try {
      const response = await fixer_dashboard_information();
      const result = response.data;
      console.log(result.available_requests);
      setAvailableJobs(result.available_requests);
      setAcceptedJobs(result.fixer_accepted_requests);
      setFixerData(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const fixerAcceptJob = async () => {
    const data = {
      booking_id: available_jobs[0].id
    };
    console.log('Accepting job with data:', data);
    setIsLoading(true);
    try {
      const response = await fixer_accept(data);
      console.log('Job accepted successfully:', response);
      setIsLoading(false);
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
    <SafeAreaView style={{ flex: 1 }}>
      <FixedHeader />
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
          <View
            className={`bg-gray-100 rounded-full flex-row justify-between px-2 py-2 mb-4`}
          >
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
              {available_jobs.length === 0 ? (
                renderEmptyState(
                  'clock',
                  'No jobs available',
                  'Check back soon for new opportunities!',
                )
              ) : (
                <FlatList
                  data={available_jobs}
                  keyExtractor={(item: number | string | any) => item.id}
                  renderItem={({ item }) => (
                    <AvailableJobs
                      job={item as JobCardProps['job']}
                      onAccept={() => fixerAcceptJob()}
                      loading={isLoading}
                    />
                  )}
                  contentContainerStyle={{}}
                />
              )}
            </View>
          )}

          {activeTab === 'accepted' && (
            <View style={styles.tabContent}>
              {acceptedJobs.map((job: any) => (
                <JobCard job={job} variant={activeTab} onCounter={() => available_jobs[0].id}/>
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

export default HandymanDashboard;
