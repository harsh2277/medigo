import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText, RadioButton } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, Location01Icon, CreditCardIcon } from "@hugeicons/core-free-icons";
import { CartItem } from "./CartScreen";

interface CheckoutScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPlaceOrder: (address: string, paymentMethod: string) => void;
}

export default function CheckoutScreen({
  cartItems,
  onBack,
  onPlaceOrder,
}: CheckoutScreenProps) {
  const [selectedAddress, setSelectedAddress] = useState("Home");
  const [selectedPayment, setSelectedPayment] = useState("UPI");

  const subtotal = cartItems.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);
  const shipping = 5.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const addresses = [
    {
      id: "Home",
      title: "Home Address",
      detail: "123 Health Ave, Medical District, NY 10001",
    },
    {
      id: "Office",
      title: "Office Address",
      detail: "456 Corporate Blvd, Tech Park, NY 10022",
    },
  ];

  const paymentMethods = [
    { id: "UPI", title: "UPI / Google Pay / PhonePe" },
    { id: "Card", title: "Credit / Debit Card" },
    { id: "COD", title: "Cash on Delivery" },
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
            Checkout
          </AppText>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-4">
        {/* Step progress bar using NativeWind */}
        <View className="flex-row justify-between items-center bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
          <View className="items-center flex-1">
            <View className="w-8 h-8 rounded-full bg-primary-500 items-center justify-center mb-1">
              <AppText weight="bold" className="text-[12px] text-white">✓</AppText>
            </View>
            <AppText weight="bold" className="text-[11px] text-neutral-500">Cart</AppText>
          </View>
          <View className="flex-1 h-[2px] bg-primary-500" />
          <View className="items-center flex-1">
            <View className="w-8 h-8 rounded-full bg-primary-500 items-center justify-center mb-1 border-2 border-primary-500">
              <AppText weight="bold" className="text-[12px] text-white">2</AppText>
            </View>
            <AppText weight="bold" className="text-[11px] text-primary-500">Checkout</AppText>
          </View>
          <View className="flex-1 h-[2px] bg-neutral-200" />
          <View className="items-center flex-1">
            <View className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center mb-1 border-2 border-neutral-200">
              <AppText weight="bold" className="text-[12px] text-neutral-400">3</AppText>
            </View>
            <AppText weight="medium" className="text-[11px] text-neutral-400">Tracking</AppText>
          </View>
        </View>

        {/* Address Selection */}
        <View className="mb-6">
          <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
            Select Delivery Address
          </AppText>
          {addresses.map((addr) => (
            <TouchableOpacity
              key={addr.id}
              activeOpacity={0.8}
              onPress={() => setSelectedAddress(addr.id)}
              className={`flex-row items-center border rounded-2xl p-4 mb-3 ${
                selectedAddress === addr.id
                  ? "border-primary-500 bg-orange-50/10"
                  : "border-neutral-100 bg-white"
              }`}
            >
              <HugeiconsIcon icon={Location01Icon} size={22} color={selectedAddress === addr.id ? "#FF7E3E" : "#9CA3AF"} className="mr-3" />
              <View className="flex-1 mr-2">
                <AppText weight="bold" className="text-[14px] text-neutral-800 mb-1">
                  {addr.title}
                </AppText>
                <AppText weight="regular" className="text-[12px] text-neutral-400 leading-[18px]">
                  {addr.detail}
                </AppText>
              </View>
              <RadioButton
                selected={selectedAddress === addr.id}
                onSelect={() => setSelectedAddress(addr.id)}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Selection */}
        <View className="mb-8">
          <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
            Select Payment Method
          </AppText>
          {paymentMethods.map((pay) => (
            <TouchableOpacity
              key={pay.id}
              activeOpacity={0.8}
              onPress={() => setSelectedPayment(pay.id)}
              className={`flex-row items-center border rounded-2xl p-4 mb-3 ${
                selectedPayment === pay.id
                  ? "border-primary-500 bg-orange-50/10"
                  : "border-neutral-100 bg-white"
              }`}
            >
              <HugeiconsIcon icon={CreditCardIcon} size={22} color={selectedPayment === pay.id ? "#FF7E3E" : "#9CA3AF"} className="mr-3" />
              <View className="flex-1">
                <AppText weight="bold" className="text-[14px] text-neutral-800">
                  {pay.title}
                </AppText>
              </View>
              <RadioButton
                selected={selectedPayment === pay.id}
                onSelect={() => setSelectedPayment(pay.id)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bill summary and place order sticky button */}
      <View className="border-t border-neutral-100 px-6 py-4 bg-white shadow-xl">
        <View className="flex-row justify-between items-baseline mb-4">
          <AppText weight="bold" className="text-[16px] text-neutral-900">Total Bill</AppText>
          <AppText weight="black" className="text-[20px] text-secondary-500">${total.toFixed(2)}</AppText>
        </View>
        <Button
          title="Place Order"
          variant="primary"
          size="lg"
          className="w-full"
          onPress={() => onPlaceOrder(selectedAddress, selectedPayment)}
        />
      </View>
    </SafeAreaView>
  );
}
