import { LineChart } from "react-native-chart-kit";
import { JSX } from "react/jsx-runtime";
import { useWindowDimensions } from 'react-native';


type WeatherData = {
    forecast_date: string[];
    temperature_min: number[];
    temperature_max: number[];
    weather_code: number[];
};


export default function WeeklyChart({weather}: {weather: WeatherData}): JSX.Element {

    const { width } = useWindowDimensions();
    const height = 220;
    const labels = weather.forecast_date.map(fd => fd.slice(5,10));
    const dataTempMin = weather.temperature_min.map(t => t);
    const dataTempMax = weather.temperature_max.map(t => t);

    return (
    
        <LineChart
            data={{
            labels: labels,
            datasets: [
                {
                    data: dataTempMin,
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // blue
                    strokeWidth: 2,
                },
                {
                    data: dataTempMax,
                    color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // orange
                    strokeWidth: 2,
                },
            ],
                legend: ["Min Temp", "Max Temp"],
            }}
            width={width}
            height={height}
            yAxisSuffix="°C"
            chartConfig={{
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                    r: "4",
                }
            }}
            style={{
                borderRadius: 8
            }}
        />
    );
}