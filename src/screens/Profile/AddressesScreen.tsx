import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, Location01Icon, Delete02Icon } from "@hugeicons/core-free-icons";

interface Address {
  id: string;
  tag: string;
  detail: string;
}

interface AddressesScreenProps {
  onBack: () => void;
}

export default function AddressesScreen({ onBack }: AddressesScreenProps) {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", tag: "Home", detail: "123 Health Ave, Medical District, NY 10001" },
    { id: "2", tag: "Work", detail: "456 Corporate Blvd, Tech Park, NY 10022" },
  ]);

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
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
            Saved Addresses
          </AppText>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
        {addresses.map((item) => (
          <View
            key={item.id}
            className="border border-neutral-100 rounded-2xl p-4 mb-4 flex-row items-center justify-between bg-white shadow-sm"
          >
            <View className="flex-row items-start gap-3.5 flex-1 mr-2">
              <View className="w-10 h-10 rounded-xl bg-orange-50 items-center justify-center border border-orange-100 mt-0.5">
                <HugeiconsIcon icon={Location01Icon} size={20} color="#FF7E3E" />
              </View>
              <View className="flex-1">
                <AppText weight="bold" className="text-[15px] text-neutral-800 mb-1">
                  {item.tag}
                </AppText>
                <AppText weight="regular" className="text-[13px] text-neutral-500 leading-[18px]">
                  {item.detail}
                </AppText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              className="w-9 h-9 rounded-full bg-slate-50 items-center justify-center"
            >
              <HugeiconsIcon icon={Delete02Icon} size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Action bottom button */}
      <View className="border-t border-neutral-100 px-6 py-4 bg-white">
        <Button
          title="Add New Address"
          variant="primary"
          size="lg"
          onPress={() => {}}
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
}
