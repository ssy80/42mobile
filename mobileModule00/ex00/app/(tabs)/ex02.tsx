import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import React, { useState } from 'react';
import { TextInput } from "react-native-paper";


export default function Ex02() {
    const [text, setText] = useState("0");
    const keypad = [
      ["7", "8", "9", "C", "AC"],
      ["4", "5", "6", "+", "-"],
      ["1", "2", "3", "*", "/"],
      ["0", ".", "", "=", ""],
    ];

    function onPress(key: string){
      setText(pre => pre === "0" ? key : pre + key);
    }
    
    return (
      <View>
        <TextInput
          //label="Message"
          value={text}
          onChangeText={setText}
          mode="flat"
          multiline
          editable={false}
          underlineColor="transparent"
          numberOfLines={4}   // height
          //style={{ margin: 16 }}
          style={{
            //backgroundColor: "transparent", // remove background
            //backgroundColor: "#000",   // <-- BLACK BACKGROUND
            color: "#ffffff",             // <-- WHITE TEXT
            //margin: 16,
            textAlign: "right"
          }}
        />
        <TextInput
          //label="Message"
          value={text}
          onChangeText={setText}
          mode="flat"
          multiline
          editable={false}
          underlineColor="transparent"
          numberOfLines={4}   // height
          //style={{ margin: 16 }}
          style={{
            //backgroundColor: "transparent", // remove background
            //backgroundColor: "#000",   // <-- BLACK BACKGROUND
            color: "#ffffff",             // <-- WHITE TEXT
            //margin: 16,
            textAlign: "right"
          }}
        />

        <View style={{ padding: 16 }}>
          {keypad.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={{
                flexDirection: "row",
                marginBottom: 12,
              }}
            >
              {row.map((key, colIndex) =>
                key ? (
                  // normal button
                  <Button
                    key={colIndex}
                    mode="contained"
                    textColor="#fff"
                    buttonColor={
                      ["+", "-", "*", "/", "C", "AC", "="].includes(key)
                        ? "#ff9500"
                        : "#000"
                    }
                    style={{
                      flex: 1,
                      marginHorizontal: 4,
                      paddingVertical: 6,
                    }}
                    onPress={() => onPress(key)}
                  >
                    {key}
                  </Button>
                ) : (
                  // EMPTY placeholder — keeps grid aligned
                  <View
                    key={colIndex}
                    style={{
                      flex: 1,
                      marginHorizontal: 4,
                    }}
                  />
                )
              )}
            </View>
          ))}
        </View>

      </View>
    );
}
