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
import { useState } from 'react';

const Tab = createMaterialTopTabNavigator();

export default function Home(): JSX.Element {
    const insets = useSafeAreaInsets();
    const { setQuery, tempQuery, setTempQuery, setGeolocation } = useSearch();
    const [loadingLocation, setLoadingLocation] = useState(false);

    const onPressLocation = async (): Promise<void> => {
        setLoadingLocation(true);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                const loc = await Location.getCurrentPositionAsync({});
                setGeolocation(`${loc.coords.latitude},${loc.coords.longitude}`);
            } else {
                setGeolocation("no gps permission");
            }
        } catch (e) {
            setGeolocation("gps error");
        } finally {
            setLoadingLocation(false);
        }

    };

    const searchPress = () => {
        setQuery(tempQuery);
        setGeolocation("");
    }

    return (
        <View style={styles.container}>
            
        {/* AppBar */}
        <Appbar.Header style={styles.appBar}>
            <Searchbar
            placeholder=""
            value={tempQuery}
            onChangeText={setTempQuery}
            onIconPress={() => searchPress()}
            style={styles.searchBar}
            elevation={0}
            />
            <Appbar.Action icon="crosshairs-gps" onPress={onPressLocation} />
        </Appbar.Header>

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
    container: {
        flex: 1,
    },

    appBar: {
        backgroundColor: "#ffffff",
    },

    searchBar: {
        flex: 1,
        marginHorizontal: 8,
    },

    tabBarLabel: {
        fontSize: 12,
        textTransform: "none",
    },

    tabBarIndicator: {
        backgroundColor: "#cf2b2bff",
        height: 2,
    }
});
