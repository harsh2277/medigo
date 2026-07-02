import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText, StatusBadge } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  itemsCount: number;
  totalPrice: number;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "MD-98721",
    date: "July 02, 2026",
    status: "processing",
    itemsCount: 3,
    totalPrice: 42.80,
  },
  {
    id: "2",
    orderNumber: "MD-87612",
    date: "June 28, 2026",
    status: "delivered",
    itemsCount: 1,
    totalPrice: 15.50,
  },
  {
    id: "3",
    orderNumber: "MD-76510",
    date: "June 14, 2026",
    status: "cancelled",
    itemsCount: 2,
    totalPrice: 28.00,
  },
];

interface OrderListScreenProps {
  onBack: () => void;
  onSelectOrder: (order: Order) => void;
}

export default function OrderListScreen({
  onBack,
  onSelectOrder,
}: OrderListScreenProps) {
  const [activeTab, setActiveTab] = useState<"Active" | "Completed" | "Cancelled">("Active");

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

  const getFilteredOrders = () => {
    return mockOrders.filter((order) => {
      if (activeTab === "Active") {
        return ["pending", "processing", "shipped"].includes(order.status);
      } else if (activeTab === "Completed") {
        return order.status === "delivered";
      } else {
        return order.status === "cancelled";
      }
    });
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
            My Orders
          </AppText>
        </View>
        <View className="w-10" />
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-neutral-100 px-6 py-3 justify-between">
        {(["Active", "Completed", "Cancelled"] as const).map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 ${
                isSelected ? "border-primary-500" : "border-transparent"
              }`}
            >
              <AppText
                weight={isSelected ? "bold" : "medium"}
                className={`text-[14px] ${isSelected ? "text-primary-500" : "text-neutral-400"}`}
              >
                {tab}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Orders List */}
      <FlatList
        data={getFilteredOrders()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onSelectOrder(item)}
            className="border border-neutral-100 bg-white rounded-2xl p-4 mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-center mb-3">
              <View>
                <AppText weight="bold" className="text-[15px] text-neutral-800 mb-0.5">
                  Order {item.orderNumber}
                </AppText>
                <AppText weight="regular" className="text-[12px] text-neutral-400">
                  Placed on {item.date}
                </AppText>
              </View>
              <StatusBadge
                status={getBadgeType(item.status)}
              />
            </View>

            <View className="flex-row justify-between items-center border-t border-neutral-50/50 pt-3">
              <AppText weight="medium" className="text-[13px] text-neutral-500">
                {item.itemsCount} Items
              </AppText>
              <AppText weight="bold" className="text-[15px] text-neutral-800">
                ${item.totalPrice.toFixed(2)}
              </AppText>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
