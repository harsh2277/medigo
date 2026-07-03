import React from 'react';
import { Pressable, Text, ActivityIndicator, View, PressableProps } from 'react-native';
import { fontFamily } from '../constants/fonts';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  title?: string;
  variant?: 'primary' | 'secondary' | 'line' | 'ghost' | 'solid' | 'outline' | 'link';
  color?: 'primary' | 'secondary' | 'danger';
  size?: 'none' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  color = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  icon,
  className = '',
  ...props
}) => {
  const isIconOnly = !title && (icon || leftIcon || rightIcon);

  // Base styles for the button container
  const baseClasses = 'flex-row items-center justify-center rounded-full border';

  // Size-specific styles (square/circle aspect ratio for icon-only, standard padding for text buttons)
  const sizeClasses = isIconOnly
    ? {
        none: '',
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-14 h-14',
      }
    : {
        none: '',
        sm: 'px-4 py-2',
        md: 'px-6 py-3',
        lg: 'px-8 py-4',
      };

  // Helper to determine background, border, text, and loading indicator colors
  const getVariantStyles = () => {
    // 1. Resolve style type: 'solid' | 'line' | 'ghost' | 'link'
    let resolvedStyle: 'solid' | 'line' | 'ghost' | 'link' = 'solid';
    if (variant === 'line' || variant === 'outline') {
      resolvedStyle = 'line';
    } else if (variant === 'ghost') {
      resolvedStyle = 'ghost';
    } else if (variant === 'link') {
      resolvedStyle = 'link';
    }

    // 2. Resolve color theme: 'primary' | 'secondary' | 'danger'
    let resolvedColor = color;
    if (variant === 'secondary') {
      resolvedColor = 'secondary';
    } else if (variant === 'primary') {
      resolvedColor = 'primary';
    }

    // 3. Generate styles mapping based on style + color theme
    if (resolvedColor === 'secondary') {
      switch (resolvedStyle) {
        case 'line':
          return {
            bg: 'bg-transparent border-secondary border-2',
            text: 'text-secondary font-semibold',
            indicatorColor: '#00B5A3',
          };
        case 'ghost':
          return {
            bg: 'bg-transparent border-transparent',
            text: 'text-secondary font-semibold',
            indicatorColor: '#00B5A3',
          };
        case 'link':
          return {
            bg: 'bg-transparent border-transparent px-2 py-1',
            text: 'text-secondary font-semibold underline',
            indicatorColor: '#00B5A3',
          };
        case 'solid':
        default:
          return {
            bg: 'bg-secondary border-secondary',
            text: 'text-white',
            indicatorColor: '#FFFFFF',
          };
      }
    }

    if (resolvedColor === 'danger') {
      switch (resolvedStyle) {
        case 'line':
          return {
            bg: 'bg-transparent border-red-500 border-2',
            text: 'text-red-500 font-semibold',
            indicatorColor: '#EF4444',
          };
        case 'ghost':
          return {
            bg: 'bg-transparent border-transparent',
            text: 'text-red-500 font-semibold',
            indicatorColor: '#EF4444',
          };
        case 'link':
          return {
            bg: 'bg-transparent border-transparent px-2 py-1',
            text: 'text-red-500 font-semibold underline',
            indicatorColor: '#EF4444',
          };
        case 'solid':
        default:
          return {
            bg: 'bg-red-500 border-red-500',
            text: 'text-white',
            indicatorColor: '#FFFFFF',
          };
      }
    }

    // Default: primary (orange)
    switch (resolvedStyle) {
      case 'line':
        return {
          bg: 'bg-transparent border-primary border-2',
          text: 'text-primary font-semibold',
          indicatorColor: '#FF7E3E',
        };
      case 'ghost':
        return {
          bg: 'bg-transparent border-transparent',
          text: 'text-primary font-semibold',
          indicatorColor: '#FF7E3E',
        };
      case 'link':
        return {
          bg: 'bg-transparent border-transparent px-2 py-1',
          text: 'text-primary font-semibold underline',
          indicatorColor: '#FF7E3E',
        };
      case 'solid':
      default:
        return {
          bg: 'bg-primary border-primary',
          text: 'text-white',
          indicatorColor: '#FFFFFF',
        };
    }
  };

  const { bg, text, indicatorColor } = getVariantStyles();

  // Typography styles depending on the button size
  const textSize = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg font-bold',
  };

  // Split and extract text/font specific classes to pass to the inner Text component
  const classList = className ? className.split(' ') : [];
  const textSpecificClasses = classList.filter(
    (c) => c.startsWith('text-') || c.startsWith('font-')
  );
  const pressableClasses = classList.filter(
    (c) => !c.startsWith('text-') && !c.startsWith('font-')
  );

  const customTextClasses = textSpecificClasses.join(' ');
  const customPressableClasses = pressableClasses.join(' ');
  const hasCustomColor = textSpecificClasses.some((c) => c.startsWith('text-'));

  const getFontFamily = () => {
    const fontClass = textSpecificClasses.find((c) => c.startsWith('font-'));
    const resolvedFont = fontClass ? fontClass.replace('font-', '') : '';
    
    // Default fallback based on size
    const defaultWeight = size === 'lg' ? 'bold' : 'semiBold';
    const weightKey = resolvedFont || defaultWeight;

    // Normalise casing differences (e.g. semibold in css, semiBold in fonts.ts)
    if (weightKey === 'semibold') return fontFamily.semiBold;
    if (weightKey === 'extrabold') return fontFamily.extraBold;
    if (weightKey === 'extralight') return fontFamily.extraLight;

    return (fontFamily as any)[weightKey] || fontFamily.semiBold;
  };

  const hasCustomBg = classList.some((c) => c.startsWith('bg-'));
  const finalBg = hasCustomBg ? bg.split(' ').filter(c => !c.startsWith('bg-')).join(' ') : bg;

  return (
    <Pressable
      disabled={disabled || isLoading}
      style={({ pressed }) => [
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.85 }
      ]}
      className={`${baseClasses} ${sizeClasses[size]} ${finalBg} ${
        disabled ? 'opacity-40' : 'opacity-100'
      } ${customPressableClasses}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : isIconOnly ? (
        <View className="items-center justify-center">
          {icon || leftIcon || rightIcon}
        </View>
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text
            style={{ fontFamily: getFontFamily() }}
            className={`text-center ${hasCustomColor ? customTextClasses : text}`}
          >
            {title}
          </Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
};