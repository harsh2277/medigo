import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { Medicine } from "../Medicines/MedicineListScreen";

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

interface CartScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartScreen({
  cartItems,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartScreenProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.0 : 0.0;
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
            Shopping Cart
          </AppText>
        </View>
        <AppText weight="medium" className="text-[14px] text-neutral-500">
          {cartItems.length} items
        </AppText>
      </View>

      {cartItems.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6 gap-4">
          <Image
            source={require("../../../assets/images/onboarding_pharmacy.png")}
            className="w-40 h-40 opacity-70"
            resizeMode="contain"
          />
          <AppText weight="bold" className="text-[20px] text-neutral-900">
            Your cart is empty
          </AppText>
          <AppText weight="regular" className="text-[14px] text-neutral-500 text-center px-6 leading-[22px]">
            Browse our catalog and add medicines or healthcare products to get started.
          </AppText>
          <Button
            title="Browse Catalog"
            variant="primary"
            className="w-full max-w-xs mt-4"
            onPress={onBack}
          />
        </View>
      ) : (
        <>
          {/* Cart Items List */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.medicine.id}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
            renderItem={({ item }) => (
              <View className="flex-row items-center border border-neutral-100 rounded-2xl p-4 mb-4 shadow-sm bg-white">
                <Image
                  source={item.medicine.image}
                  className="w-16 h-16 mr-4"
                  resizeMode="contain"
                />

                <View className="flex-1 mr-2">
                  <AppText weight="bold" className="text-[15px] text-neutral-800 mb-1" numberOfLines={1}>
                    {item.medicine.name}
                  </AppText>
                  <AppText weight="regular" className="text-[12px] text-neutral-400 mb-2">
                    ${item.medicine.price.toFixed(2)} each
                  </AppText>

                  {/* Quantity Stepper */}
                  <View className="flex-row items-center border border-neutral-100 rounded-full h-8 px-2.5 gap-3 self-start">
                    <TouchableOpacity
                      onPress={() => onUpdateQuantity(item.medicine.id, item.quantity - 1)}
                      className="w-4 h-4 items-center justify-center"
                    >
                      <AppText weight="bold" className="text-[14px] text-neutral-500">-</AppText>
                    </TouchableOpacity>
                    <AppText weight="bold" className="text-[13px] text-neutral-900 w-4 text-center">
                      {item.quantity}
                    </AppText>
                    <TouchableOpacity
                      onPress={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                      className="w-4 h-4 items-center justify-center"
                    >
                      <AppText weight="bold" className="text-[14px] text-neutral-500">+</AppText>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Remove Item */}
                <TouchableOpacity
                  onPress={() => onRemoveItem(item.medicine.id)}
                  className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Payment Details summary card */}
          <View className="border-t border-neutral-100 px-6 pt-6 pb-4 bg-white shadow-xl">
            <AppText weight="bold" className="text-[16px] text-neutral-900 mb-4">
              Payment Details
            </AppText>

            <View className="gap-2.5 mb-6">
              <View className="flex-row justify-between">
                <AppText weight="regular" className="text-[14px] text-neutral-400">Subtotal</AppText>
                <AppText weight="bold" className="text-[14px] text-neutral-800">${subtotal.toFixed(2)}</AppText>
              </View>
              <View className="flex-row justify-between">
                <AppText weight="regular" className="text-[14px] text-neutral-400">Delivery Fee</AppText>
                <AppText weight="bold" className="text-[14px] text-neutral-800">${shipping.toFixed(2)}</AppText>
              </View>
              <View className="flex-row justify-between">
                <AppText weight="regular" className="text-[14px] text-neutral-400">Taxes (8%)</AppText>
                <AppText weight="bold" className="text-[14px] text-neutral-800">${tax.toFixed(2)}</AppText>
              </View>
              <View className="h-[1px] bg-neutral-100 my-1" />
              <View className="flex-row justify-between">
                <AppText weight="bold" className="text-[16px] text-neutral-900">Total Price</AppText>
                <AppText weight="black" className="text-[18px] text-secondary-500">${total.toFixed(2)}</AppText>
              </View>
            </View>

            <Button
              title="Proceed to Checkout"
              variant="primary"
              size="lg"
              className="w-full"
              onPress={onCheckout}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
