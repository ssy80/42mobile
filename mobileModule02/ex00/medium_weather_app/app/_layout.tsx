import 'react-native-gesture-handler'; 
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../index.css";
import { SearchProvider } from '@/context/search_context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SearchProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </SearchProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
     </PaperProvider>
  );
}
