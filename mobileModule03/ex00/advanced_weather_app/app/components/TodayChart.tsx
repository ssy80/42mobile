import { LineChart } from "react-native-chart-kit";
import { JSX } from "react/jsx-runtime";
import { useWindowDimensions } from 'react-native';


type WeatherData = {
    time: string[];
    temperature: number[];
    wind_speed: number[];
    weather_code: number[];
};


export default function TodayChart({weather}: {weather: WeatherData}): JSX.Element {

    const { width } = useWindowDimensions();
    const height = 220;
    const dataTemp = weather.temperature.map(t => t);

    const labels = weather.time.map((t, i) =>
        i % 3 === 0 ? t.slice(11, 16) : ''
    );

    return (
    
        <LineChart
            data={{
            labels: labels,
            datasets: [
                {
                    data: dataTemp,
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // blue
                    strokeWidth: 2,
                },
            ],
                legend: ["Temp"],
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