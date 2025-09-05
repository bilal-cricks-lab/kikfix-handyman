import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
} from 'lucide-react-native';
import { formatDistanceToNowStrict } from 'date-fns';
import { colors, typography } from '../../../design-system';
import CustomButton from '../../../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import {
  get_all_notification,
  read_notification,
} from '../../../services/appServices/serviceCategory';
import { setUnreadCount, clearUnread, decrementUnread } from '../../../redux/Reducers/unreadSlice';
import { Store } from '../../../redux/Store/store';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionable?: boolean;
  providerImage?: string;
  providerName?: string;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp<StackParamList>>();

  React.useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await get_all_notification();
        if (res?.status && res?.data?.data) {
          const mapped = res.data.data.map((n: any) => {
            return {
              id: n.id,
              title: n.title || 'Notification',
              message: n.message || '',
              timestamp: new Date(n.created_at),
              read: !!n.read_at || n.is_read === 1,
              actionable: !!n.action_label, // decide when to show actions
              providerImage: n.sender?.profile_image ?? undefined,
              providerName: n.sender?.display_name ?? 'Unknown',
              senderId: n.sender_id,
              receiverId: n.receiver_id,
            } as Notification;
          });
          setNotifications(mapped);
          setLoading(false);
          const unread = mapped.filter((n: any) => !n.read).length;
          Store.dispatch(setUnreadCount(unread));
        }
      } catch (error) {
        console.log('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const marked_notification = async (id: number | string | null) => {
    const data = {
      notification_id: id,
    };
    try {
      const response = await read_notification(data);
      console.log(response.message);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications],
  );

  const filtered = useMemo(
    () =>
      notifications.filter(n => (selectedTab === 'unread' ? !n.read : true)),
    [notifications, selectedTab],
  );

  const markAsRead = (id: number) => {
    marked_notification(id);
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n)),
    );
    Store.dispatch(decrementUnread()); // ✅ decrease global unread count
  };

  const markAllAsRead = async () => {
    try {
      // get all unread notifications
      const unreadNotifications = notifications.filter(n => !n.read);

      // optimized and update UI first
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      Store.dispatch(clearUnread()); // ✅ reset to 0 globally

      // call API for each unread notification
      for (const n of unreadNotifications) {
        try {
          await read_notification({ notification_id: n.id });
        } catch (err) {
          console.log(`Error marking notification ${n.id} as read`, err);
        }
      }
    } catch (error) {
      console.log('Error in markAllAsRead:', error);
    }
  };

  const formatTime = (date: Date) => {
    // "10 minutes ago", "3 hours ago", "2 days ago" — short and human
    return `${formatDistanceToNowStrict(date, { addSuffix: true })}`;
  };

  const renderItem = ({ item }: { item: Notification }) => {
    console.log(item.id);
    return (
      <Pressable
        onPress={() => markAsRead(item.id)}
        className={`p-4 ${
          !item.read ? 'bg-blue-50 border border-blue-200' : 'bg-white-50'
        } rounded-lg`}
        android_ripple={{ color: '#eee' }}
      >
        <View className="flex-row gap-4">
          {/* Avatar / Icon */}
          {item.providerImage ? (
            <Image
              source={{ uri: item.providerImage }}
              className="w-12 h-12 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"></View>
          )}

          {/* Content */}
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <View className="flex-1 pr-2">
                <Text
                  style={{
                    ...typography.h6,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  className="mt-1"
                  style={{
                    ...typography.bodyXs,
                  }}
                >
                  {item.message}
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-xs text-gray-400">
                  {formatTime(item.timestamp)}
                </Text>
                {!item.read && (
                  <View className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                )}
              </View>
            </View>

            <View className="flex-row justify-between items-center mt-3">
              <View>
                <Text
                  style={{
                    ...typography.link,
                  }}
                ></Text>
              </View>

              {item.actionable ? (
                <View className="flex-row items-center gap-7">
                  <>
                    <CustomButton
                      className=""
                      title="Track"
                      textStyle={{
                        ...typography.link,
                        color: colors.black[900],
                      }}
                      style={{}}
                      onPress={() => {}}
                    />
                    <CustomButton
                      className="px-3 py-1 rounded-md"
                      title="Message"
                      textStyle={{
                        ...typography.link,
                        color: colors.white[100],
                      }}
                      style={{
                        backgroundColor: colors.secondary[500],
                      }}
                      onPress={() => {}}
                    />
                  </>

                  <CustomButton
                    className="px-3 py-1 rounded-md"
                    title="Rate Service"
                    textStyle={{
                      ...typography.link,
                      color: colors.white[100],
                    }}
                    style={{
                      backgroundColor: colors.secondary[500],
                    }}
                    onPress={() => {}}
                  />

                  <CustomButton
                    className="px-3 py-1 rounded-md"
                    title="Use Offer"
                    textStyle={{
                      ...typography.link,
                      color: colors.white[100],
                    }}
                    style={{
                      backgroundColor: colors.secondary[500],
                    }}
                    onPress={() => {}}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor={'white'} translucent />
      {/* Header */}
      <View
        className="bg-white-50 border-b border-gray-200 p-4"
        style={
          StatusBar.currentHeight ? { paddingTop: StatusBar.currentHeight } : {}
        }
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-full bg-transparent"
              accessibilityLabel="Back"
            >
              <ArrowLeft width={20} height={20} color="#111827" />
            </TouchableOpacity>
            <View>
              <Text className="text-lg font-semibold">Notifications</Text>
              {unreadCount > 0 && (
                <Text className="" style={{}}>
                  {unreadCount} unread
                </Text>
              )}
            </View>
          </View>

          {unreadCount > 0 ? (
            <TouchableOpacity
              onPress={markAllAsRead}
              className="px-3 py-1 rounded-md"
            >
              <Text className="text-sm text-gray-700">Mark all read</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 96 }} /> // keep header balanced
          )}
        </View>
      </View>

      {/* Tabs */}
      <View className="p-4">
        <View className="flex-row bg-white-50 p-1 rounded-xl border border-gray-200">
          <TouchableOpacity
            onPress={() => setSelectedTab('all')}
            className={`flex-1 py-2 rounded-xl items-center ${
              selectedTab === 'all' ? 'bg-gray-100' : ''
            }`}
          >
            <Text
              className={`${
                selectedTab === 'all' ? 'font-semibold' : 'text-gray-600'
              }`}
              style={{
                ...typography.h6,
              }}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab('unread')}
            className={`flex-1 py-2 rounded-xl items-center relative ${
              selectedTab === 'unread' ? 'bg-gray-100' : ''
            }`}
          >
            <View className="flex-row items-center justify-center gap-2">
              <Text
                className={`${
                  selectedTab === 'unread' ? 'font-semibold' : 'text-gray-600'
                }`}
                style={{
                  ...typography.h6,
                }}
              >
                Unread
              </Text>
              {unreadCount > 0 && (
                <View className="bg-green-500 px-2 items-center justify-center rounded-full">
                  <Text className="text-xs text-white-50">{unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <View className="px-4 pb-6 flex-1">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : filtered.length === 0 ? (
          <View className="">
            <View className="bg-white-50 p-8 rounded-lg items-center">
              <Bell width={48} height={48} color="#9CA3AF" />
              <Text className="text-lg font-medium mt-4">No notifications</Text>
              <Text className="text-sm text-gray-500 mt-2">
                {selectedTab === 'unread'
                  ? "You're all caught up!"
                  : 'No notifications yet'}
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={i => String(i.id)}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View className="h-3" />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
