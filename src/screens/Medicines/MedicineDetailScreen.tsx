import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, StarIcon, AlertCircleIcon } from "@hugeicons/core-free-icons";
import { Medicine } from "./MedicineListScreen";

const { width } = Dimensions.get("window");

interface MedicineDetailScreenProps {
  medicine: Medicine;
  onBack: () => void;
  onAddToCart: (medicine: Medicine, quantity: number) => void;
  onUploadPrescription: () => void;
}

export default function MedicineDetailScreen({
  medicine,
  onBack,
  onAddToCart,
  onUploadPrescription,
}: MedicineDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);

  const discount = medicine.originalPrice
    ? Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-neutral-100">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center"
          onPress={onBack}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} color="#1F2937" />
        </TouchableOpacity>
        <AppText weight="bold" className="text-[18px] text-neutral-900">
          Medication Details
        </AppText>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Product Image Section */}
        <View className="bg-slate-50 items-center justify-center py-10 relative">
          <Image
            source={medicine.image}
            style={{ width: width * 0.5, height: width * 0.5 }}
            resizeMode="contain"
          />
          {medicine.isPrescription && (
            <View className="absolute top-4 left-6 bg-red-50 px-3 py-1 rounded-full border border-red-100 flex-row items-center gap-1.5">
              <HugeiconsIcon icon={AlertCircleIcon} size={14} color="#EF4444" />
              <AppText weight="bold" className="text-[11px] text-status-error-DEFAULT">
                Prescription Required
              </AppText>
            </View>
          )}
        </View>

        {/* Content Info */}
        <View className="px-6 pt-6">
          <View className="flex-row justify-between items-start gap-4 mb-2">
            <View className="flex-1">
              <AppText weight="bold" className="text-[24px] text-neutral-900 mb-1">
                {medicine.name}
              </AppText>
              <AppText weight="medium" className="text-[14px] text-neutral-400">
                Category: {medicine.category}
              </AppText>
            </View>

            <View className="flex-row items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
              <HugeiconsIcon icon={StarIcon} size={14} color="#FBBF24" />
              <AppText weight="bold" className="text-[12px] text-amber-700">
                {medicine.rating}
              </AppText>
            </View>
          </View>

          {/* Pricing Row */}
          <View className="flex-row items-baseline gap-3 mb-6">
            <AppText weight="bold" className="text-[28px] text-neutral-900">
              ${medicine.price.toFixed(2)}
            </AppText>
            {medicine.originalPrice && (
              <>
                <AppText weight="regular" className="text-[16px] text-neutral-400 line-through">
                  ${medicine.originalPrice.toFixed(2)}
                </AppText>
                <View className="bg-orange-50 px-2 py-0.5 rounded-md">
                  <AppText weight="bold" className="text-[12px] text-primary-500">
                    {discount}% OFF
                  </AppText>
                </View>
              </>
            )}
          </View>

          {/* Prescription Warning Box */}
          {medicine.isPrescription && (
            <View className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 flex-row items-start gap-3 mb-6">
              <HugeiconsIcon icon={AlertCircleIcon} size={20} color="#D97706" className="mt-0.5" />
              <View className="flex-1">
                <AppText weight="bold" className="text-[14px] text-amber-800 mb-1">
                  Upload prescription to checkout
                </AppText>
                <AppText weight="regular" className="text-[12px] text-amber-700/80 leading-[18px] mb-3">
                  This item requires a doctor's prescription. If you don't have one, please upload to verify.
                </AppText>
                <TouchableOpacity
                  className="bg-amber-600 rounded-lg py-2 px-4 self-start"
                  onPress={onUploadPrescription}
                >
                  <AppText weight="bold" className="text-[12px] text-white">
                    Upload Prescription
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Details Sections */}
          <View className="gap-5 pb-8">
            <View>
              <AppText weight="bold" className="text-[16px] text-neutral-900 mb-2">
                Description
              </AppText>
              <AppText weight="regular" className="text-[14px] text-neutral-500 leading-[22px]">
                {medicine.description}
              </AppText>
            </View>

            <View>
              <AppText weight="bold" className="text-[16px] text-neutral-900 mb-2">
                Directions for Use
              </AppText>
              <AppText weight="regular" className="text-[14px] text-neutral-500 leading-[22px]">
                {medicine.usage}
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="border-t border-neutral-100 px-6 py-4 flex-row items-center gap-4 bg-white">
        {/* Quantity Stepper */}
        <View className="flex-row items-center border border-neutral-200 rounded-full h-12 px-3 gap-4">
          <TouchableOpacity
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-6 h-6 items-center justify-center"
          >
            <AppText weight="bold" className="text-[18px] text-neutral-500">-</AppText>
          </TouchableOpacity>
          <AppText weight="bold" className="text-[16px] text-neutral-900 w-6 text-center">
            {quantity}
          </AppText>
          <TouchableOpacity
            onPress={() => setQuantity((q) => q + 1)}
            className="w-6 h-6 items-center justify-center"
          >
            <AppText weight="bold" className="text-[18px] text-neutral-500">+</AppText>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <Button
          title="Add to Cart"
          variant="primary"
          className="flex-1 h-12"
          onPress={() => onAddToCart(medicine, quantity)}
        />
      </View>
    </SafeAreaView>
  );
}
