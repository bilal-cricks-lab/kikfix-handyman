import React, { useRef, useState } from 'react';
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  findNodeHandle,
  UIManager,
  ImageSourcePropType,
} from 'react-native';
import IMAGES from '../../constants/Images';
import {
  verticalScale,
  horizontalScale,
  fontScale,
} from '../../utils/screenSize';
import { colors, typography } from '../../design-system';
import { Bell, ArrowLeft } from 'lucide-react-native';
import UserCard from '../Card';
import { useSelector } from 'react-redux';
import { persistor, RootSate, Store } from '../../redux/Store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import StackParamList from '@/types/stack';
import { get_all_notification } from '../../services/appServices/serviceCategory';
import { setUnreadCount } from '../../redux/Reducers/unreadSlice';

const FixedHeader = ({}: {}) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const userData = useSelector((state: RootSate) => state.user.user);
  const steps = ['Service Category', 'Specific SubCat', 'Specific Service'];
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const count_unread = useSelector(
    (state: RootSate) => state.unread.unreadCount,
  );

  const openMenu = () => {
    const handle = findNodeHandle(buttonRef.current);
    if (handle) {
      UIManager.measureInWindow(handle, (x, y, height) => {
        setMenuPosition({ top: y + height + 5, left: x });
        setIsProfileVisible(true);
      });
    }
  };

  React.useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await get_all_notification();
        if (res?.status && res?.data?.data) {
          const unread = res.data.data.filter(
            (n: any) => !n.read_at && n.is_read !== 1,
          ).length;
          Store.dispatch(setUnreadCount(unread));
        }
      } catch (error) {
        console.log('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? verticalScale(0) : verticalScale(10),
      }}
    >
      {/* Top Navigation */}
      <View>
        <View className="flex-row items-center justify-between px-5">
          <View className="mr-10">
            <View
              className="items-center justify-center"
              style={{
                width: horizontalScale(70),
                height: verticalScale(30),
                backgroundColor: colors.secondary[50],
              }}
            >
              <Image
                source={IMAGES.logo}
                style={{
                  width: horizontalScale(70),
                  height: verticalScale(30),
                }}
              />
            </View>
          </View>

          {/* Bell & Avatar */}
          <View className="flex-row items-center space-x-3 gap-4">
            <TouchableOpacity
              className="relative p-2 items-center justify-center"
              onPress={() => navigation.navigate('notification')}
            >
              <Bell className="w-5 h-5" />
              {count_unread === 0 ? null : (
                <View className="absolute -top-2 -right-1 bg-green-500 w-5 h-5 rounded-full items-center justify-center">
                  <Text className="text-white-50 text-[10px] font-semibold">
                    {count_unread}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Avatar Clickable */}
            <TouchableOpacity
              ref={buttonRef}
              className="relative h-8 w-8 rounded-full"
              onPress={openMenu}
            >
              <Image
                source={{ uri: userData?.social_image } as ImageSourcePropType}
                style={{ height: 32, width: 32, borderRadius: 999 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Title */}
      </View>

      {/* Step Indicator */}
      {/* Modal for profile card */}
      <Modal
        visible={isProfileVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsProfileVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setIsProfileVisible(false)}
        >
          <View
            style={[
              styles.menu,
              {
                position: 'absolute',
                top: menuPosition.top,
                left: menuPosition.left,
              },
            ]}
          >
            <UserCard
              name={userData?.username?.toString()}
              email={userData?.email.toString()}
              role={userData?.user_type?.toString()}
              avatar={userData?.social_image}
              onProfilePress={() => {
                console.log('Go to profile');
                setIsProfileVisible(false);
              }}
              onHistoryPress={() => {
                console.log('Go to history');
                setIsProfileVisible(false);
              }}
              onEarningsPress={async () => {
                console.log('Go to earnings');
                setIsProfileVisible(false);
                AsyncStorage.removeItem('user_token');
                navigation.navigate('SignIn');
                await persistor.purge();
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
  },
  menu: {
    borderRadius: 8,
    paddingVertical: 8,
    marginLeft: horizontalScale(-235),
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  modalContent: {},
});

export default FixedHeader;
