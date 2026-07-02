import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { 
  UserIcon, 
  Location01Icon, 
  ShoppingBagIcon, 
  DocumentValidationIcon,
  HelpCircleIcon, 
  Logout01Icon 
} from "@hugeicons/core-free-icons";

interface ProfileScreenProps {
  onResetOnboarding: () => void;
  onEditProfile: () => void;
  onViewOrders: () => void;
  onViewAddresses: () => void;
  onViewFAQs: () => void;
  onViewPrescriptions: () => void;
}

export default function ProfileScreen({
  onResetOnboarding,
  onEditProfile,
  onViewOrders,
  onViewAddresses,
  onViewFAQs,
  onViewPrescriptions,
}: ProfileScreenProps) {
  const options = [
    { label: "Edit Profile", icon: UserIcon, action: onEditProfile },
    { label: "My Orders", icon: ShoppingBagIcon, action: onViewOrders },
    { label: "My Prescriptions", icon: DocumentValidationIcon, action: onViewPrescriptions },
    { label: "Saved Addresses", icon: Location01Icon, action: onViewAddresses },
    { label: "FAQ & Support", icon: HelpCircleIcon, action: onViewFAQs },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* User Card Header */}
        <View className="items-center py-8 border-b border-neutral-100 mb-6">
          <View className="w-24 h-24 rounded-full bg-slate-50 border border-neutral-100 overflow-hidden mb-4 items-center justify-center">
            <Image
              source={require("../../../assets/images/login_doctor.png")}
              className="w-24 h-24 mt-4"
              resizeMode="contain"
            />
          </View>
          <AppText weight="bold" className="text-[20px] text-neutral-800 mb-1">
            Alex Johnson
          </AppText>
          <AppText weight="medium" className="text-[13px] text-neutral-400">
            alex.johnson@domain.com
          </AppText>
        </View>

        {/* Options List */}
        <View className="mb-8">
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.label}
              onPress={opt.action}
              activeOpacity={0.8}
              className="flex-row items-center justify-between py-4 border-b border-neutral-50"
            >
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center border border-neutral-50">
                  <HugeiconsIcon icon={opt.icon} size={20} color="#FF7E3E" />
                </View>
                <AppText weight="bold" className="text-[15px] text-neutral-700">
                  {opt.label}
                </AppText>
              </View>
              <AppText weight="bold" className="text-[16px] text-neutral-300">
                ›
              </AppText>
            </TouchableOpacity>
          ))}

          {/* Reset Onboarding option */}
          <TouchableOpacity
            onPress={onResetOnboarding}
            activeOpacity={0.8}
            className="flex-row items-center justify-between py-4 border-b border-neutral-50"
          >
            <View className="flex-row items-center gap-3.5">
              <View className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center border border-neutral-50">
                <HugeiconsIcon icon={HelpCircleIcon} size={20} color="#FF7E3E" />
              </View>
              <AppText weight="bold" className="text-[15px] text-neutral-700">
                Reset Onboarding (Debug)
              </AppText>
            </View>
            <AppText weight="bold" className="text-[16px] text-neutral-300">
              ›
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Logout CTA */}
        <TouchableOpacity
          onPress={onResetOnboarding}
          activeOpacity={0.8}
          className="flex-row items-center gap-3 py-4 mb-8"
        >
          <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center">
            <HugeiconsIcon icon={Logout01Icon} size={20} color="#EF4444" />
          </View>
          <AppText weight="bold" className="text-[15px] text-status-error-DEFAULT">
            Log Out
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
