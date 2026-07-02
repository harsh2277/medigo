import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Easing, Pressable, ScrollView } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ChevronDownIcon, CheckIcon } from '@hugeicons/core-free-icons';
import { fontFamily } from '../constants/fonts';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onSelect,
  placeholder = 'Select an option',
  label,
  className = '',
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  // Animating label floating effect
  const animatedIsActive = useRef(new Animated.Value(selectedValue !== '' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsActive, {
      toValue: (isOpen || selectedValue !== '') ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true, // Native performance on UI thread
    }).start();
  }, [isOpen, selectedValue]);

  // Interpolations
  const labelTranslateY = animatedIsActive.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -32], // 0 centered, -32 floats to top border
  });

  const labelScale = animatedIsActive.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7], // scale down from 1 (16px) to 0.7 (~11px)
  });

  // Determine active border color
  let borderColorClass = 'border-gray-200';
  if (error) {
    borderColorClass = 'border-red-500';
  } else if (isOpen) {
    borderColorClass = 'border-primary';
  }

  // Determine label color
  let labelColor = '#6B7280'; // gray-500
  if (error) {
    labelColor = '#EF4444'; // red-500
  } else if (isOpen) {
    labelColor = '#FF7E3E'; // primary orange
  }

  return (
    <View
      className={`w-full ${disabled ? 'opacity-60' : 'opacity-100'} ${className}`}
      style={{ zIndex: isOpen ? 9999 : 1 }}
    >
      <View className="relative mt-2" style={{ zIndex: isOpen ? 9999 : 1 }}>
        {/* Animated Floating Label */}
        {label ? (
          <Animated.View
            style={{
              position: 'absolute',
              left: 18,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              zIndex: 10,
              pointerEvents: 'none',
              transform: [
                { translateY: labelTranslateY },
                { scale: labelScale }
              ],
              transformOrigin: 'left center' as any,
            }}
          >
            <Animated.Text
              style={{
                fontSize: 16,
                color: labelColor,
                fontWeight: '500',
                fontFamily: fontFamily.medium,
                backgroundColor: 'white',
                paddingHorizontal: 4,
              }}
            >
              {label}
            </Animated.Text>
          </Animated.View>
        ) : null}

        {/* Dropdown Button */}
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.7}
          onPress={() => setIsOpen(true)}
          className={`flex-row items-center justify-between border ${borderColorClass} ${disabled ? 'bg-gray-50' : 'bg-white'
            } rounded-full px-5 h-16`}
        >
          <Text
            className={`font-sans text-base ${selectedOption
              ? 'text-gray-900 font-medium'
              : (isOpen ? 'text-gray-400' : 'text-transparent')
              }`}
            style={{
              fontFamily: selectedOption ? fontFamily.medium : fontFamily.regular,
            }}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>

          <View style={{ marginLeft: 10 }}>
            <HugeiconsIcon
              icon={ChevronDownIcon}
              size={20}
              color={isOpen ? '#FF7E3E' : '#9CA3AF'}
            />
          </View>
        </TouchableOpacity>
        {/* Custom Dropdown List (Rendered directly below the button field) */}
        {isOpen && (
          <>
            {/* Fullscreen pressable backdrop to close dropdown on tap outside */}
            <Pressable
              style={{
                position: 'absolute',
                top: -1000,
                bottom: -1000,
                left: -1000,
                right: -1000,
                zIndex: 998,
                backgroundColor: 'transparent',
              }}
              onPress={() => setIsOpen(false)}
            />
            <View
              className="absolute left-0 right-0 bg-white rounded-3xl border border-gray-200 overflow-hidden py-2"
              style={{
                top: 72, // sits exactly 8px below the 64px button (64 + 8 = 72)
                zIndex: 999,
                maxHeight: 200,
              }}
            >
              <ScrollView nestedScrollEnabled={true}>
                {options.map((item) => {
                  const isSelected = item.value === selectedValue;
                  return (
                    <TouchableOpacity
                      key={item.value}
                      className={`flex-row items-center justify-between px-6 py-4 border-b border-gray-50 last:border-b-0 ${isSelected ? 'bg-orange-50/50' : ''
                        }`}
                      onPress={() => {
                        onSelect(item.value);
                        setSelectedValue(item.value);
                        setIsOpen(false);
                      }}
                    >
                      <Text
                        className="text-base"
                        style={{
                          fontFamily: isSelected ? fontFamily.semiBold : fontFamily.regular,
                          color: isSelected ? '#FF7E3E' : '#1F2937',
                        }}
                      >
                        {item.label}
                      </Text>
                      {isSelected && (
                        <HugeiconsIcon icon={CheckIcon} size={18} color="#FF7E3E" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
      </View>

      {error ? (
        <Text 
          className="text-red-500 text-xs mt-1 ml-4"
          style={{ fontFamily: fontFamily.medium }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};