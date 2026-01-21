import { View, Text, Image } from 'react-native';
import { useSearch } from '@/context/search_context';
import { JSX } from 'react/jsx-runtime';
import { getCurrentWeatherByLatLon } from '../service/api';
import { useState, useEffect } from 'react';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { WEATHER_CODE_MAP } from '../constants/weather_code_constants';
import WeatherIcon from '../components/WeatherIcon';
import { Button } from 'react-native-paper';

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
            setConnectionStatus("");
            try {
                const res = await getCurrentWeatherByLatLon(weatherLocation.latitude, weatherLocation.longitude, current);
                setWeather({temperature: res.current.temperature_2m, wind_speed: res.current.wind_speed_10m, weather_code: res.current.weather_code});
            } catch (e: any) {
                console.log(e);
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
        <View className="flex-1 bg-transparent items-center justify-center">
          <Text className="text-lg leading-6 text-red-500 text-center w-full">The service connection is lost, please check your internet connection or try again later.</Text>
        </View>
      );
    }


    if (connectionStatus === "error api call") {
      return (
        <View className="flex-1 bg-transparent items-center justify-center">
          <Text className="text-lg leading-6 text-red-500 text-center w-full">API call error, please try again later.</Text>
        </View>
      );
    }


    if (geolocation.status === "no gps permission") {
      return (
        <View className="flex-1 bg-transparent items-center justify-center">
          <Text className="text-lg leading-6 text-red-500 text-center w-full">Geolocation is not available, please enable it in your App settings.</Text>
        </View>
      );
    }


    if (geolocation.status === "gps error") {
      return (
        <View className="flex-1 bg-transparent items-center justify-center">
          <Text className="text-lg leading-6 text-center w-full">Currently</Text>
          <Text className="text-lg leading-6 text-center w-full">GPS error !</Text>
        </View>
      );
    }


    if (searchStatus === "not found location") {
      return (
        <View className="flex-1 bg-transparent items-center justify-center">
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

      let locationLabel = "";
      if (!weatherLocation.region && !weatherLocation.country) {
          locationLabel = `${weatherLocation.name}, ${weatherLocation.name}`;
      } else if (!weatherLocation.region) {
          locationLabel = `${weatherLocation.country}, ${weatherLocation.country}`;
      } else if (!weatherLocation.country) {
          locationLabel = `${weatherLocation.region}, ${weatherLocation.region}`;
      } else {
          locationLabel = `${weatherLocation.region}, ${weatherLocation.country}`;
      }

      return (
        <View className="flex-1 bg-transparent items-center justify-start pt-6">
          <Text className="text-2xl leading-6 text-center w-full text-blue-500 font-bold">{weatherLocation.name}</Text>
          <Text className="text-lg leading-6 text-center w-full">{locationLabel}</Text>
          
          <View className="items-center mt-12">
                <Button mode="contained">
                  {`${weather.temperature} °C`}
                </Button>
          </View>

          <Text className="mt-12 mb-6 text-lg leading-6 text-center w-full">{`${WEATHER_CODE_MAP[weather.weather_code].weather}.`}</Text> 

          <WeatherIcon icon={WEATHER_CODE_MAP[weather.weather_code].icon} size={120} />

          <View className="flex-row items-center mt-12">
            <Image
              source={require('../../assets/images/weather_icons/wind.png')}
              className="w-12 h-12 mr-4"
            />
            <Text className="text-lg leading-6">{`${weather.wind_speed} km/h`}</Text>
          </View>

        </View>
      );
    }


    if (geolocation.status === "") {
      return (
        <View className="flex-1 bg-transparent items-center justify-center">
          <Text className="text-lg leading-6 text-center w-full">Currently</Text>
          <Text className="text-lg leading-6 text-center w-full">{query}</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-transparent items-center justify-center">
        <Text className="text-lg leading-6 text-center w-full">Currently</Text>
        <Text className="text-lg leading-6 text-center w-full">{`${geolocation.latitude}, ${geolocation.longitude}`}</Text>
      </View>
    );

  };
