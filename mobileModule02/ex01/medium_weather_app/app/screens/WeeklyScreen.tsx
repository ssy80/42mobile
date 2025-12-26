import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native';
import { useSearch } from '@/context/search_context';
import { JSX } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { WEATHER_CODE_MAP } from '../constants/weather_code_constants';
import { getWeeklyWeatherByLatLon } from '../service/api';


export default function WeeklyScreen(): JSX.Element {
    const { query, geolocation, weatherLocation, searchStatus, connectionStatus, setConnectionStatus } = useSearch();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);

    type WeatherData = {
        forecast_date: string[];
        temperature_min: number[];
        temperature_max: number[];
        weather_code: number[];
    };


    useEffect(() => {

        if (weatherLocation.latitude === 0 && weatherLocation.longitude === 0) {
          setWeather(null);
          return;
        }

        const fetchWeather = async () => {
            const daily = "temperature_2m_min,temperature_2m_max,weather_code";
            setLoading(true);
            
            try {
                const res = await getWeeklyWeatherByLatLon(weatherLocation.latitude, weatherLocation.longitude, daily);
                setConnectionStatus("");
                setWeather({forecast_date: res.daily.time, temperature_min: res.daily.temperature_2m_min, temperature_max: res.daily.temperature_2m_max, weather_code: res.daily.weather_code});
            } catch (e: any) {
                if (!e.response) {
                    setConnectionStatus("no internet");
                } else {
                    setConnectionStatus("error api call");
                }
            } finally {
                setLoading(false);
            }
          }
        fetchWeather();
      }, [weatherLocation.latitude, weatherLocation.longitude]);


    const dailyRows = useMemo(() => {
        if (!weather) return [];

        return weather.forecast_date.map((fd, i) => ({
          forecast_date: weather.forecast_date[i],
          temperature_min: weather.temperature_min[i],
          temperature_max: weather.temperature_max[i],
          weather_code: weather.weather_code[i],
        }));
    }, [weather]);


    if (connectionStatus === "no internet") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-red-500 text-center w-full">The service connection is lost, please check your internet connection or try again later.</Text>
        </View>
      );
    }


    if (connectionStatus === "error api call") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-red-500 text-center w-full">API call error, please try again later.</Text>
        </View>
      );
    }


    if (geolocation.status === "no gps permission") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-red-500 text-center w-full">Geolocation is not available, please enable it in your App settings.</Text>
        </View>
      );
    }


    if (geolocation.status === "gps error") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-center w-full">Currently</Text>
          <Text className="text-lg leading-6 text-center w-full">GPS error !</Text>
        </View>
      );
    }


    if (searchStatus === "not found location") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-red-500 text-center w-full">Location not found, please try another search.</Text>
        </View>
      )
    }


    if (loading) {
      return (
        <Portal>
            <Modal visible={loading} dismissable={false}>
                <View className="bg-white rounded-lg p-6 mx-8 items-center">
                    <ActivityIndicator size="large" />
                    <Text className="mt-4 text-base">Getting weather info...</Text>
                </View>
            </Modal>
        </Portal>
      )
    }


    if (weather !== null) {
          return (
            <View className="flex-1 bg-white">

              {/* Location Info */}
              <View className="items-center py-4">
                <Text className="text-lg leading-6 text-center w-full">{weatherLocation.name}</Text>
                <Text className="text-lg leading-6 text-center w-full">{weatherLocation.region}</Text>
                <Text className="text-lg leading-6 text-center w-full">{weatherLocation.country}</Text>
              </View>

              {/* Table Header */}
              <View className="flex-row px-4 py-2 border-b border-gray-300 bg-gray-100">
                <Text className="w-20 text-sm font-semibold text-left">Time</Text>
                <Text className="w-24 text-sm font-semibold text-left">Temp Min</Text>
                <Text className="w-24 text-sm font-semibold text-left">Temp Max</Text>
                <Text className="flex-1 text-sm font-semibold text-left">Weather</Text>
              </View>

              {/* Daily rows */}
              <FlatList
                className="flex-1"
                data={dailyRows}
                keyExtractor={(item) => item.forecast_date}
                renderItem={({ item }) => (
                  <View className="flex-row px-4 py-3 border-b border-gray-200">
                    <Text className="w-20 text-sm text-left">
                      {item.forecast_date}
                    </Text>
                    <Text className="w-24 text-sm text-left">
                      {item.temperature_min} °C
                    </Text>
                    <Text className="w-24 text-sm text-left">
                      {item.temperature_max} °C
                    </Text>
                    <Text className="flex-1 text-sm text-left">
                      {WEATHER_CODE_MAP[item.weather_code]}
                    </Text>
                  </View>
                )}
              />

            </View>
          );
        }


    if (geolocation.status === "") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-center w-full">Weekly</Text>
          <Text className="text-lg leading-6 text-center w-full">{query}</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg leading-6 text-center w-full">Weekly</Text>
        <Text className="text-lg leading-6 text-center w-full">{`${geolocation.latitude}, ${geolocation.longitude}`}</Text>
      </View>
    );
};
