import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText, Input } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, Calendar01Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import { Doctor } from "./DoctorListScreen";

interface BookConsultationScreenProps {
  doctor: Doctor;
  onBack: () => void;
  onConfirmBooking: (dateTime: string) => void;
}

export default function BookConsultationScreen({
  doctor,
  onBack,
  onConfirmBooking,
}: BookConsultationScreenProps) {
  const [selectedDate, setSelectedDate] = useState("Jul 3");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientSymptoms, setPatientSymptoms] = useState("");

  const dates = [
    { id: "Jul 3", day: "Fri", num: "03" },
    { id: "Jul 4", day: "Sat", num: "04" },
    { id: "Jul 5", day: "Sun", num: "05" },
    { id: "Jul 6", day: "Mon", num: "06" },
  ];

  const slots = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
  ];

  const handleBook = () => {
    if (!patientName || !patientAge) return;
    onConfirmBooking(`${selectedDate} at ${selectedTime}`);
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
              Book Appointment
            </AppText>
          </View>
          <View className="w-10" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-4">
          {/* Doctor Brief Info */}
          <View className="flex-row items-center gap-4 bg-slate-50 border border-slate-100 rounded-3xl p-4 mb-6">
            <View className="w-12 h-12 rounded-xl bg-secondary-100 items-center justify-center overflow-hidden">
              <HugeiconsIcon icon={Calendar01Icon} size={24} color="#0D9488" />
            </View>
            <View className="flex-1">
              <AppText weight="bold" className="text-[15px] text-neutral-800">
                {doctor.name}
              </AppText>
              <AppText weight="medium" className="text-[13px] text-neutral-400">
                {doctor.specialty}
              </AppText>
            </View>
          </View>

          {/* Date Selector */}
          <View className="mb-6">
            <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
              Select Date
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

          {/* Time Slots */}
          <View className="mb-6">
            <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
              Select Time
            </AppText>
            <View className="flex-row flex-wrap gap-2">
              {slots.map((s) => {
                const isSelected = selectedTime === s;
                return (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setSelectedTime(s)}
                    className={`border rounded-xl py-2 px-3 items-center justify-center ${
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

          {/* Patient Info */}
          <View className="gap-4 pb-8">
            <AppText weight="bold" className="text-[16px] text-neutral-900">
              Patient Details
            </AppText>
            <Input
              label="Patient Name"
              placeholder="e.g. John Doe"
              value={patientName}
              onChangeText={setPatientName}
            />
            <Input
              label="Age"
              placeholder="e.g. 28"
              value={patientAge}
              onChangeText={setPatientAge}
              keyboardType="number-pad"
            />
            <Input
              label="Briefly describe your symptoms"
              placeholder="e.g. Fever, dry cough since yesterday"
              value={patientSymptoms}
              onChangeText={setPatientSymptoms}
              multiline
              className="h-20"
            />
          </View>
        </ScrollView>

        {/* Sticky Action Button */}
        <View className="border-t border-neutral-100 px-6 py-4 bg-white">
          <Button
            title="Book Consultation"
            variant="primary"
            size="lg"
            disabled={!patientName || !patientAge}
            onPress={handleBook}
            className="w-full"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
