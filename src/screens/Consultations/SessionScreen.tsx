import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { 
  VideoAiIcon, 
  Mic01Icon, 
  CallIcon 
} from "@hugeicons/core-free-icons";
import { Doctor } from "./DoctorListScreen";

const { width } = Dimensions.get("window");

interface SessionScreenProps {
  doctor: Doctor;
  onEndCall: () => void;
}

export default function SessionScreen({
  doctor,
  onEndCall,
}: SessionScreenProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${minutes.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  return (
    <View className="flex-1 bg-slate-900">
      {/* Doctor Video Call Stream Background */}
      <View className="flex-1 items-center justify-center relative">
        <View className="items-center justify-center">
          <View className="w-32 h-32 rounded-full bg-slate-800 items-center justify-center border-4 border-slate-700/50 mb-6">
            <AppText weight="black" className="text-3xl text-white">
              {doctor.name.split(" ").pop()?.substring(0, 1)}
            </AppText>
          </View>
          <AppText weight="bold" className="text-[20px] text-white mb-2">
            {doctor.name}
          </AppText>
          <AppText weight="medium" className="text-[14px] text-teal-400">
            {isCamOff ? "Doctor's camera is off" : "Video Consultation Active"}
          </AppText>
        </View>

        {/* Small Patient Camera View PIP */}
        <View className="absolute top-16 right-6 w-28 h-40 rounded-2xl bg-slate-800 border-2 border-slate-700 overflow-hidden items-center justify-center">
          <AppText weight="bold" className="text-[12px] text-neutral-400">
            You
          </AppText>
        </View>

        {/* Top Info Banner */}
        <View className="absolute top-16 left-6 bg-slate-800/80 rounded-full px-4 py-2 border border-slate-700/50 flex-row items-center gap-2">
          <View className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <AppText weight="bold" className="text-[13px] text-white">
            {formatTime(seconds)}
          </AppText>
        </View>
      </View>

      {/* Control Actions Bar */}
      <SafeAreaView edges={["bottom"]} className="bg-slate-950 px-8 py-6 rounded-t-[40px] flex-row justify-around items-center">
        {/* Toggle Camera */}
        <TouchableOpacity
          onPress={() => setIsCamOff(!isCamOff)}
          className={`w-14 h-14 rounded-full items-center justify-center border ${
            isCamOff ? "bg-red-500/20 border-red-500/40" : "bg-slate-800 border-slate-700"
          }`}
        >
          <HugeiconsIcon
            icon={VideoAiIcon}
            size={22}
            color={isCamOff ? "#EF4444" : "#FFFFFF"}
          />
        </TouchableOpacity>

        {/* End Call */}
        <TouchableOpacity
          onPress={onEndCall}
          className="w-16 h-16 rounded-full bg-red-500 items-center justify-center shadow-lg shadow-red-500/50"
        >
          <HugeiconsIcon icon={CallIcon} size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Toggle Mute */}
        <TouchableOpacity
          onPress={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full items-center justify-center border ${
            isMuted ? "bg-red-500/20 border-red-500/40" : "bg-slate-800 border-slate-700"
          }`}
        >
          <HugeiconsIcon
            icon={Mic01Icon}
            size={22}
            color={isMuted ? "#EF4444" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
