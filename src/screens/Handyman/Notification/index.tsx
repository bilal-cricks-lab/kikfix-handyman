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
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  Clock,
  MapPin,
  Star,
  Check,
  X as XIcon,
} from 'lucide-react-native';
import { formatDistanceToNowStrict } from 'date-fns';
import { colors, typography } from '../../../design-system';
import CustomButton from '../../../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import messaging from '@react-native-firebase/messaging'

type NotificationType = 'booking' | 'reminder' | 'update' | 'promotion';

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

interface Props {
  onBack: () => void;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread'>('all');

  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const getTypeFromRemote = (type?: string): NotificationType => {
  switch (type) {
    case 'booking':
    case 'reminder':
    case 'update':
    case 'promotion':
      return type;
    default:
      return 'update';
  }
};


  React.useEffect(() => {
    // Foreground listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Notification:', remoteMessage);
      const newNotification: Notification = {
        id: Date.now(), // unique id
        title: remoteMessage.notification?.title || 'New Notification',
        message: remoteMessage.notification?.body || '',
        timestamp: new Date(),
        read: false,
        actionable: remoteMessage.data?.actionable === 'true',
        providerImage: remoteMessage.data?.providerImage as string,
        providerName: remoteMessage.data?.providerName as string,
      };
      setNotifications(prev => [newNotification, ...prev]);
    });

    return unsubscribe;
  }, []);

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
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'booking':
        return <MapPin width={18} height={18} color="#1E40AF" />;
      case 'reminder':
        return <Clock width={18} height={18} color="#C2410C" />;
      case 'update':
        return <Check width={18} height={18} color="#047857" />;
      case 'promotion':
        return <Star width={18} height={18} color="#B45309" />;
      default:
        return <Bell width={18} height={18} color="#374151" />;
    }
  };

  const getBadgeClasses = (type: NotificationType) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-100 text-blue-800';
      case 'reminder':
        return 'bg-orange-100 text-orange-800';
      case 'update':
        return 'bg-green-100 text-green-800';
      case 'promotion':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    // "10 minutes ago", "3 hours ago", "2 days ago" — short and human
    return `${formatDistanceToNowStrict(date, { addSuffix: true })}`;
  };

  const renderItem = ({ item }: { item: Notification }) => {
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
            <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
            </View>
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
              <View
                
              >
                <Text
                  style={{
                    ...typography.link,
                  }}
                >
                </Text>
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
                <View className="bg-blue-600 px-2 items-center justify-center rounded-full">
                  <Text className="text-xs text-white">{unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <View className="px-4 pb-6 ">
        {filtered.length === 0 ? (
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
