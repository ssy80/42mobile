import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../index.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, MD3LightTheme, ActivityIndicator } from 'react-native-paper';
import { ImageBackground, View } from 'react-native';
import { AuthProvider } from "../context/auth_context";
import { useAuth } from "../context/auth_context";


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
      <AuthProvider>
        <RootLayoutContent />
      </AuthProvider>
    </PaperProvider>
  );
}

function RootLayoutContent() {
  
    const { loading } = useAuth();

    if (loading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <GestureHandlerRootView className="flex-1">
        <SafeAreaProvider>
          <ImageBackground
            source={require('../assets/images/bg.jpg')}
            resizeMode="cover"
            className="flex-1"
          >
            <View className="flex-1 bg-transparent">
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              />
            </View>
          </ImageBackground>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
}
