import React, { useState, useEffect } from 'react';
import { TextInput, TextInputProps, View, Text, Pressable } from 'react-native';
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
    borderColorClass = 'border-[#FF7E3E]';
  }

  // Determine label color
  let labelColor = 'text-neutral-700';
  if (error) {
    labelColor = 'text-red-500';
  } else if (isFocused) {
    labelColor = 'text-[#FF7E3E]';
  }

  return (
    <View className={`w-full ${disabled ? 'opacity-60' : 'opacity-100'} ${className}`}>
      {/* Static Label above the field */}
      <Text
        className={`text-[14px] font-semibold mb-2 ml-1 ${labelColor}`}
        style={{ fontFamily: fontFamily.semiBold }}
      >
        {label}
      </Text>

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
          placeholder={placeholder}
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

      {error ? (
        <Text 
          className="text-red-500 text-xs mt-1.5 ml-4"
          style={{ fontFamily: fontFamily.medium }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};