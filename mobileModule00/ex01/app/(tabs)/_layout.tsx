import "nativewind";
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';

export default function TabLayout() {
    
    const [message, setMessage] = useState("A simple text");
    
    function toggleMessage() {
      setMessage(
        value => value === "A simple text" ? "Hello World!" : "A simple text"
      );
    }
    
    return (
        <View className="flex-1 justify-center items-center">
          <Text className="bg-yellow-500 text-2xl mb-4">{message}</Text>
          <Button mode="contained" onPress={toggleMessage}>
              Press me
          </Button>
        </View>
    );
}
