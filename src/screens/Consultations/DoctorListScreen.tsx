import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar, Chip, AppText, Button } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, StarIcon } from "@hugeicons/core-free-icons";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  fee: number;
  avatar: any;
  available: boolean;
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Alexander Bennett",
    specialty: "General Physician",
    rating: 4.9,
    experience: 12,
    fee: 45,
    avatar: require("../../../assets/images/login_doctor.png"),
    available: true,
  },
  {
    id: "2",
    name: "Dr. Sarah Jenkins",
    specialty: "Pediatrician",
    rating: 4.8,
    experience: 8,
    fee: 55,
    avatar: require("../../../assets/images/login_doctor.png"),
    available: true,
  },
  {
    id: "3",
    name: "Dr. Michael Chang",
    specialty: "Cardiologist",
    rating: 4.95,
    experience: 15,
    fee: 90,
    avatar: require("../../../assets/images/login_doctor.png"),
    available: false,
  },
  {
    id: "4",
    name: "Dr. Emily Watson",
    specialty: "Dermatologist",
    rating: 4.7,
    experience: 9,
    fee: 65,
    avatar: require("../../../assets/images/login_doctor.png"),
    available: true,
  },
];

interface DoctorListScreenProps {
  onBack: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export default function DoctorListScreen({
  onBack,
  onSelectDoctor,
}: DoctorListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = ["All", "General Physician", "Pediatrician", "Cardiologist", "Dermatologist"];

  const filteredDoctors = mockDoctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
            Consult a Doctor
          </AppText>
        </View>
        <View className="w-10" />
      </View>

      {/* Search Bar */}
      <View className="px-6 pt-4 pb-2">
        <SearchBar
          placeholder="Search doctors..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Specialties scrolling chips */}
      <View className="pl-6 mb-4">
        <FlatList
          data={specialties}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chip
              label={item}
              selected={selectedSpecialty === item}
              onPress={() => setSelectedSpecialty(item)}
              className="mr-2"
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>

      {/* Doctor Cards List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onSelectDoctor(item)}
            className="border border-neutral-100 bg-white rounded-3xl p-4 mb-4 shadow-sm flex-row items-center gap-4"
          >
            {/* Avatar */}
            <View className="w-16 h-16 rounded-2xl bg-secondary-50 overflow-hidden items-center justify-center">
              <Image
                source={item.avatar}
                className="w-16 h-16 mt-3"
                resizeMode="contain"
              />
            </View>

            {/* Info */}
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-1">
                <AppText weight="bold" className="text-[15px] text-neutral-800 flex-1" numberOfLines={1}>
                  {item.name}
                </AppText>
                <View className="flex-row items-center gap-0.5">
                  <HugeiconsIcon icon={StarIcon} size={14} color="#FBBF24" />
                  <AppText weight="bold" className="text-[12px] text-amber-700">
                    {item.rating}
                  </AppText>
                </View>
              </View>

              <AppText weight="medium" className="text-[13px] text-neutral-400 mb-2">
                {item.specialty} • {item.experience} Yrs Exp
              </AppText>

              <View className="flex-row justify-between items-center mt-1">
                <AppText weight="bold" className="text-[14px] text-neutral-900">
                  ${item.fee} Consultation
                </AppText>

                <View className="flex-row items-center gap-1.5">
                  <View className={`w-2 h-2 rounded-full ${item.available ? "bg-emerald-500" : "bg-neutral-300"}`} />
                  <AppText weight="medium" className={`text-[12px] ${item.available ? "text-emerald-600" : "text-neutral-400"}`}>
                    {item.available ? "Available" : "Offline"}
                  </AppText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
