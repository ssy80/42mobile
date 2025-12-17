import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../index.css";

export default function RootLayout() {
  return (
     <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
     </SafeAreaProvider>
  );
}
