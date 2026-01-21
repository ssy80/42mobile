import { View, FlatList, Text } from 'react-native';
import { useSearch } from '@/context/search_context';
import { JSX } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { getWeeklyWeatherByLatLon } from '../service/api';
import WeeklyChart from '../components/WeeklyChart';
import WeeklyTempCard from '../components/WeeklyTempCard';


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
            setConnectionStatus("");
            
            try {
                const res = await getWeeklyWeatherByLatLon(weatherLocation.latitude, weatherLocation.longitude, daily);
                setWeather({forecast_date: res.daily.time, temperature_min: res.daily.temperature_2m_min, temperature_max: res.daily.temperature_2m_max, weather_code: res.daily.weather_code});
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
            <View className="flex-1 bg-transparent">

              <View className="items-center py-4">
                <Text className="text-2xl leading-6 text-center w-full text-blue-500 font-bold">{weatherLocation.name}</Text>
                <Text className="text-lg leading-6 text-center w-full">{locationLabel}</Text>
              </View>

              <Text className="text-lg leading-6 text-center w-full">Weekly Temperatures</Text>

              <View className="mt-2 items-center px-2">
                  <WeeklyChart weather={weather} />
              </View>

              <View className="items-center mt-4">
                  <FlatList
                      data={dailyRows}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.forecast_date}
                      contentContainerStyle={{ paddingHorizontal: 16 }}
        
                      renderItem={({ item }) => (
                        <WeeklyTempCard dailyData={item} />
                      )}
                  />
              </View>

            </View>
          );
        }


    if (geolocation.status === "") {
      return (
        <View className="flex-1 bg-transparent items-center justify-center">
          <Text className="text-lg leading-6 text-center w-full">Weekly</Text>
          <Text className="text-lg leading-6 text-center w-full">{query}</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-transparent items-center justify-center">
        <Text className="text-lg leading-6 text-center w-full">Weekly</Text>
        <Text className="text-lg leading-6 text-center w-full">{`${geolocation.latitude}, ${geolocation.longitude}`}</Text>
      </View>
    );
};
