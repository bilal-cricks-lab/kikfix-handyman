import { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import {
  ArrowLeft,
  Send,
  Camera,
  Image as ImageIcon,
  FileText,
  MapPin,
  CheckCheck,
  Circle,
  Star,
} from 'lucide-react-native';
import { colors, typography } from '../../../design-system';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import CustomButton from '../../../components/Button';

// ------- Types -------
type Sender = 'customer' | 'handyman';
type MsgType = 'text' | 'image' | 'location' | 'voice' | 'system';
type MsgStatus = 'sending' | 'sent' | 'delivered' | 'read';

interface Attachment {
  type: 'image' | 'document';
  url: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: string;
  type: MsgType;
  status: MsgStatus;
  attachments?: Attachment[];
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm on my way to your location. I should arrive in about 15 minutes.",
      sender: 'handyman',
      timestamp: '2024-01-20T10:30:00Z',
      type: 'text',
      status: 'read',
    },
    {
      id: '2',
      text: "Great! I'll be ready. Do you have all the necessary tools for the plumbing repair?",
      sender: 'customer',
      timestamp: '2024-01-20T10:32:00Z',
      type: 'text',
      status: 'read',
    },
    {
      id: '3',
      text: 'Yes, I have everything needed. I also picked up a backup O-ring just in case.',
      sender: 'handyman',
      timestamp: '2024-01-20T10:33:00Z',
      type: 'text',
      status: 'read',
    },
    {
      id: '4',
      text: 'Perfect! See you soon.',
      sender: 'customer',
      timestamp: '2024-01-20T10:34:00Z',
      type: 'text',
      status: 'delivered',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  // Animated values
  const typingScale = useRef(new Animated.Value(0)).current;
  const attachSheetY = useRef(new Animated.Value(0)).current;
  const entry = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  useEffect(() => {
    Animated.timing(entry, {
      toValue: 1,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isTyping) {
      Animated.sequence([
        Animated.spring(typingScale, { toValue: 1, useNativeDriver: true }),
        Animated.timing(typingScale, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isTyping, typingScale]);

  useEffect(() => {
    Animated.timing(attachSheetY, {
      toValue: showAttachments ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [showAttachments, attachSheetY]);

  // Simulate typing while user types in the input
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
      const t = setTimeout(() => setIsTyping(false), 850);
      return () => clearTimeout(t);
    }
  }, [newMessage]);

  const handleSendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'customer',
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sending',
    };

    setMessages(prev => [msg, ...prev]); // FlatList is inverted
    setNewMessage('');

    // delivery + read simulation
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === msg.id ? { ...m, status: 'delivered' } : m)),
      );
    }, 800);
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === msg.id ? { ...m, status: 'read' } : m)),
      );
    }, 1600);
  };

  const addImageMock = () => {
    const msg: Message = {
      id: Date.now().toString(),
      text: 'Sent an image',
      sender: 'customer',
      timestamp: new Date().toISOString(),
      type: 'image',
      status: 'sending',
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1080&q=80&auto=format&fit=crop',
          name: 'photo.jpg',
        },
      ],
    };
    setMessages(p => [msg, ...p]);
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === msg.id ? { ...m, status: 'delivered' } : m)),
      );
    }, 700);
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === msg.id ? { ...m, status: 'read' } : m)),
      );
    }, 1400);
  };

  const toggleRecord = () => setIsRecording(v => !v);

  // ------- Helpers -------
  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const today = new Date();
    const yest = new Date();
    yest.setDate(today.getDate() - 1);
    const ds = date.toDateString();
    if (ds === today.toDateString()) return 'Today';
    if (ds === yest.toDateString()) return 'Yesterday';
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: MsgStatus, sentByUser: boolean) => {
    const size = 16;
    switch (status) {
      case 'sending':
        return (
          <Circle size={size} color={sentByUser ? '#ffffffB3' : '#9CA3AF'} />
        );
      case 'sent':
        return (
          <CheckCheck
            size={size}
            color={sentByUser ? '#ffffffB3' : '#9CA3AF'}
          />
        );
      case 'delivered':
        return (
          <CheckCheck size={size} color={sentByUser ? '#E5E7EB' : '#6B7280'} />
        );
      case 'read':
        return (
          <CheckCheck size={size} color={sentByUser ? '#3B82F6' : '#3B82F6'} />
        );
      default:
        return null;
    }
  };

  // Group messages by day for headers in an inverted FlatList
  const grouped = useMemo(() => {
    const map = new Map<string, Message[]>();
    for (const m of messages) {
      const k = formatDate(m.timestamp);
      const arr = map.get(k) || [];
      arr.push(m);
      map.set(k, arr);
    }
    return Array.from(map.entries()).map(([date, items]) => ({ date, items }));
  }, [messages]);

  // Flatten for FlatList with headers (inverted order)
  const flatData = useMemo(() => {
    const rows: Array<
      | { type: 'header'; id: string; date: string }
      | { type: 'msg'; id: string; msg: Message }
    > = [];
    grouped.forEach(({ date, items }) => {
      rows.push({ type: 'header', id: `h-${date}`, date });
      // ensure most recent first for inverted list
      items
        .slice()
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )
        .forEach(msg => rows.push({ type: 'msg', id: msg.id, msg }));
    });
    return rows;
  }, [grouped]);

  // message enter animation per row
  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'header') {
      return (
        <View className="w-full items-center my-3">
          <View className="px-3 py-1 rounded-full bg-gray-100">
            <Text className="text-xs text-gray-600">{item.date}</Text>
          </View>
        </View>
      );
    }
    const m: Message = item.msg;
    const sentByUser = m.sender === 'customer';

    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: entry.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
          opacity: entry,
        }}
        className={`w-full mb-2 ${sentByUser ? 'items-end' : 'items-start'}`}
      >
        <View
          className={`max-w-[80%] rounded-2xl px-3 py-2 ${
            sentByUser ? 'bg-green-500' : 'bg-white border border-gray-200'
          }`}
        >
          {m.type === 'image' && m.attachments?.[0]?.url ? (
            <View className="mb-2 overflow-hidden rounded-xl">
              <Image
                source={{ uri: m.attachments[0].url }}
                className="w-64 h-40"
                resizeMode="cover"
              />
            </View>
          ) : null}
          {!!m.text && (
            <Text
              className={`${sentByUser ? 'text-white-50' : 'text-gray-900'}`}
              style={{
                ...typography.link,
              }}
            >
              {m.text}
            </Text>
          )}
          <View
            className={`flex-row items-center justify-between mt-1 ${
              sentByUser ? 'opacity-80' : 'opacity-70'
            }`}
          >
            <Text
              className={`text-[10px] ${
                sentByUser ? 'text-white-50' : 'text-gray-500'
              }`}
            >
              {formatTime(m.timestamp)}
            </Text>
            {sentByUser && (
              <View className="ml-2">{getStatusIcon(m.status, true)}</View>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  // Attachment sheet (simple, animated from bottom)
  const sheetTranslateY = attachSheetY.interpolate({
    inputRange: [0, 1],
    outputRange: [120, 0],
  });

  const isOnline = true;
  const contactRating = 4.5;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white-50 py-4"
        style={
          StatusBar.currentHeight ? { paddingTop: StatusBar.currentHeight } : {}
        }
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 mr-1"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <ArrowLeft size={22} color={'black'} />
            </TouchableOpacity>
            <CustomButton
              className="right-1"
              title="Go to Dashboard"
              textStyle={{
                ...typography.h6,
                color: colors.black[900],
              }}
              onPress={() => navigation.goBack()}
            />
            <View className="flex-row items-center">
              <View className="mr-3">
                {/* <View className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  {contactImage ? (
                    <Image source={{ uri: contactImage }} className="w-full h-full" />
                  ) : (
                    <View className="w-full h-full items-center justify-center">
                      <Text className="text-gray-600 font-semibold">{contactName?.charAt(0) ?? '?'}</Text>
                    </View>
                  )}
                </View> */}
                {/* {isOnline && (
                  <View className="w-5 h-5 rounded-full bg-green-500 border-2 border-white-50 absolute -right-1 -bottom-2" />
                )} */}
              </View>
              <View>
                <View className="flex-row items-center left-4">
                  <Text className="font-semibold text-gray-900 mr-2">
                    Customer
                  </Text>
                  
                </View>
                {/* <Text className="text-xs text-gray-600">{isOnline ? 'Online' : `Last seen ${lastSeen}`}</Text> */}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Job Details */}
      {/* {jobDetails ? (
        <View className="mx-3 mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-3">
              <Text className="font-semibold text-gray-900 mb-1">{jobDetails.serviceName}</Text>
              <View className="flex-row items-center flex-wrap">
                <View className="flex-row items-center mr-3 mb-1">
                  <MapPin size={16} color="#374151" />
                  <Text className="text-sm text-gray-700 ml-1">{jobDetails.location}</Text>
                </View>
                <View className="flex-row items-center mr-3 mb-1">
                  <Clock size={16} color="#374151" />
                  <Text className="text-sm text-gray-700 ml-1">{jobDetails.timing}</Text>
                </View>
                <View className="px-2 py-0.5 rounded-full bg-blue-100">
                  <Text className="text-xs text-blue-800">{jobDetails.status}</Text>
                </View>
              </View>
            </View>
            {onViewJob ? (
              <TouchableOpacity className="px-3 py-2 rounded-xl border border-gray-300">
                <Text className="text-xs font-medium text-gray-800">View Details</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ) : null} */}

      {/* Messages (inverted) */}
      <FlatList
        data={flatData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        inverted
        className="flex-1 px-3"
        contentContainerStyle={{ paddingVertical: 8 }}
        keyboardShouldPersistTaps="handled"
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View className="px-3 mb-2">
          <View className="max-w-[65%] rounded-2xl bg-white border border-gray-200 px-3 py-2">
            <Animated.View
              style={{
                transform: [
                  {
                    scale: typingScale.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.98, 1],
                    }),
                  },
                ],
              }}
            >
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-gray-400 mr-1" />
                <View className="w-2 h-2 rounded-full bg-gray-400 mr-1" />
                <View className="w-2 h-2 rounded-full bg-gray-400" />
              </View>
            </Animated.View>
          </View>
        </View>
      )}

      {/* Attachment Sheet */}
      <Animated.View
        pointerEvents={showAttachments ? 'auto' : 'none'}
        style={{ transform: [{ translateY: sheetTranslateY }] }}
        className="px-3"
      >
        {showAttachments && (
          <View className="rounded-2xl bg-white border border-gray-200 p-4 mb-2">
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={addImageMock}
                className="items-center p-3 rounded-xl bg-blue-50"
              >
                <ImageIcon size={24} color="#2563EB" />
                <Text className="text-xs text-blue-600 mt-1">Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center p-3 rounded-xl bg-purple-50">
                <Camera size={24} color="#7C3AED" />
                <Text className="text-xs text-purple-600 mt-1">Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center p-3 rounded-xl bg-green-50">
                <FileText size={24} color="#059669" />
                <Text className="text-xs text-green-600 mt-1">Document</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center p-3 rounded-xl bg-red-50">
                <MapPin size={24} color="#DC2626" />
                <Text className="text-xs text-red-600 mt-1">Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <View className="px-3 py-2 bottom-4">
          <View className="flex-row items-center">
            {/* <TouchableOpacity
              onPress={() => setShowAttachments(v => !v)}
              className="p-2 mr-1"
            >
              <Paperclip size={20} color="#4B5563" />
            </TouchableOpacity> */}

            <View className="flex-1">
              <View className="relative">
                <TextInput
                  value={newMessage}
                  onChangeText={setNewMessage}
                  placeholder="Type a message..."
                  className="rounded-2xl bg-gray-200 px-4 py-2 pl-6 text-[15px]"
                  placeholderTextColor="#9CA3AF"
                  onSubmitEditing={handleSendMessage}
                  returnKeyType="send"
                />
                {/* <TouchableOpacity
                  onPress={toggleRecord}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                >
                  {isRecording ? (
                    <MicOff size={18} color="#EF4444" />
                  ) : (
                    <Mic size={18} color="#6B7280" />
                  )}
                </TouchableOpacity> */}
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`ml-2 px-3 py-2 rounded-2xl ${
                newMessage.trim() ? 'bg-green-500' : 'bg-green-500'
              }`}
            >
              <Send size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {isRecording && (
            <View className="mt-2 items-center">
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                <Text className="text-sm text-red-600">Recording...</Text>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
