import { createContext, useContext, useState, ReactNode } from 'react';


type SearchProviderProps = {
  children: ReactNode;
};

type Geo = {
  latitude: number;
  longitude: number;
  status: string;
};

type WeatherLocation = {
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}

/*type WeatherAtLocation = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}*/

type SearchContextType = {
  query: string;
  setQuery: (value: string) => void;
  tempQuery: string;
  setTempQuery: (value: string) => void;
  geolocation: Geo;
  setGeolocation: (value: Geo) => void;
  weatherLocation: WeatherLocation;
  setWeatherLocation: (value: WeatherLocation) => void;
  searchStatus: string;
  setSearchStatus: (value: string) => void;
  connectionStatus: string;
  setConnectionStatus: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: SearchProviderProps) {
  const [query, setQuery] = useState<string>('');
  const [tempQuery, setTempQuery] = useState<string>('');
  const [geolocation, setGeolocation] = useState<Geo>({ latitude: 0, longitude: 0, status: "" });
  
  const [weatherLocation, setWeatherLocation] = useState<WeatherLocation>({ name: "", region: "", country: "", latitude: 0, longitude: 0 });
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<string>("");


  return (
    <SearchContext.Provider value={{ query, setQuery, tempQuery, setTempQuery, geolocation, setGeolocation, weatherLocation, setWeatherLocation, searchStatus, setSearchStatus, connectionStatus, setConnectionStatus }}>
      {children}
    </SearchContext.Provider>
  );
}


export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      'useSearch must be used within a SearchProvider'
    );
  }
  return context;
};
