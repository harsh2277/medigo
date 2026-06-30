import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-5xl font-extrabold text-teal-600 tracking-widest">
          MediGo
        </Text>
      </View>
    </SafeAreaView>
  );
}

