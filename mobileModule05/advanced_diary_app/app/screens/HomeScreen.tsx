import { View, StyleSheet, Text } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { JSX } from 'react/jsx-runtime';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { useState, useEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ProfileScreen } from './ProfileScreen';
import { AgendaScreen } from './AgendaScreen';


const Tab = createMaterialTopTabNavigator();

export default function Home(): JSX.Element {
    
    const insets = useSafeAreaInsets();
    //const { query, setQuery, geolocation, setGeolocation, weatherLocation, setWeatherLocation, setSearchStatus, connectionStatus, setConnectionStatus } = useSearch();
    //const [loadingLocation, setLoadingLocation] = useState(false);
    //const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    return (
        

        <SafeAreaView className="flex-1 bg-transparent" edges={['top']}>
        
        {/* AppBar 
        <Appbar.Header className="bg-transparent">
            <View className="flex-1 mx-2">
                <Text className="text-2xl font-bold text-black">My Diary</Text>
            </View>
        </Appbar.Header> */}

        {/*loading && <ActivityIndicator className="mt-2" />*/}


        {/* Bottom-positioned swipe tabs */}
        <View className="flex-1  bg-transparent">
        <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={{
                swipeEnabled: true,
                tabBarShowIcon: true,
                tabBarIndicatorStyle: styles.tabBarIndicator,
                tabBarStyle: {
                    backgroundColor: "transparent",
                    paddingBottom: insets.bottom,
                },
                tabBarActiveTintColor: "#000000",
                tabBarInactiveTintColor: "#9e9e9e",
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >

            <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" size={24} color={color} />
                ),
                sceneStyle: {
                    backgroundColor: 'transparent',
                },
            }}
            />

            <Tab.Screen
            name="Agenda"
            component={AgendaScreen}
            options={{
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar-today" size={24} color={color} />
                ),
                sceneStyle: {
                    backgroundColor: 'transparent',
                },
            }}
            />

        </Tab.Navigator>
        </View>

        {/* MODAL GOES HERE
        <Portal>
            <Modal visible={loadingLocation} dismissable={false}>
                <View className="bg-white rounded-lg p-6 mx-8 items-center">
                    <ActivityIndicator size="large" />
                    <Text className="mt-4 text-base">Getting your location…</Text>
                </View>
            </Modal>
        </Portal> */}

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 12,
        textTransform: "none",
    },

    tabBarIndicator: {
        backgroundColor: 'transparent',
        height: 2,
    }
});
