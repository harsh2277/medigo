import React, { useState, useEffect, useRef } from 'react';
import { Modal as RNModal, View, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose, children, className = '' }) => {
  const [showModal, setShowModal] = useState(visible);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1, // Full opacity fade in
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0, // Slide up to original position
          duration: 280,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else if (showModal) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out
          duration: 220,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT, // Slide down
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  if (!showModal) return null;

  // Backdrop opacity interpolator
  const backdropOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'], // Fade in dimming overlay
  });

  return (
    <RNModal
      visible={showModal}
      transparent
      animationType="none" // None because we manage animations manually!
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {/* Animated backdrop (fading in/out) */}
        <Animated.View 
          className="absolute inset-0" 
          style={{ backgroundColor: backdropOpacity }}
        >
          <TouchableOpacity 
            className="flex-1"
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        {/* Animated sheet panel (sliding up/down) */}
        <Animated.View 
          className={`bg-white rounded-t-[32px] w-full p-6 pb-10 shadow-2xl border-t border-gray-100 ${className}`}
          style={{ 
            transform: [{ translateY: slideAnim }],
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: -10 },
            shadowOpacity: 0.08,
            shadowRadius: 15,
            elevation: 10,
          }}
        >
          <View className="w-12 h-1.5 bg-gray-200 rounded-full self-center mb-6" />
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
};