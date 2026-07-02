import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText, StatusBadge } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { Order } from "./OrderListScreen";

interface OrderDetailScreenProps {
  order: Order;
  onBack: () => void;
  onTrackOrder: () => void;
}

export default function OrderDetailScreen({
  order,
  onBack,
  onTrackOrder,
}: OrderDetailScreenProps) {
  const getBadgeType = (status: Order["status"]): "pending" | "completed" | "cancelled" | "active" => {
    switch (status) {
      case "delivered":
        return "completed";
      case "cancelled":
        return "cancelled";
      case "pending":
      case "processing":
      case "shipped":
      default:
        return "pending";
    }
  };

  const mockItems = [
    { name: "Paracetamol 500mg", qty: 2, price: 4.99 },
    { name: "Vitamin C 1000mg Chewable", qty: 1, price: 12.99 },
  ];

  const subtotal = mockItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = 5.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
            Order Details
          </AppText>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-4">
        {/* Order Status header card */}
        <View className="border border-neutral-100 bg-slate-50 rounded-3xl p-5 mb-6 flex-row justify-between items-center">
          <View>
            <AppText weight="bold" className="text-[16px] text-neutral-800 mb-1">
              Order {order.orderNumber}
            </AppText>
            <AppText weight="medium" className="text-[13px] text-neutral-400">
              Placed on {order.date}
            </AppText>
          </View>
          <StatusBadge
            status={getBadgeType(order.status)}
          />
        </View>

        {/* Shipping Address */}
        <View className="mb-6">
          <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
            Delivery Address
          </AppText>
          <View className="border border-neutral-100 rounded-2xl p-4 flex-row items-start gap-3 bg-white shadow-sm">
            <HugeiconsIcon icon={Location01Icon} size={20} color="#9CA3AF" className="mt-0.5" />
            <View className="flex-1">
              <AppText weight="bold" className="text-[14px] text-neutral-800 mb-1">
                Home Address
              </AppText>
              <AppText weight="regular" className="text-[12px] text-neutral-500 leading-[18px]">
                123 Health Ave, Medical District, NY 10001
              </AppText>
            </View>
          </View>
        </View>

        {/* Item List */}
        <View className="mb-6">
          <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
            Items Ordered
          </AppText>
          {mockItems.map((item) => (
            <View
              key={item.name}
              className="flex-row justify-between items-center border border-neutral-50 bg-white rounded-2xl p-4 mb-3 shadow-sm"
            >
              <View className="flex-1 mr-2">
                <AppText weight="bold" className="text-[14px] text-neutral-800 mb-1">
                  {item.name}
                </AppText>
                <AppText weight="medium" className="text-[12px] text-neutral-400">
                  Qty: {item.qty} • ${item.price.toFixed(2)} each
                </AppText>
              </View>
              <AppText weight="bold" className="text-[14px] text-neutral-800">
                ${(item.price * item.qty).toFixed(2)}
              </AppText>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View className="mb-8 border border-neutral-100 bg-white rounded-2xl p-4 shadow-sm">
          <AppText weight="bold" className="text-[15px] text-neutral-800 mb-3">
            Payment Summary
          </AppText>

          <View className="gap-2.5">
            <View className="flex-row justify-between">
              <AppText weight="regular" className="text-[13px] text-neutral-400">Subtotal</AppText>
              <AppText weight="bold" className="text-[13px] text-neutral-700">${subtotal.toFixed(2)}</AppText>
            </View>
            <View className="flex-row justify-between">
              <AppText weight="regular" className="text-[13px] text-neutral-400">Delivery Fee</AppText>
              <AppText weight="bold" className="text-[13px] text-neutral-700">${shipping.toFixed(2)}</AppText>
            </View>
            <View className="flex-row justify-between">
              <AppText weight="regular" className="text-[13px] text-neutral-400">Taxes (8%)</AppText>
              <AppText weight="bold" className="text-[13px] text-neutral-700">${tax.toFixed(2)}</AppText>
            </View>
            <View className="h-[1px] bg-neutral-100 my-1" />
            <View className="flex-row justify-between">
              <AppText weight="bold" className="text-[15px] text-neutral-900">Total Price</AppText>
              <AppText weight="black" className="text-[16px] text-secondary-500">${total.toFixed(2)}</AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Track order sticky action button */}
      {order.status !== "cancelled" && order.status !== "delivered" && (
        <View className="border-t border-neutral-100 px-6 py-4 bg-white">
          <Button
            title="Track Order Status"
            variant="primary"
            size="lg"
            onPress={onTrackOrder}
            className="w-full"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
