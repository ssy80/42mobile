import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSearch } from '@/context/search_context';
import { JSX } from 'react/jsx-runtime';


export default function TodayScreen(): JSX.Element   {
  const { query } = useSearch();

  return (
      <View style={styles.container}>
        <Text variant="bodyLarge">Today</Text>
        <Text variant="bodyLarge">{query}</Text>
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
});
