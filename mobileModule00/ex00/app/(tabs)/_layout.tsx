import "nativewind";
import { Button } from 'react-native-paper';
import { View, Text } from 'react-native';


export default function TabLayout() {
    
    return (
        <View className="flex-1 justify-center items-center">
          <Text className="bg-yellow-500 text-2xl mb-4">A simple text</Text>
          <Button mode="contained" onPress={() => console.log('Button pressed')}>
          Press me
          </Button>
        </View>
      );
}
