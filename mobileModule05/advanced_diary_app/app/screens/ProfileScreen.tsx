import { getAuth, signOut } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import { JSX } from 'react/jsx-runtime';
import { useAuth } from '../../context/auth_context';
import { View, Text, FlatList, Alert, Image } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { Redirect } from "expo-router";
import { useState, useEffect } from 'react';
import { NewEntryModalForm } from '../components/NewEntryModalForm';
import { createDiaryEntry } from '../firebase/createNewDiaryEntry';
import { DiaryEntry } from "../interfaces/diary_interfaces";
import { DiarySummaryCard } from '../components/DiarySummaryCard';
import { DiaryCard } from '../components/DiaryCard';
import { deleteDiaryEntry } from '../firebase/deleteDiaryEntry';
import { subscribeToDiaryEntries } from '../firebase/subscribeToDiaryEntries';
import { feelings } from '../constants/diary_constants';


export function ProfileScreen(): JSX.Element {

    const { user } = useAuth();
    if (!user) {
        return <Redirect href="/screens/LoginScreen" />;
    }
    
    const [visibleNewEntry, setVisibleNewEntry] = useState(false);
    const [visibleSnackBar, setVisibleSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const [visibleDiaryCard, setVisibleDiaryCard] = useState(false);
    const [selectedDiaryEntry, setSelectedDiaryEntry] = useState<DiaryEntry | null>(null);

    const showModalDiary = () => setVisibleDiaryCard(true);
    const hideModalDiary = () => setVisibleDiaryCard(false);

    const showModalNewEntry = () => setVisibleNewEntry(true);
    const hideModalNewEntry = () => setVisibleNewEntry(false);

    const dismissSnackBar = () => setVisibleSnackBar(false);

    const [entries, setEntries] = useState<DiaryEntry[]>([]);

    const showSnackBar = (msg: string) => {
        setVisibleSnackBar(true);
        setSnackBarMessage(msg);

        setTimeout(() => {
            setVisibleSnackBar(false);
        }, 2000);
    }

    const viewDiaryDetails = (diaryEntry: DiaryEntry) => {
        setSelectedDiaryEntry(diaryEntry);
        showModalDiary();
    }

    const onError = (error: Error) => {
        console.error(error);
        Alert.alert('Error', error.message);
    }

    useEffect(() => {
        const unsubscribe = subscribeToDiaryEntries(setEntries, onError);

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            const auth = getAuth(getApp());
            await signOut(auth);
        } catch (err: any) {
            console.error('Logout failed:', err);
        }
    };

    type FeelingStats = {
        feeling: string;
        count: number;
        percentage: number;
    };

    function calculateFeelingStats(entries: DiaryEntry[]): FeelingStats[] {
        const total = entries.length;
        if (total === 0) return [];

        const counts: Record<string, number> = {};

        feelings.forEach(feeling => {
            counts[feeling.id] = 0;
        });

        entries.forEach(entry => {
            counts[entry.feeling] = (counts[entry.feeling] || 0) + 1;
        });

        return Object.entries(counts).map(([feeling, count]) => ({
            feeling,
            count,
            percentage: Math.round((count / total) * 100),
        }));
    }

    const feelingStats = calculateFeelingStats(entries);
    
    return (
 
        <View className="flex-1 p-4 bg-transparent">

            <View className="flex-row justify-between">
                <View >
                    <Image className="h-24 w-24 " source={require('../../assets/images/my_diary_logo.png')}/>
                </View>
                <View className="justify-center">
                    <Text className="text-xl">{user.displayName}</Text>
                </View>
                <View className="justify-center">
                    <Button
                    mode="outlined"
                    onPress={logout}
                    >
                    Logout
                    </Button>
                </View>
            </View>

            <Text className="mt-4 mb-4 text-xl font-bold text-center bg-green-200 rounded-lg">Your Latest Entries</Text>

            <View className="flex-1">
                <FlatList
                    data={entries.slice(0, 2)}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingHorizontal: 16 }}

                    renderItem={({ item }) => (
                    <DiarySummaryCard key={item.id} diaryEntry={item} viewDiaryDetails={viewDiaryDetails} />
                    )}
                />
            </View>
            
            <Text className="text-xl font-bold text-center bg-green-200 rounded-lg">Your feel for your {entries.length} Entries</Text>

            <View className="flex-1 flex-row justify-around mt-4">
                {feelingStats.map(stat => (
                        <View key={stat.feeling}>
                            <Text className="text-2xl">
                                {feelings.find(item => item.id === stat.feeling)?.emoji || '❓'}
                            </Text>
                            <Text className="font-semibold">
                                {stat.percentage}%
                            </Text>
                        </View>
                ))}
            </View>

            <DiaryCard visible={visibleDiaryCard} hideModalDiary={hideModalDiary} deleteDiary={deleteDiaryEntry} showSnackBar={showSnackBar} diaryEntry={selectedDiaryEntry} />
            <NewEntryModalForm visible={visibleNewEntry} hideModal={hideModalNewEntry} showSnackBar={showSnackBar} onSubmit={createDiaryEntry} email={user.email} />
            
            <View className="mt-4">
                <Button
                mode="outlined"
                onPress={showModalNewEntry}
                >
                Create New Entry
                </Button>
            </View>

            
            <Snackbar
                visible={visibleSnackBar}
                onDismiss={dismissSnackBar}
                duration={2000}
            >
                {snackBarMessage}
            </Snackbar>
        </View>

    );
};
