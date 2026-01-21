import { View, Text } from 'react-native';
import { WEATHER_CODE_MAP } from '../constants/weather_code_constants';
import WeatherIcon from '../components/WeatherIcon';
import { JSX } from 'react/jsx-runtime';


type DailyData = {
    forecast_date: string;
    temperature_min: number;
    temperature_max: number;
    weather_code: number;
};


export default function WeeklyTempCard({dailyData}: {dailyData: DailyData}): JSX.Element {
  
    return (
        <View className="w-20 mx-2 bg-transparent items-center justify-center">
            <Text className="text-sm text-gray-600">
                {dailyData.forecast_date.slice(5, 10)}
            </Text>

            <View className="mt-2 bg-transparent items-center justify-center">
                <WeatherIcon icon={WEATHER_CODE_MAP[dailyData.weather_code].icon} size={50} />
            </View>

            <Text className="mt-4 text-lg font-bold text-orange-500">
                {dailyData.temperature_max}°C
            </Text>
            <Text className="text-lg font-bold text-blue-500">
                {dailyData.temperature_min}°C
            </Text>
        </View>
    );

};