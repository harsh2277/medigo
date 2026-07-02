import React from 'react';
import { View, Text } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { CheckIcon } from '@hugeicons/core-free-icons';

export interface StepperProps {
  steps: string[];
  currentStep: number; // 0-indexed
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className = '' }) => {
  return (
    <View className={`flex-row items-center w-full justify-between px-2 ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <View key={step} className="items-center flex-1">
            <View className="flex-row items-center w-full">
              {/* Left Line Segment */}
              <View 
                className={`flex-1 h-[2px] ${
                  index === 0 
                    ? 'bg-transparent' 
                    : (isCompleted || isActive ? 'bg-primary' : 'bg-gray-200')
                }`} 
              />
              
              {/* Step Indicator Node */}
              <View 
                className={`w-10 h-10 rounded-full items-center justify-center z-10 border-2 ${
                  isActive 
                    ? 'border-primary bg-white' 
                    : isCompleted 
                      ? 'border-primary bg-primary' 
                      : 'border-gray-200 bg-white'
                }`}
              >
                {isCompleted ? (
                  <HugeiconsIcon icon={CheckIcon} size={18} color="#ffffff" />
                ) : (
                  <Text 
                    className={`font-sans text-sm font-bold ${
                      isActive ? 'text-primary' : 'text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              
              {/* Right Line Segment */}
              <View 
                className={`flex-1 h-[2px] ${
                  index === steps.length - 1 
                    ? 'bg-transparent' 
                    : (isCompleted ? 'bg-primary' : 'bg-gray-200')
                }`} 
              />
            </View>
            
            {/* Step Label Text */}
            <Text 
              className={`text-xs mt-2 font-sans font-semibold text-center px-1 ${
                isActive 
                  ? 'text-primary font-bold' 
                  : isCompleted 
                    ? 'text-gray-800' 
                    : 'text-gray-400'
              }`}
            >
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
};