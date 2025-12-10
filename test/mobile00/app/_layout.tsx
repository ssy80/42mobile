import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

/*export default function RootLayout() {
  return <Stack />;
}*/

export default function RootLayout() {
  return (
    /*<Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
    </Stack>*/
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}