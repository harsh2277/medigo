import "../global.css";
import { useState, useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { fontAssets } from "../src/constants/fontAssets";
import { applyDefaultFont } from "../src/constants/applyDefaultFont";

applyDefaultFont();

export default function RootLayout() {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [fontsLoaded] = useFonts(fontAssets);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {!isSplashReady ? (
        <View style={styles.container}>
          <Image
            source={require("../assets/splash.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ) : (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
