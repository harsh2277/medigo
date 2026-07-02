import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, Notification01Icon, Tag01Icon, Calendar02Icon } from "@hugeicons/core-free-icons";

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "system" | "promo" | "appointment";
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Medication Shipment Shipped",
    desc: "Your order MD-98721 has been handed over to our delivery partner and is on the way.",
    time: "10 mins ago",
    type: "system",
    read: false,
  },
  {
    id: "2",
    title: "Flat 20% Off on Lab Packages!",
    desc: "Use coupon HEALTH20 to get flat discounts on all full body diagnostic packages.",
    time: "2 hours ago",
    type: "promo",
    read: false,
  },
  {
    id: "3",
    title: "Consultation Booked Successfully",
    desc: "Your video session with Dr. Sarah Jenkins is scheduled for Jul 4, 10:00 AM.",
    time: "Yesterday",
    type: "appointment",
    read: true,
  },
];

interface NotificationListScreenProps {
  onBack: () => void;
}

export default function NotificationListScreen({
  onBack,
}: NotificationListScreenProps) {
  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "promo":
        return Tag01Icon;
      case "appointment":
        return Calendar02Icon;
      case "system":
      default:
        return Notification01Icon;
    }
  };

  const getIconBg = (type: NotificationItem["type"]) => {
    switch (type) {
      case "promo":
        return "bg-orange-50";
      case "appointment":
        return "bg-teal-50";
      case "system":
      default:
        return "bg-blue-50";
    }
  };

  const getIconColor = (type: NotificationItem["type"]) => {
    switch (type) {
      case "promo":
        return "#FF7E3E";
      case "appointment":
        return "#0D9488";
      case "system":
      default:
        return "#3B82F6";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-neutral-100">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center"
            onPress={onBack}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} color="#1F2937" />
          </TouchableOpacity>
          <AppText weight="bold" className="text-[20px] text-neutral-900">
            Notifications
          </AppText>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <AppText weight="bold" className="text-[13px] text-secondary-500">
            Mark all read
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            className={`border border-neutral-100 rounded-2xl p-4 mb-4 flex-row items-start gap-4 ${
              item.read ? "bg-white" : "bg-orange-50/5"
            }`}
          >
            {/* Notification Type Icon */}
            <View className={`w-11 h-11 rounded-xl items-center justify-center ${getIconBg(item.type)}`}>
              <HugeiconsIcon icon={getIcon(item.type)} size={20} color={getIconColor(item.type)} />
            </View>

            {/* Content Info */}
            <View className="flex-1">
              <View className="flex-row justify-between items-start gap-2 mb-1">
                <AppText weight="bold" className={`text-[14px] flex-1 ${item.read ? "text-neutral-700" : "text-neutral-900"}`}>
                  {item.title}
                </AppText>
                {!item.read && (
                  <View className="w-2 h-2 rounded-full bg-primary-500 mt-1.5" />
                )}
              </View>

              <AppText weight="regular" className="text-[12px] text-neutral-400 leading-[18px] mb-2">
                {item.desc}
              </AppText>
              <AppText weight="medium" className="text-[11px] text-neutral-400">
                {item.time}
              </AppText>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
