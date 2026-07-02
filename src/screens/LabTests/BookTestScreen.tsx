import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText, Input, Checkbox } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, Calendar01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { LabTest } from "./LabTestListScreen";

interface BookTestScreenProps {
  test: LabTest;
  onBack: () => void;
  onConfirmBooking: (dateTime: string, address: string) => void;
}

export default function BookTestScreen({
  test,
  onBack,
  onConfirmBooking,
}: BookTestScreenProps) {
  const [selectedDate, setSelectedDate] = useState("Jul 4");
  const [selectedTime, setSelectedTime] = useState("08:00 AM");
  const [selectedAddress, setSelectedAddress] = useState("Home");
  const [fastingRequired, setFastingRequired] = useState(true);

  const dates = [
    { id: "Jul 4", day: "Sat", num: "04" },
    { id: "Jul 5", day: "Sun", num: "05" },
    { id: "Jul 6", day: "Mon", num: "06" },
    { id: "Jul 7", day: "Tue", num: "07" },
  ];

  const slots = [
    "07:00 AM",
    "08:00 AM",
    "09:30 AM",
    "10:30 AM",
  ];

  const addresses = [
    { id: "Home", title: "Home Address", detail: "123 Health Ave, Medical District, NY 10001" },
    { id: "Office", title: "Office Address", detail: "456 Corporate Blvd, Tech Park, NY 10022" },
  ];

  const handleConfirm = () => {
    const addr = addresses.find((a) => a.id === selectedAddress)?.detail || "";
    onConfirmBooking(`${selectedDate} at ${selectedTime}`, addr);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
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
              Book Lab Test
            </AppText>
          </View>
          <View className="w-10" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-4">
          {/* Test overview */}
          <View className="bg-slate-50 border border-slate-100 rounded-3xl p-4 mb-6">
            <AppText weight="bold" className="text-[15px] text-neutral-800 mb-1">
              {test.name}
            </AppText>
            <AppText weight="medium" className="text-[13px] text-neutral-400">
              Sample Type: {test.sampleType} • Turnaround Time: {test.tat}
            </AppText>
          </View>

          {/* Date Selector */}
          <View className="mb-6">
            <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
              Select Date for Collection
            </AppText>
            <View className="flex-row gap-3">
              {dates.map((d) => {
                const isSelected = selectedDate === d.id;
                return (
                  <TouchableOpacity
                    key={d.id}
                    onPress={() => setSelectedDate(d.id)}
                    className={`flex-1 border rounded-2xl py-3 px-2 items-center justify-center ${
                      isSelected
                        ? "border-primary-500 bg-orange-50/10"
                        : "border-neutral-100 bg-white"
                    }`}
                  >
                    <AppText weight="regular" className={`text-[12px] mb-1 ${isSelected ? "text-primary-500" : "text-neutral-400"}`}>
                      {d.day}
                    </AppText>
                    <AppText weight="bold" className={`text-[16px] ${isSelected ? "text-primary-500" : "text-neutral-800"}`}>
                      {d.num}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Time Selector */}
          <View className="mb-6">
            <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
              Select Time Slot (Morning Preferred)
            </AppText>
            <View className="flex-row gap-2">
              {slots.map((s) => {
                const isSelected = selectedTime === s;
                return (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setSelectedTime(s)}
                    className={`border rounded-xl py-2.5 px-4 items-center justify-center ${
                      isSelected
                        ? "border-primary-500 bg-orange-50/10"
                        : "border-neutral-100 bg-white"
                    }`}
                  >
                    <AppText weight="bold" className={`text-[13px] ${isSelected ? "text-primary-500" : "text-neutral-800"}`}>
                      {s}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Fasting check */}
          <View className="flex-row items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
            <Checkbox
              checked={fastingRequired}
              onChange={setFastingRequired}
            />
            <View className="flex-1">
              <AppText weight="bold" className="text-[14px] text-neutral-800 mb-0.5">
                Fasting Required (10-12 Hours)
              </AppText>
              <AppText weight="regular" className="text-[12px] text-neutral-400">
                Water is allowed. Do not consume food or juice before sample collection.
              </AppText>
            </View>
          </View>

          {/* Address Selection */}
          <View className="mb-8">
            <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
              Select Sample Collection Address
            </AppText>
            {addresses.map((addr) => (
              <TouchableOpacity
                key={addr.id}
                onPress={() => setSelectedAddress(addr.id)}
                className={`border rounded-2xl p-4 mb-3 flex-row items-center gap-3 ${
                  selectedAddress === addr.id
                    ? "border-primary-500 bg-orange-50/10"
                    : "border-neutral-100 bg-white"
                }`}
              >
                <HugeiconsIcon icon={Location01Icon} size={20} color={selectedAddress === addr.id ? "#FF7E3E" : "#9CA3AF"} />
                <View className="flex-1">
                  <AppText weight="bold" className="text-[14px] text-neutral-800 mb-0.5">
                    {addr.title}
                  </AppText>
                  <AppText weight="regular" className="text-[12px] text-neutral-400 leading-[18px]">
                    {addr.detail}
                  </AppText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Action Bottom */}
        <View className="border-t border-neutral-100 px-6 py-4 bg-white">
          <Button
            title={`Pay & Confirm - $${test.price}`}
            variant="primary"
            size="lg"
            onPress={handleConfirm}
            className="w-full"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
