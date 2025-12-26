import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { useSearch } from '@/context/search_context';
import { JSX } from 'react/jsx-runtime';


export default function TodayScreen(): JSX.Element   {
  const { query, geolocation } = useSearch();

  if (geolocation === "no gps permission") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-red-500 text-center w-full">Geolocation is not available, please enable it in your App settings.</Text>
        </View>
      );
    }

    if (geolocation === "gps error") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-center w-full">Currently</Text>
          <Text className="text-lg leading-6 text-center w-full">GPS error !</Text>
        </View>
      );
    }

    if (geolocation === "") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-center w-full">Today</Text>
          <Text className="text-lg leading-6 text-center w-full">{query}</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg leading-6 text-center w-full">Today</Text>
        <Text className="text-lg leading-6 text-center w-full">{geolocation}</Text>
      </View>
    );
};
