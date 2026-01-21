import { View, Text, Image } from 'react-native';
import { WEATHER_CODE_MAP } from '../constants/weather_code_constants';
import WeatherIcon from '../components/WeatherIcon';
import { JSX } from 'react/jsx-runtime';


type HourlyData = {
    time: string;
    temperature: number;
    wind_speed: number;
    weather_code: number;
};


export default function TodayTempCard({hourlyData}: {hourlyData: HourlyData}): JSX.Element {
  
    return (
        <View className="w-20 mx-2 bg-transparent items-center justify-center">
            <Text className="text-sm text-gray-600">
                {hourlyData.time.slice(11, 16)}
            </Text>

            <View className="mt-2 bg-transparent items-center justify-center">
                <WeatherIcon icon={WEATHER_CODE_MAP[hourlyData.weather_code].icon} size={50} />
            </View>

            <Text className="mt-4 text-lg font-bold text-blue-500">
                {hourlyData.temperature}°C
            </Text>

            <View className="items-center justify-center mt-4">
                <Image
                    source={require('../../assets/images/weather_icons/wind.png')}
                    className="w-8 h-8"
                />
                <Text className="text-sm leading-6">{`${hourlyData.wind_speed} km/h`}</Text>
            </View>
        </View>
    );

};