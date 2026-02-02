import "nativewind";
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { AppBar } from '../components/AppBar';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {

    const [calInput, setCalInput] = useState("0");
    const [calResult, setCalResult] = useState("0");

    const keypad = [
    ["7", "8", "9", "C", "AC"],
    ["4", "5", "6", "+", "-"],
    ["1", "2", "3", "*", "/"],
    ["0", ".", "00", "=", " "],
    ];

    function onPress(key: string) {
      console.log(`Button pressed: ${key}`);
    }
    
    return (
    
      <>
        <AppBar title="Calculator"/>
        
        {/* DISPLAY */}
        <SafeAreaView edges={["left", "right", "bottom"]} className="flex-1 justify-start p-4">
              <Text className="text-right w-full text-xl">{calInput}</Text>
              <Text className="text-right w-full text-xl">{calResult}</Text>
        
        {/* KEYPAD */}
        <View className="flex-1 justify-end w-full">
        {
          keypad.map((row, r) => (
            <View key={r} className="flex-row justify-center mb-2">
              {
                row.map((key, c) => 
                  key ? (
                    <Button 
                      key={c}
                      mode="contained"
                      onPress={() => onPress(key)}
                      className="flex-1"
                      labelStyle={{ fontSize: 12 }}
                      >
                      {key}
                    </Button>
                  ) : (
                    <View key={c} className="flex-1 m-1" />
                  )
                )
              }
            </View>
          ))
        }
        </View>
        </SafeAreaView>

      </>

    );
}
