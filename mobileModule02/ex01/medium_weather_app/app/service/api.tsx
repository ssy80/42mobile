import axios from 'axios';


export const locationApi = axios.create({

    baseURL: "https://geocoding-api.open-meteo.com/v1",
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },

});


export const weatherApi = axios.create({

    baseURL: "https://api.open-meteo.com/v1",
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },

});


export const bigDataCloudApi = axios.create({

    baseURL: "https://api.bigdatacloud.net/data",
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },

});


export const searchLocationByName = async (locationName: string) => {
  
  try {
    
    const res = await locationApi.get('/search', {
        params: {
          name: locationName,
        },
    });

    return res.data;

  } catch (error) {
    throw error;
  } 
};


export const getLocationByLatLon = async (latitude: number, longitude: number) => {
  
  try {
    
      const res = await bigDataCloudApi.get('/reverse-geocode-client', {
          params: {
            latitude: latitude,
            longitude: longitude,
            localityLanguage: 'en',
          },
      });
      return res.data;

  } catch (error) {
    throw error;
  }
};


export const getWeatherByLatLon = async (latitude: number, longitude: number) => {
  
    try {
        const res = await weatherApi.get('/forecast', {
            params: {
              latitude: latitude,
              longitude: longitude
            },
        });

        return res.data;
      } catch (error) {
        throw error;
      }
};


export const getCurrentWeatherByLatLon = async (latitude: number, longitude: number, current: string) => {
  
    try {
        const res = await weatherApi.get('/forecast', {
            params: {
              latitude: latitude,
              longitude: longitude,
          current: current,
        },
    });

    return res.data;
    } catch (error) {
        throw error;
    }
};


//https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,wind_speed_10m,weather_code&forecast_days=1&latitude=52.52&longitude=13.41
export const getTodayWeatherByLatLon = async (latitude: number, longitude: number, hourly: string) => {
  
    try {
        const res = await weatherApi.get('/forecast', {
            params: {
              latitude: latitude,
          longitude: longitude,
          hourly: hourly,
          forecast_days: 1,
        },               
    });

    return res.data;
  } catch (error) {
    throw error;
  } 
};


//daily=temperature_2m_min,temperature_2m_max,weather_code
export const getWeeklyWeatherByLatLon = async (latitude: number, longitude: number, daily: string) => {
  
    try {
        const res = await weatherApi.get('/forecast', {
            params: {
              latitude: latitude,
          longitude: longitude,
          daily: daily,
        },               
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};