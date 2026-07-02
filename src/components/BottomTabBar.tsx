import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export interface TabItem {
  key: string;
  label: string;
}

export interface BottomTabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabSelect: (key: string) => void;
  className?: string;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs,
  activeTab,
  onTabSelect,
  className = ''
}) => {
  return (
    <View className={`flex-row bg-white rounded-t-3xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] elevation-[10] pt-4 pb-8 px-6 justify-between ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onTabSelect(tab.key)}
            className="items-center justify-center flex-1"
          >
            <View className={`w-12 h-10 rounded-full items-center justify-center mb-1 ${isActive ? 'bg-primary/10' : 'bg-transparent'}`}>
              <View className={`w-5 h-5 rounded-sm ${isActive ? 'bg-primary' : 'bg-gray-400'}`} />
            </View>
            <Text
              className={`text-xs ${isActive ? 'text-primary' : 'text-gray-500'}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};