import { View } from 'react-native';
import { Button } from "react-native-paper";

type props = {
    onPress: (key: string) => void;
}

export default function Keypad({onPress}: props) {
    const keypad = [
        ["7", "8", "9", "C", "AC"],
        ["4", "5", "6", "+", "-"],
        ["1", "2", "3", "*", "/"],
        ["0", ".", "", "=", ""],
    ];

    return (
        <View className="justify-end pb-4">
        {keypad.map((row, r) => (
            <View key={r} className="flex-row mb-3">
            {row.map((key, c) =>
                key ? (
                <Button
                    key={c}
                    mode="contained"
                    compact
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
    );
};

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
