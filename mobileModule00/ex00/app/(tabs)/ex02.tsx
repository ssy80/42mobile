import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function Ex02() {
  const [calInput, setCalInput] = useState("0");
  const [calResult, setCalResult] = useState("0");
  
  const keypad = [
    ["7", "8", "9", "C", "AC"],
    ["4", "5", "6", "+", "-"],
    ["1", "2", "3", "*", "/"],
    ["0", ".", "", "=", ""],
  ];


  function onPress(key: string) {

    console.log(`Button pressed: ${key}`);

  }

  return (
    <SafeAreaView className="flex-1 bg-black border-4 border-yellow-400">

      {/* CENTER WRAPPER */}
      <View className="flex-1 items-center justify-center px-4">

        {/* CALCULATOR BODY */}
        <View className="w-full max-w-md">

          {/* Text Input */}
          <View className="mb-6">
            <TextInput
              value={calInput}
              editable={false}
              multiline
              numberOfLines={4}
              mode="flat"
              underlineColor="transparent"
              className="bg-transparent text-black text-3xl bg-white"
              style={styles.text_align_right_input}
            />

            <TextInput
              value={calResult}
              editable={false}
              multiline
              numberOfLines={4}
              mode="flat"
              underlineColor="transparent"
              className="bg-transparent text-white text-3xl bg-white"
              style={styles.text_align_right_input}
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
                      compact={true}
                      onPress={() => onPress(key)}
                      className="flex-1 mx-1 py-2"
                      buttonColor={getButtonColor(key)}
                      textColor="#ffffff"
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

        </View>
      </View>
    </SafeAreaView>
  );

}

const getButtonColor = (key: string) => {

  if (key === "=" ) {
    return "#90EE90";
  }

  if (key === "C" || key === "AC") {
    return "#5ac8fa";
  }

  if (["+", "-", "*", "/", "="].includes(key)) {
    return "#ff9500";
  }

  return "#1c1c1c";
};

const styles = StyleSheet.create({
  text_align_right_input: {
    textAlign: "right",
    writingDirection: "ltr"
  },
});