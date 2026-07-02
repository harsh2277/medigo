import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { Order } from "./OrderListScreen";

interface OrderTrackingScreenProps {
  order: Order;
  onBack: () => void;
}

export default function OrderTrackingScreen({
  order,
  onBack,
}: OrderTrackingScreenProps) {
  const trackingSteps = [
    { title: "Order Confirmed", desc: "Your order has been received and confirmed.", date: "10:30 AM", active: true },
    { title: "Processing Medication", desc: "Pharmacist is verifying and packaging items.", date: "11:15 AM", active: true },
    { title: "Out for Delivery", desc: "Delivery partner is on the way to your address.", date: "In Progress", active: false },
    { title: "Delivered", desc: "Package received by customer.", date: "Pending", active: false },
  ];

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
            Track Order
          </AppText>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
        {/* Estimated Delivery Window card */}
        <View className="bg-secondary-500 rounded-3xl p-6 mb-8 shadow-sm shadow-secondary-500/20">
          <AppText weight="bold" className="text-white text-[13px] uppercase tracking-wider mb-2 opacity-80">
            Estimated Delivery Time
          </AppText>
          <AppText weight="black" className="text-white text-[28px] mb-4">
            Today, 02:30 PM
          </AppText>
          <AppText weight="medium" className="text-teal-100 text-[13px]">
            Delivery Agent: David Miller (+1 555-0199)
          </AppText>
        </View>

        {/* Stepped vertical timeline */}
        <View className="pl-2">
          {trackingSteps.map((step, index) => {
            const isLast = index === trackingSteps.length - 1;
            return (
              <View key={step.title} className="flex-row gap-4 mb-8">
                {/* Timeline node & line */}
                <View className="items-center">
                  <View
                    className={`w-6 h-6 rounded-full items-center justify-center border-2 ${
                      step.active
                        ? "border-primary-500 bg-primary-500"
                        : step.date === "In Progress"
                        ? "border-primary-500 bg-white"
                        : "border-neutral-200 bg-white"
                    }`}
                  >
                    {step.active && (
                      <View className="w-2 h-2 rounded-full bg-white" />
                    )}
                    {step.date === "In Progress" && (
                      <View className="w-2 h-2 rounded-full bg-primary-500" />
                    )}
                  </View>

                  {!isLast && (
                    <View
                      className={`w-[2px] flex-1 min-h-[40px] mt-2 ${
                        step.active ? "bg-primary-500" : "bg-neutral-200"
                      }`}
                    />
                  )}
                </View>

                {/* Step Info */}
                <View className="flex-1 -mt-1">
                  <View className="flex-row justify-between items-baseline mb-1">
                    <AppText weight="bold" className={`text-[15px] ${step.active || step.date === "In Progress" ? "text-neutral-800" : "text-neutral-400"}`}>
                      {step.title}
                    </AppText>
                    <AppText weight="bold" className={`text-[12px] ${step.active ? "text-secondary-500" : "text-neutral-400"}`}>
                      {step.date}
                    </AppText>
                  </View>
                  <AppText weight="regular" className="text-[13px] text-neutral-400 leading-[18px]">
                    {step.desc}
                  </AppText>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
