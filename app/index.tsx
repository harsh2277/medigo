import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "../src/components/index";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-5xl font-extrabold text-teal-600 tracking-widest mb-8">
          MediGo
        </Text>
        <Button
          title="View Components"
          onPress={() => router.push("/showcase")}
        />
      </View>
    </SafeAreaView>
  );
}
