import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { useSearch } from '@/context/search_context';
import { JSX } from 'react/jsx-runtime';
import { getCurrentWeatherByLatLon } from '../service/api';
import { useState, useEffect } from 'react';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { WEATHER_CODE_MAP } from '../constants/weather_code_constants';


export default function CurrentlyScreen(): JSX.Element {
    const { query, geolocation, weatherLocation, searchStatus, connectionStatus, setConnectionStatus } = useSearch();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);

    type WeatherData = {
        temperature: number;
        wind_speed: number;
        weather_code: number;
    };


    useEffect(() => {

        if (weatherLocation.latitude === 0 && weatherLocation.longitude === 0) {
          setWeather(null);
          return;
        }

        const fetchWeather = async () => {
            const current = "temperature_2m,wind_speed_10m,weather_code";
            setLoading(true);
            try {
                const res = await getCurrentWeatherByLatLon(weatherLocation.latitude, weatherLocation.longitude, current);
                setConnectionStatus("");
                setWeather({temperature: res.current.temperature_2m, wind_speed: res.current.wind_speed_10m, weather_code: res.current.weather_code});
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
        <View className="flex-1 bg-white items-center justify-start pt-6">
          <Text className="text-lg leading-6 text-center w-full">{weatherLocation.name}</Text>
          <Text className="text-lg leading-6 text-center w-full">{weatherLocation.region}</Text>
          <Text className="text-lg leading-6 text-center w-full">{weatherLocation.country}</Text>
          <Text className="text-lg leading-6 text-center w-full">{`Temp: ${weather.temperature} °C`}</Text>
          <Text className="text-lg leading-6 text-center w-full">{`Wind Speed: ${weather.wind_speed} km/h`}</Text>
          <Text className="text-lg leading-6 text-center w-full">{`Weather: ${WEATHER_CODE_MAP[weather.weather_code]}`}</Text> 
        </View>
      );
    }


    if (geolocation.status === "") {
      return (
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-lg leading-6 text-center w-full">Currently</Text>
          <Text className="text-lg leading-6 text-center w-full">{query}</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg leading-6 text-center w-full">Currently</Text>
        <Text className="text-lg leading-6 text-center w-full">{`${geolocation.latitude}, ${geolocation.longitude}`}</Text>
      </View>
    );

  };
