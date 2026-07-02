import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, View, Text } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { CheckIcon } from '@hugeicons/core-free-icons';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, className = '' }) => {
  const animValue = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: checked ? 1 : 0,
      duration: 180,
      useNativeDriver: false, // Color and layout scale updates
    }).start();
  }, [checked]);

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const opacity = animValue;

  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FF7E3E'], // white to primary orange
  });

  const borderColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CBD5E1', '#FF7E3E'], // slate-300 to primary orange
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onChange(!checked)}
      className={`flex-row items-center ${className}`}
    >
      <Animated.View 
        style={{ 
          backgroundColor, 
          borderColor,
          width: 24,
          height: 24,
          borderRadius: 8,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <HugeiconsIcon icon={CheckIcon} size={14} color="#ffffff" />
        </Animated.View>
      </Animated.View>
      {label ? (
        <Text className="ml-3 text-gray-700 font-sans font-medium">
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};