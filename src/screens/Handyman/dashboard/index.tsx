import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';

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

const HandymanDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');

  const getFilteredJobs = () => {
    // let jobs: Job[] = [];

    // switch (activeTab) {
    //   case 'available':
    //     jobs = availableJobs;
    //     break;
    //   case 'accepted':
    //     jobs = acceptedJobs;
    //     break;
    //   case 'in-progress':
    //     jobs = acceptedJobs.filter(job => job.status === 'in-progress');
    //     break;
    //   case 'completed':
    //     jobs = acceptedJobs.filter(job => job.status === 'completed');
    //     break;
    //   default:
    //     jobs = [];
    // }

    // if (filterUrgency !== 'all') {
    //   jobs = jobs.filter(job => job.urgency === filterUrgency);
    // }

    // return jobs;
  };

  const filteredJobs = getFilteredJobs();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return '#ef4444';
      case 'urgent':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return <LucideIcons.AlertTriangle size={16} color="#ef4444" />;
      case 'urgent':
        return <LucideIcons.Clock size={16} color="#3b82f6" />;
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
                  {getUrgencyIcon(job.urgency)}
                  <Text style={styles.urgencyText}>{job.urgency}</Text>
                </View>
                {timeUntilExpiry && (
                  <View
                    style={[
                      styles.timeBadge,
                      isExpired && styles.expiredTimeBadge,
                    ]}
                  >
                    <LucideIcons.Clock
                      size={12}
                      color={isExpired ? '#fff' : '#6b7280'}
                    />
                    <Text
                      style={[
                        styles.timeBadgeText,
                        isExpired && { color: '#fff' },
                      ]}
                    >
                      {timeUntilExpiry}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.customerName}>by {job.customerName}</Text>
              <Text style={styles.jobDescription} numberOfLines={2}>
                {job.description}
              </Text>
            </View>
          </View>

          <View style={styles.jobPrice}>
            <Text style={styles.priceText}>${job.budget}</Text>
            <Text style={styles.durationText}>{job.estimatedDuration}</Text>
            {job.postedTime && (
              <Text style={styles.postedTime}>{job.postedTime}</Text>
            )}
          </View>
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
            <TouchableOpacity
              style={styles.actionButton}
            //   onPress={() => onJobSelect(job)}
            >
              <Text style={styles.actionButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <LucideIcons.MessageCircle size={16} color="#3b82f6" />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <View>
              <Text style={styles.welcomeTitle}>
                Good morning, {'John'}! 👋
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Ready to help customers today?
              </Text>
            </View>
            <View style={styles.badgeContainer}>
              <View style={styles.ratingBadge}>
                <LucideIcons.Star size={14} color="#166534" />
                <Text style={styles.ratingBadgeText}>
                  Rating
                </Text>
              </View>
              {/* {user?.isVerified && (
                <View style={styles.verifiedBadge}>
                  <LucideIcons.Verified size={14} color="#1d4ed8" />
                  <Text style={styles.verifiedBadgeText}>Verified Pro</Text>
                </View>
              )} */}
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.earningsCard}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardLabel}>Today's Earnings</Text>
                  {/* <Text style={styles.cardValue}>${earnings.today}</Text> */}
                </View>
                <LucideIcons.DollarSign size={24} color="#84cc16" />
              </View>
            </View>

            <View style={styles.statsCard}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardLabel}>Completed Jobs</Text>
                  {/* <Text style={styles.cardValue}>{stats.completedJobs}</Text> */}
                  <View style={styles.trendContainer}>
                    <LucideIcons.TrendingUp size={14} color="#166534" />
                    <Text style={styles.trendText}>+12 this week</Text>
                  </View>
                </View>
                <LucideIcons.CheckCircle size={24} color="#9ca3af" />
              </View>
            </View>

            <View style={styles.statsCard}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardLabel}>Response Time</Text>
                  {/* <Text style={styles.cardValue}>{stats.responseTime}</Text> */}
                  <Text style={styles.excellentText}>Excellent!</Text>
                </View>
                <LucideIcons.Clock size={24} color="#9ca3af" />
              </View>
            </View>

            <View style={styles.statsCard}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardLabel}>This Week</Text>
                  {/* <Text style={styles.cardValue}>${earnings.week}</Text> */}
                  <Text style={styles.todayEarnings}>
                    {/* +${earnings.today} today */}
                  </Text>
                </View>
                <LucideIcons.TrendingUp size={24} color="#9ca3af" />
              </View>
            </View>
          </View>
        </View>

        {/* Jobs Section */}
        <View style={styles.jobsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Job Opportunities</Text>
            <View style={styles.filterContainer}>
              <View style={styles.urgencyFilter}>
                <TextInput
                  style={styles.filterInput}
                  value={filterUrgency}
                  onChangeText={setFilterUrgency}
                >
                  <Text>All Urgency</Text>
                </TextInput>
                <LucideIcons.ChevronDown size={20} color="#6b7280" />
              </View>
              <TouchableOpacity style={styles.filterButton}>
                <LucideIcons.Filter size={16} color="#6b7280" />
                <Text style={styles.filterButtonText}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'available' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('available')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'available' && styles.activeTabText,
                ]}
              >
                Available
              </Text>
              {/* <Text style={styles.tabCount}>({availableJobs.length})</Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'accepted' && styles.activeTab]}
              onPress={() => setActiveTab('accepted')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'accepted' && styles.activeTabText,
                ]}
              >
                Accepted
              </Text>
              {/* <Text style={styles.tabCount}>({acceptedJobs.length})</Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'in-progress' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('in-progress')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'in-progress' && styles.activeTabText,
                ]}
              >
                Progress
              </Text>
              <Text style={styles.tabCount}>(0)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'completed' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('completed')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'completed' && styles.activeTabText,
                ]}
              >
                Done
              </Text>
              <Text style={styles.tabCount}>(0)</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {/* {activeTab === 'available' && (
            <View style={styles.tabContent}>
              {filteredJobs.length === 0 ? (
                renderEmptyState(
                  'clock',
                  'No jobs available',
                  'Check back soon for new opportunities!',
                )
              ) : (
                // <FlatList
                //   data={filteredJobs}
                //   renderItem={renderJobItem}
                //   keyExtractor={item => item.id.toString()}
                //   scrollEnabled={false}
                //   ItemSeparatorComponent={() => (
                //     <View style={styles.jobSeparator} />
                //   )}
                // />
              )}
            </View>
          )} */}

          {/* {activeTab === 'accepted' && (
            <View style={styles.tabContent}>
              {filteredJobs.length === 0 ? (
                renderEmptyState(
                  'check',
                  'No accepted jobs',
                  'Jobs you accept will appear here.',
                )
              ) : (
                <FlatList
                  data={filteredJobs}
                  renderItem={renderAcceptedJobItem}
                  keyExtractor={item => item.id.toString()}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => (
                    <View style={styles.jobSeparator} />
                  )}
                />
              )}
            </View>
          )} */}

          {activeTab === 'in-progress' && (
            <View style={styles.tabContent}>
              {renderEmptyState(
                'clock',
                'No jobs in progress',
                "Jobs you're currently working on will appear here.",
              )}
            </View>
          )}

          {activeTab === 'completed' && (
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  ratingBadgeText: {
    fontSize: 12,
    color: '#166534',
    marginLeft: 4,
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
    backgroundColor: '#166534',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 12,
    color: '#e5e7eb',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urgencyFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#166534',
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
    width: 48,
    height: 48,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
    maxWidth: '60%',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  urgencyText: {
    fontSize: 10,
    color: '#fff',
    marginLeft: 4,
    textTransform: 'capitalize',
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
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  jobPrice: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 2,
  },
  durationText: {
    fontSize: 12,
    color: '#6b7280',
  },
  postedTime: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 4,
  },
  jobInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  secondaryActions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#374151',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  messageButtonText: {
    fontSize: 12,
    color: '#3b82f6',
    marginLeft: 4,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
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
    backgroundColor: '#166534',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
