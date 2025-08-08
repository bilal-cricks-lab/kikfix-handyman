import { StyleSheet, Dimensions } from "react-native";
import { horizontalScale, verticalScale, fontScale } from "../../../utils/screenSize";
import { typography } from "../../../design-system";
import { colors } from "../../../design-system";

export const styles = StyleSheet.create({
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