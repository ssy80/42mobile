import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function Ex00() {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.textBgColor}>A simple text</Text>
      <Button mode="elevated" onPress={() => console.log('Button pressed')}>
        Press me
      </Button>
    </View>
  );
}

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
