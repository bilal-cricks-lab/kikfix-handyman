import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../design-system';
import * as LucideIcons from 'lucide-react-native';
import CustomButton from '../../components/Button';
import { horizontalScale, verticalScale } from '../../utils/screenSize';
import { typography } from '../../design-system/typography';
import JobCardProps from '../../types/job';
import { Store } from '../../redux/Store/store';
import { setBookingData } from '../../redux/Reducers/bookingSlice';
import { navigateToScreen } from '../../utils/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackParamList from '../../types/stack';
import { formatTime, time_duration } from '../../utils/time_format';

const AvailableJobs: React.FC<JobCardProps> = ({
  job,
  onAccept,
  onDecline,
  onCounter,
  onViewDetails,
  onMessage,
  isExpired = false,
  loading = false,
}) => {
  const category = React.useMemo(() => job?.category ?? {}, [job.category]);
  const customer = React.useMemo(() => job?.customer ?? {}, [job.customer]);
  const fixer_service = React.useMemo(
    () => job?.fixer_service ?? {},
    [job.fixer_service],
  );
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const getUrgencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'urgent':
        return '#ef4444';
      case 'standard':
        return '#3b82f6';
      default:
        return '#9ca3af';
    }
  };

  const handleCounterOffer = React.useCallback(() => {
    if (!job?.counter_offer) {
      onCounter?.(job?.id);
      Store.dispatch(
        setBookingData({
          id: job?.id,
          name: customer?.username,
          address: job?.address,
          serve: category?.name,
          date: job?.date,
          fromTime: job?.min_time,
          toTime: job?.max_time,
          duration: time_duration(job?.min_time, job.max_time),
        }),
      );
      navigateToScreen(navigation, 'Counter_Offer');
    }
  }, [job, customer, category, navigation, onCounter]);

  const handleAccept = React.useCallback(() => {
    try {
      onAccept?.(job?.id);
      Store.dispatch(
        setBookingData({
          id: job?.id,
          name: customer?.username,
          address: job?.address,
          serve: category?.name,
          date: job?.date,
          fromTime: job?.min_time,
          distance: job?.distance,
          toTime: job?.max_time,
          duration: time_duration(job?.min_time, job.max_time),
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }, [job, fixer_service, category, onAccept]);

  return (
    <View style={[styles.jobCard, isExpired && styles.expiredJobCard]}>
      <View style={styles.jobHeader}>
        <View style={styles.jobCustomerInfo}>
          {customer.profile_image ? (
            <Image
              source={{ uri: customer.profile_image }}
              style={styles.avatar}
            />
          ) : null}

          <View style={styles.jobDetails}>
            <View style={styles.jobTitleRow}>
              <Text style={styles.jobTitle} numberOfLines={1}>
                {category.name}
              </Text>
              <View
                style={[
                  styles.urgencyBadge,
                  { backgroundColor: getUrgencyColor(job.urgency_level) },
                ]}
              >
                <LucideIcons.Clock size={12} color={colors.white[100]} />
                <Text style={styles.urgencyText}>{job.urgency_level}</Text>
              </View>
              <Text style={{ left: horizontalScale(10) }}>
                {job.counter_offer === null ? '' : 'Status'}
              </Text>
            </View>
            <Text style={styles.customerName}>by {`${customer.username}`}</Text>
            <Text style={styles.jobDescription} numberOfLines={2}>
              {job.instruction}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.jobPrice}>
        <Text style={styles.priceText}>${fixer_service.price}</Text>
        <Text style={styles.durationText}>
          {fixer_service.estimated_time} Hours
        </Text>
        {/* {job.postedTime && (
            <Text style={styles.postedTime}>{job.postedTime}</Text>
          )} */}
      </View>

      <View style={styles.jobInfoRow}>
        <View style={styles.infoItem}>
          <LucideIcons.MapPin size={14} color="#6b7280" />
          <Text style={styles.infoText}>{job.address}</Text>
        </View>
        <View style={styles.infoItem}>
          <LucideIcons.Clock size={14} color="#6b7280" />
          <Text style={styles.infoText}>{`${formatTime(
            job.min_time,
          )} ${formatTime(job.max_time)}`}</Text>
        </View>
        <View style={styles.infoItem}>
          <LucideIcons.Navigation size={14} color="#6b7280" />
          <Text style={styles.infoText}>{job.distance || 0} away</Text>
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
            onPress={() => navigateToScreen(navigation, 'chat')}
            textStyle={styles.messageButtonText}
          />
        </View>

        <View style={styles.rightActions}>
          <View style={styles.secondaryActions}>
            <CustomButton
              style={styles.secondaryButton}
              onPress={() => {}}
              title="Pass"
              textStyle={styles.secondaryButtonText}
            />
            <CustomButton
              title={job.counter_offer ? 'Countered' : 'Counter Offer'}
              disabled={!!job.counter_offer} // ✅ disables if counter_offer exists
              style={[styles.secondaryButton, styles.counterButton]}
              element={<LucideIcons.Edit3 size={14} color="#3b82f6" />}
              textStyle={styles.counterButtonText}
              onPress={handleCounterOffer}
            />
          </View>
          <CustomButton
            style={[styles.primaryButton, isExpired && styles.disabledButton]}
            onPress={handleAccept}
            title={loading ? 'Accepting...' : 'Accept Job'}
            textStyle={styles.primaryButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(AvailableJobs);

const styles = StyleSheet.create({
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
    borderLeftColor: colors.secondary[500],
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
    width: horizontalScale(80),
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
    width: horizontalScale(300),
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
    backgroundColor: colors.secondary[500],
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
    ...typography.link,
    color: colors.white[100],
  },
});
