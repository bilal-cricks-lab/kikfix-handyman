import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react-native';
import { colors } from '../../design-system';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning';
  onClose: () => void;
  autoHide?: boolean;
  duration?: number;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'error',
  onClose,
  autoHide = true,
  duration = 3000,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT - 140,
        duration: 300,
        useNativeDriver: false,
      }).start();

      if (autoHide) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const getToastColor = () => {
    switch (type) {
      case 'success':
        return colors.secondary[40];
      case 'warning':
        return '#F59E0B';
      case 'error':
      default:
        return '#EF4444';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle color="white" size={18} />;
      case 'warning':
        return <AlertTriangle color="white" size={18} />;
      case 'error':
      default:
        return <Info color="white" size={18} />;
    }
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          top: slideAnim,
        },
      ]}
    >
      <View style={[styles.toast, { backgroundColor: getToastColor() }]}>
        {getIcon()}
        <Text style={styles.toastText}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <X color="white" size={18} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 9999,
  },
  toast: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 5,
  },
  toastText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Toast;
