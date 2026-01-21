type WeatherInfo = {
  weather: string;
  icon: WeatherIconName;
};

export const WEATHER_CODE_MAP: Record<number, WeatherInfo> = {
  0: { weather: 'Clear sky', icon: 'clear.png' },

  1: { weather: 'Mainly clear, partly cloudy, and overcast', icon: 'clear_cloudy.png' },
  2: { weather: 'Mainly clear, partly cloudy, and overcast', icon: 'clear_cloudy.png' },
  3: { weather: 'Mainly clear, partly cloudy, and overcast', icon: 'clear_cloudy.png' },

  45: { weather: 'Fog and depositing rime fog', icon: 'fog.png' },
  48: { weather: 'Fog and depositing rime fog', icon: 'fog.png' },

  51: { weather: 'Drizzle: Light, moderate, and dense intensity', icon: 'rainy.png' },
  
  53: { weather: 'Drizzle: Light, moderate, and dense intensity', icon: 'rainy.png' },
  55: { weather: 'Drizzle: Light, moderate, and dense intensity', icon: 'rainy.png' },

  56: { weather: 'Freezing Drizzle: Light and dense intensity', icon: 'freezing_drizzle.jpg' },
  57: { weather: 'Freezing Drizzle: Light and dense intensity', icon: 'freezing_drizzle.jpg' },

  61: { weather: 'Rain: Slight, moderate and heavy intensity', icon: 'rainy.png' },
  63: { weather: 'Rain: Slight, moderate and heavy intensity', icon: 'rainy.png' },
  65: { weather: 'Rain: Slight, moderate and heavy intensity', icon: 'rainy.png' },

  66: { weather: 'Freezing Rain: Light and heavy intensity', icon: 'freezing_rain.png' },
  67: { weather: 'Freezing Rain: Light and heavy intensity', icon: 'freezing_rain.png' },

  71: { weather: 'Snow fall: Slight, moderate, and heavy intensity', icon: 'snow.png' },
  73: { weather: 'Snow fall: Slight, moderate, and heavy intensity', icon: 'snow.png' },
  75: { weather: 'Snow fall: Slight, moderate, and heavy intensity', icon: 'snow.png' },

  77: { weather: 'Snow grains', icon: 'snow_grains.jpg' },

  80: { weather: 'Rain showers: Slight, moderate, and violent', icon: 'heavy_rain.png' },
  81: { weather: 'Rain showers: Slight, moderate, and violent', icon: 'heavy_rain.png' },
  82: { weather: 'Rain showers: Slight, moderate, and violent', icon: 'heavy_rain.png' },

  85: { weather: 'Snow showers slight and heavy', icon: 'snow.png' },
  86: { weather: 'Snow showers slight and heavy', icon: 'snow.png' },

  95: { weather: 'Thunderstorm: Slight or moderate', icon: 'thunder.png' },

  96: { weather: 'Thunderstorm with slight and heavy hail', icon: 'thunderstorm_hail.png' },
  99: { weather: 'Thunderstorm with slight and heavy hail', icon: 'thunderstorm_hail.png' },
};

export const WEATHER_ICONS = {
  'clear.png': require('../../assets/images/weather_icons/clear.png'),
  'clear_cloudy.png': require('../../assets/images/weather_icons/clear_cloudy.png'),
  'fog.png': require('../../assets/images/weather_icons/fog.png'),
  'freezing_drizzle.jpg': require('../../assets/images/weather_icons/freezing_drizzle.jpg'),
  'rainy.png': require('../../assets/images/weather_icons/rainy.png'),
  'freezing_rain.png': require('../../assets/images/weather_icons/freezing_rain.png'),
  'snow.png': require('../../assets/images/weather_icons/snow.png'),
  'snow_grains.jpg': require('../../assets/images/weather_icons/snow_grains.jpg'),
  'heavy_rain.png': require('../../assets/images/weather_icons/heavy_rain.png'),
  'thunder.png': require('../../assets/images/weather_icons/thunder.png'),
  'thunderstorm_hail.png': require('../../assets/images/weather_icons/thunderstorm_hail.png'),
} as const;

export type WeatherIconName = keyof typeof WEATHER_ICONS;
