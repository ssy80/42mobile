import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../index.css";
import { SearchProvider } from '@/context/search_context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { ImageBackground, View } from 'react-native';


const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: 'transparent',
    surface: 'transparent',
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaProvider>

          <ImageBackground
            source={require('../assets/images/bg.jpg')}
            resizeMode="cover"
            className="flex-1"
          >
              <View className="flex-1 bg-transparent">
                <SearchProvider>
                  <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
                </SearchProvider>
              </View>
          </ImageBackground>

        </SafeAreaProvider>
      </GestureHandlerRootView>
     </PaperProvider>
  );
}
