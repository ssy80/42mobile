import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export function AppBar({title}: {title: string}) {
  return (
    <SafeAreaView edges={["top"]} className="bg-blue-500">
      <View className="h-14 flex-row justify-center items-center px-4">
        <Text className="text-white text-xl font-semibold ml-4">
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
}