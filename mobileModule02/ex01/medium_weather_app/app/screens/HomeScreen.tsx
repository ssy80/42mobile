import { View, StyleSheet } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSearch } from '@/context/search_context';
import CurrentlyScreen from './CurrentlyScreen';
import TodayScreen from './TodayScreen';
import WeeklyScreen from './WeeklyScreen';
import { JSX } from 'react/jsx-runtime';
import * as Location from 'expo-location';
import { Portal, Modal, ActivityIndicator, Text } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { searchLocationByName, getLocationByLatLon } from '../service/api';

const Tab = createMaterialTopTabNavigator();

export default function Home(): JSX.Element {
    const insets = useSafeAreaInsets();
    const { query, setQuery, geolocation, setGeolocation, weatherLocation, setWeatherLocation, setSearchStatus, connectionStatus, setConnectionStatus } = useSearch();
    const [loadingLocation, setLoadingLocation] = useState(false);

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const onPressGeoLocation = async (): Promise<void> => {
        setGeolocation({ latitude: 0, longitude: 0, status: "" });
        setQuery("");
        setSearchStatus("");
        setWeatherLocation({ name: "", region: "", country: "", latitude: 0, longitude: 0 });
        setConnectionStatus("");
        setLoadingLocation(true);
        

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                const loc = await Location.getCurrentPositionAsync({});
                console.log(`${loc.coords.latitude},${loc.coords.longitude}`);
                setGeolocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude, status: "granted" });

            } else {
                setGeolocation({ latitude: 0, longitude: 0, status: "no gps permission" });
            }
        } catch (e) {
            setGeolocation({ latitude: 0, longitude: 0, status: "gps error" });
        } finally {
            setLoadingLocation(false);
        }

    };
    

    type LocationItem = {
        name: string;
        region: string;
        country: string;
        latitude: number;
        longitude: number;
    }


    const onPressItem = (locationItem: LocationItem) => {
        console.log(locationItem);
        setQuery("");
        setWeatherLocation(locationItem);
    }


    const handleSearch  = () => {
        setQuery(query);
    }


    useEffect(() => {

        setGeolocation({ latitude: 0, longitude: 0, status: "" });

        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            setSearchStatus("");
            
            try {
                const res = await searchLocationByName(query);
                setResults(res.results ?? []);
                if (res.results === undefined || res.results.length === 0) {
                    setSearchStatus("not found location");
                }
                setConnectionStatus("");
                console.log(results);
            } catch (e: any) {
                if (!e.response) {
                    setConnectionStatus("no internet");
                } else {
                    setConnectionStatus("error api call");
                }
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timeout);
    
        }, [query]);


    useEffect(() => {
        if (geolocation.latitude === 0 || geolocation.longitude === 0) {
            setWeatherLocation({ name: "", region: "", country: "", latitude: 0, longitude: 0 });
            return;
        }

        const fetchLocation = async (): Promise<void> => {
            setLoading(true);
            
            try {
                const res = await getLocationByLatLon(
                    geolocation.latitude,
                    geolocation.longitude
                );
                setConnectionStatus("");
                setWeatherLocation({name: res.city, region: res.locality, country: res.countryName, latitude: geolocation.latitude, longitude: geolocation.longitude});
            } catch (e: any) {
                if (!e.response) {
                    setConnectionStatus("no internet");
                } else {
                    setConnectionStatus("error api call");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchLocation();
    }, [geolocation.latitude, geolocation.longitude]);


    return (
        <View className="flex-1">
            
        {/* AppBar */}
        <Appbar.Header >
            <View className="flex-1 mx-2">
                <Searchbar
                    placeholder=""
                    value={query}
                    onChangeText={setQuery}
                    onIconPress={handleSearch}
                    onSubmitEditing={handleSearch}
                />
            </View>
            <Appbar.Action icon="crosshairs-gps" onPress={onPressGeoLocation} />
        </Appbar.Header>

        {loading && <ActivityIndicator className="mt-2" />}

        { results && results.length > 0 &&
            <FlatList
                data={results}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            onPressItem({name: item.name, region: item.admin1, country: item.country, latitude: item.latitude, longitude: item.longitude});
                            setResults([]);
                        }}
                        className="px-4 py-3 border-b border-gray-200"
                        >
                        <Text className="text-base">
                            {item.name}, {item.admin1}, {item.country}, {item.latitude}, {item.longitude}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        }

        {/* Bottom-positioned swipe tabs */}
        <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={{
                swipeEnabled: true,
                tabBarShowIcon: true,
                tabBarIndicatorStyle: styles.tabBarIndicator,
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    paddingBottom: insets.bottom,
                },
                tabBarActiveTintColor: "#000000",
                tabBarInactiveTintColor: "#9e9e9e",
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >

            <Tab.Screen
            name="Currently"
            component={CurrentlyScreen}
            options={{
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" size={24} color={color} />
                ),
            }}
            />

            <Tab.Screen
            name="Today"
            component={TodayScreen}
            options={{
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar-today" size={24} color={color} />
                ),
            }}
            />

            <Tab.Screen
            name="Weekly"
            component={WeeklyScreen}
            options={{
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar-week" size={24} color={color} />
                ),
            }}
            />
        </Tab.Navigator>

        {/* MODAL GOES HERE */}
        <Portal>
            <Modal visible={loadingLocation} dismissable={false}>
                <View className="bg-white rounded-lg p-6 mx-8 items-center">
                    <ActivityIndicator size="large" />
                    <Text className="mt-4 text-base">Getting your location…</Text>
                </View>
            </Modal>
        </Portal>

        </View>
    );
}


const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 12,
        textTransform: "none",
    },

    tabBarIndicator: {
        backgroundColor: "#cf2b2bff",
        height: 2,
    }
});
