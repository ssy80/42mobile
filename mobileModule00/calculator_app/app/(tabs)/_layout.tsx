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

    const canNegativeOperators = ["*", "/", "+"];
    const operators = ["+", "-", "*", "/"];

    function onPress(key: string) {

      const lastChar = calInput.slice(-1);

      if ((key === "0" || key === "00") && calInput === "0") {
          return;
      }

      if (key === " ") {
        return;
      }

      if (key === "AC") {
        setCalInput("0");
        setCalResult("0");
        return;
      }

      if (key === "C") {
        setCalInput((val => val.slice(0, -1) || "0"));
        return;
      }

      if (key === "-"){

        if(calInput === "0"){
          setCalInput("-");
          return;
        }
        else if (canNegativeOperators.includes(lastChar)) {
          setCalInput((val) => val + "-");
          return;
        }

      }

      if (operators.includes(key)) {
        if (calInput === "0" || calInput === "00") {
          return;
        }
        else if (calInput === "-") {
          setCalInput("0");
          return;
        }
        else if (lastChar === "-") {
          const secondLastChar = calInput.slice(-2, -1);
          if (operators.includes(secondLastChar)) {
            setCalInput((val) => val.slice(0, -2) + key);
            return;
          }
          setCalInput((val) => val.slice(0, -1) + key);
          return;
        }
        else if (operators.includes(lastChar)) {
          setCalInput((val) => val.slice(0, -1) + key);
          return;
        }
      }

      if (key === ".") {
        if (lastChar === ".") {
          return;
        }
        else if (calInput === "0") {
          setCalInput("0.");
          return;
        }
        else if (operators.includes(lastChar)) {
          setCalInput((val) => val + "0.");
          return;
        }
        else if (checkLastNumberHasDot(calInput)) {
          return;
        }
      }

      if (key === "=") {
        try {
          const result = eval(calInput);

          if (!isFinite(result) || Number.isNaN(result)) {
            setCalResult("Error");
          } else {
            setCalResult(result.toString());
          }
    
        } catch {
          setCalResult("Error");
        }
        return;
      }

    setCalInput((val) => (val === "0" ? key : val + key));
  };

    
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


const checkLastNumberHasDot = (calInput: string): boolean => {
  let lastOperatorIndex = -1;
  const operators = ["+", "-", "*", "/"];
  for (let i = calInput.length - 1; i >= 0; i--) {
    if (operators.includes(calInput[i])) {
      lastOperatorIndex = i;
      break;
    }
  }
  const currentNumber = calInput.slice(lastOperatorIndex + 1);
  return currentNumber.includes(".");
};
