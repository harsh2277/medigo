import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: any;
}

const slides: Slide[] = [
  {
    id: "1",
    title: "Your Online Pharmacy",
    subtitle: "Order prescribed medicines and healthcare products from trusted partners. Fast, hassle-free doorstep delivery.",
    image: require("../../../assets/images/onboarding_pharmacy.png"),
  },
  {
    id: "2",
    title: "Instant Video Consultations",
    subtitle: "Connect with certified specialists within minutes. Secure medical advice, prescriptions, and follow-ups on the go.",
    image: require("../../../assets/images/onboarding_doctor.png"),
  },
  {
    id: "3",
    title: "Lab Tests at Home",
    subtitle: "Book diagnostic tests online. Certified health professionals will collect samples from your home safely.",
    image: require("../../../assets/images/onboarding_lab.png"),
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    setActiveIndex(index);
  };

  const handleNext = async () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      try {
        await AsyncStorage.setItem("onboarding_completed", "true");
      } catch (e) {
        // Ignore storage errors
      }
      onComplete();
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem("onboarding_completed", "true");
    } catch (e) {
      // Ignore storage errors
    }
    onComplete();
  };

  const renderSlide = ({ item }: { item: Slide }) => {
    return (
      <View style={{ width }} className="items-center justify-center px-7">
        <Image
          source={item.image}
          style={{
            width: width * 0.75,
            height: width * 0.75,
            maxHeight: 280,
            maxWidth: 280,
          }}
          className="mb-10"
          resizeMode="contain"
        />
        <View className="items-center px-3">
          <AppText weight="bold" className="text-[28px] text-neutral-900 text-center mb-4 leading-[34px]">
            {item.title}
          </AppText>
          <AppText weight="regular" className="text-[15px] text-neutral-500 text-center leading-[22px] px-4">
            {item.subtitle}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header Controls */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <View className="flex-row items-center">
          <AppText weight="black" className="text-[22px] text-secondary-500 tracking-[0.5px]">
            MediGo
          </AppText>
        </View>
        {activeIndex < slides.length - 1 && (
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
            <AppText weight="semiBold" className="text-[16px] text-neutral-400 py-1 px-2">
              Skip
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      {/* Slides FlatList */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />

      {/* Bottom Controls */}
      <View className="px-6 pb-6 gap-8">
        {/* Pagination Indicators */}
        <View className="flex-row justify-center items-center gap-2">
          {slides.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <View
                key={index}
                className={`h-1.5 rounded-full ${
                  isActive ? "w-6 bg-primary-500" : "w-1.5 bg-neutral-200"
                }`}
              />
            );
          })}
        </View>

        {/* Action Button */}
        <View className="w-full">
          {activeIndex === slides.length - 1 ? (
            <Button
              title="Get Started"
              variant="primary"
              size="lg"
              onPress={handleNext}
              className="w-full"
            />
          ) : (
            <Button
              title="Next"
              variant="primary"
              size="lg"
              rightIcon={
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  color="#fff"
                />
              }
              onPress={handleNext}
              className="w-full"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
