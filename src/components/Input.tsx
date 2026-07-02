import React, { useState, useEffect, useRef } from 'react';
import { TextInput, TextInputProps, View, Text, Animated, Easing, Pressable } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { EyeIcon, EyeOffIcon } from '@hugeicons/core-free-icons';
import { fontFamily } from '../constants/fonts';

export interface InputProps extends Omit<TextInputProps, 'placeholder'> {
  label: string;
  placeholder?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string;
  isPassword?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  error,
  leftIcon,
  rightIcon,
  prefix,
  isPassword = false,
  disabled = false,
  className = '',
  value,
  multiline = false,
  onFocus,
  onBlur,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [secureText, setSecureText] = useState(isPassword);

  // Sync value changes from parent components
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const animatedIsFocused = useRef(new Animated.Value(inputValue === '' ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || inputValue !== '') ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true, // Native driver runs on UI thread for fluid performance
    }).start();
  }, [isFocused, inputValue]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  // Determine active border color
  let borderColorClass = 'border-gray-200';
  if (error) {
    borderColorClass = 'border-red-500';
  } else if (isFocused) {
    borderColorClass = 'border-primary';
  }

  // Determine label color
  let labelColor = '#6B7280'; // gray-500
  if (error) {
    labelColor = '#EF4444'; // red-500
  } else if (isFocused) {
    labelColor = '#FF7E3E'; // primary color (orange)
  }

  // Compute shifts for translation instead of mutating layout left offset
  let shiftX = 0;
  if (leftIcon) shiftX += 28;
  if (prefix) shiftX += 36;

  const labelTranslateX = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [shiftX, 0],
  });

  const labelTranslateY = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [0, multiline ? -22 : -32],
  });

  const labelScale = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7], // scale down from 1 (16px) to 0.7 (~11px)
  });

  return (
    <View className={`w-full ${disabled ? 'opacity-60' : 'opacity-100'} ${className}`}>
      <View className="relative mt-2">
        {/* Animated Floating Label */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 20,
            top: multiline ? 14 : 0,
            bottom: multiline ? undefined : 0,
            justifyContent: multiline ? undefined : 'center',
            zIndex: 10,
            pointerEvents: 'none',
            transform: [
              { translateY: labelTranslateY },
              { translateX: labelTranslateX },
              { scale: labelScale }
            ],
            // Use transformOrigin if available on platform, otherwise translateY/translateX will center scale.
            // On React Native, we can also set the width or align it left:
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

        {/* Input border box */}
        <View
          className={`flex-row border ${borderColorClass} ${disabled ? 'bg-gray-50' : 'bg-white'} ${
            multiline ? 'rounded-[28px]' : 'rounded-full'
          } px-5 ${multiline ? 'items-start py-3 h-32' : 'items-center h-16'}`}
        >
          {leftIcon && <View className={multiline ? 'mt-1 mr-2' : 'mr-2'}>{leftIcon}</View>}
          
          {prefix && (
            <Text className={`text-gray-900 font-sans font-medium mr-2 text-base ${multiline ? 'mt-1' : ''}`}>
              {prefix}
            </Text>
          )}

          <TextInput
            className="flex-1 font-sans text-gray-900 h-full text-base"
            style={{
              paddingVertical: 0,
              textAlignVertical: multiline ? 'top' : 'center',
            }}
            placeholder={isFocused ? placeholder : ''}
            placeholderTextColor="#9CA3AF"
            value={inputValue}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureText}
            editable={!disabled}
            multiline={multiline}
            {...props}
          />

          {isPassword && (
            <Pressable onPress={() => setSecureText(!secureText)} className="ml-2">
              <HugeiconsIcon
                icon={secureText ? EyeOffIcon : EyeIcon}
                size={20}
                color={isFocused ? '#FF7E3E' : '#9CA3AF'}
              />
            </Pressable>
          )}

          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </View>
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