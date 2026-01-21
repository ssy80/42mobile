import * as React from 'react';
import { Avatar } from 'react-native-paper';
import { WEATHER_ICONS, WeatherIconName } from '../constants/weather_code_constants';


type WeatherIconProps = {
  icon: WeatherIconName;
  size?: number;
};


const WeatherIcon = ({ icon, size = 24 }: WeatherIconProps) => (
  <Avatar.Image size={size} source={WEATHER_ICONS[icon]} />
);

export default WeatherIcon