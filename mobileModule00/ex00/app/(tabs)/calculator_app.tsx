import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Keypad from '../components/keypad';
import Textfield from '../components/textfield';

export default function Ex02() {
  const [calInput, setCalInput] = useState("0");
  const [calResult, setCalResult] = useState("0");

  const canNegativeOperators = ["*", "/", "+"];
  const operators = ["+", "-", "*", "/"];

  function onPress(key: string) {

    const lastChar = calInput.slice(-1);

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
      if (calInput === "0") {
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

    <SafeAreaView className="flex-1 bg-white border-4 border-yellow-400">

      {/* ROOT COLUMN */}
      <View className="flex-1 px-4 bg-white">

        {/* Input Text - TOP */}
        <View className="flex-1 justify-start mt-4 bg-white">
          <Textfield value={calInput} />
          <Textfield value={calResult} />
        </View>

        {/* KEYPAD — BOTTOM */}
        <Keypad onPress={onPress} />

      </View>
    </SafeAreaView>
  );

};

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
