import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native';
import { useSearch } from '@/context/search_context';
import { JSX } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { WEATHER_CODE_MAP } from '../constants/weather_code_constants';
import { getTodayWeatherByLatLon } from '../service/api';

export default function TodayScreen(): JSX.Element   {
    const { query, geolocation, weatherLocation, searchStatus, connectionStatus, setConnectionStatus } = useSearch();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);

    type WeatherData = {
        time: string[];
        temperature: number[];
        wind_speed: number[];
        weather_code: number[];
    };

    useEffect(() => {

        if (weatherLocation.latitude === 0 && weatherLocation.longitude === 0) {
          setWeather(null);
          return;
        }

        const fetchWeather = async () => {
            const hourly = "temperature_2m,wind_speed_10m,weather_code";
            setLoading(true);
            
            try {
                const res = await getTodayWeatherByLatLon(weatherLocation.latitude, weatherLocation.longitude, hourly);
                setConnectionStatus("");
                setWeather({time: res.hourly.time, temperature: res.hourly.temperature_2m, wind_speed: res.hourly.wind_speed_10m, weather_code: res.hourly.weather_code});
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


    const hourlyRows = useMemo(() => {
      if (!weather) return [];
      return weather.time.map((time, i) => ({
        time: weather.time[i],
        temperature: weather.temperature[i],
        wind_speed: weather.wind_speed[i],
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
          
          <View className="items-center py-4">
            <Text className="text-lg leading-6 text-center w-full">{weatherLocation.name}</Text>
            <Text className="text-lg leading-6 text-center w-full">{weatherLocation.region}</Text>
            <Text className="text-lg leading-6 text-center w-full">{weatherLocation.country}</Text>
          </View>

          <View className="flex-row px-4 py-2 border-b border-gray-300 bg-gray-100">
            <Text className="w-20 text-sm font-semibold text-left">Time</Text>
            <Text className="w-24 text-sm font-semibold text-left">Temp</Text>
            <Text className="w-24 text-sm font-semibold text-left">Wind</Text>
            <Text className="flex-1 text-sm font-semibold text-left">Weather</Text>
          </View>

          {/* Hourly rows */}
          <FlatList
            className="flex-1"
            data={hourlyRows}
            keyExtractor={(item) => item.time}
            renderItem={({ item }) => (
              <View className="flex-row px-4 py-3 border-b border-gray-200">
                <Text className="w-20 text-sm text-left">
                  {item.time.slice(11, 16)}
                </Text>
                <Text className="w-24 text-sm text-left">
                  {item.temperature} °C
                </Text>
                <Text className="w-24 text-sm text-left">
                  {item.wind_speed} km/h
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
          <Text className="text-lg leading-6 text-center w-full">Today</Text>
          <Text className="text-lg leading-6 text-center w-full">{query}</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg leading-6 text-center w-full">Today</Text>
        <Text className="text-lg leading-6 text-center w-full">{`${geolocation.latitude}, ${geolocation.longitude}`}</Text>
      </View>
    );
};
