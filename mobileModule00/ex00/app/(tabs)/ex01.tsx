import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import React, { useState } from 'react';

export default function Ex01() {
    const [message, setMessage] = useState("A simple text");

    function toggleMessage() {
      setMessage(
        value => value === "A simple text" ? "Hello World!" : "A simple text"
      );
    }

    return (
        <View style={styles.container}>
          <Text variant="bodyLarge" style={styles.textBgColor}>{message}</Text>
          <Button mode="elevated" onPress={toggleMessage}>
              Press me
          </Button>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBgColor:{
    backgroundColor: '#ffcc00',
    color: '#000',
    padding: 8,
    borderRadius: 6,
  },
});
