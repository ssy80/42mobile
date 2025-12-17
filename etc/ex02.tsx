import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function Calculator() {
  const [text, setText] = useState("0");

  const keypad = [
    ["7", "8", "9", "C", "AC"],
    ["4", "5", "6", "+", "-"],
    ["1", "2", "3", "*", "/"],
    ["0", ".", "", "=", ""],
  ];

  function onPress(key: string) {
    if (key === "AC") return setText("0");
    if (key === "C") return setText((t) => t.slice(0, -1) || "0");

    if (key === "=") {
      try {
        setText(String(Function(`return ${text}`)()));
      } catch {
        setText("Error");
      }
      return;
    }

    setText((prev) => (prev === "0" ? key : prev + key));
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Display */}
      <View className="flex-1 justify-end p-4">
        <TextInput
          value={text}
          editable={false}
          multiline
          numberOfLines={3}
          mode="flat"
          underlineColor="transparent"
          className="bg-transparent text-right text-white text-3xl"
        />
      </View>

      {/* Keypad */}
      <View className="p-4">
        {keypad.map((row, r) => (
          <View key={r} className="flex-row mb-3">
            {row.map((key, c) =>
              key ? (
                <Button
                  key={c}
                  mode="contained"
                  onPress={() => onPress(key)}
                  className="flex-1 mx-1 py-2"
                  buttonColor={
                    ["+", "-", "*", "/", "=", "C", "AC"].includes(key)
                      ? "#ff9500"
                      : "#1c1c1c"
                  }
                  textColor="#fff"
                >
                  {key}
                </Button>
              ) : (
                <View key={c} className="flex-1 mx-1" />
              )
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
