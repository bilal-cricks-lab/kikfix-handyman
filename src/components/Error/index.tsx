import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native'; // or any close icon
import { verticalScale } from '../../utils/screenSize';

interface Props {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const ErrorToast = ({ message, visible, onClose }: Props) => {
  const slideAnim = useRef(new Animated.Value(400)).current; // starts off-screen

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={styles.toast}>
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
    top: verticalScale(70),
    right: 0,
    zIndex: 999,
    paddingHorizontal: 10,
  },
  toast: {
    backgroundColor: '#EF4444', // red color like in the screenshot
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 4,
  },
  toastText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ErrorToast;
