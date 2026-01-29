import { JSX } from 'react/jsx-runtime';
import { useAuth } from '../../context/auth_context';
import { View, Text, FlatList, Alert } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { Redirect } from "expo-router";
import { useState, useEffect } from 'react';
import { DiaryEntry } from "../interfaces/diary_interfaces";
import { DiarySummaryCard } from '../components/DiarySummaryCard';
import { DiaryCard } from '../components/DiaryCard';
import { deleteDiaryEntry } from '../firebase/deleteDiaryEntry';
import { subscribeToDiaryEntries } from '../firebase/subscribeToDiaryEntries';
import { Calendar } from 'react-native-calendars';


export function AgendaScreen(): JSX.Element {

    const { user } = useAuth();
    if (!user) {
        return <Redirect href="/screens/LoginScreen" />;
    }
    
    const [visibleSnackBar, setVisibleSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const [visibleDiaryCard, setVisibleDiaryCard] = useState(false);
    const [selectedDiaryEntry, setSelectedDiaryEntry] = useState<DiaryEntry | null>(null);

    const showModalDiary = () => setVisibleDiaryCard(true);
    const hideModalDiary = () => setVisibleDiaryCard(false);

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

    const toDateString = (createdAt: { seconds: number; nanoseconds: number }) => {
        return new Date(createdAt.seconds * 1000)
            .toISOString()
            .split('T')[0];
    };

    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);

    const filteredEntries = entries.filter(entry =>
        entry.createdAt && toDateString(entry.createdAt) === selectedDate
    );
    
    return (
 
        <View className="flex-1 p-4 bg-transparent">

        <Text className="mt-2 mb-2 text-xl font-bold text-center bg-green-200 rounded-lg">Agenda Calendar</Text>

            <Calendar
            markedDates={{
                [selectedDate]: {
                selected: true,
                selectedColor: 'blue',
                },
            }}
            onDayPress={day => {setSelectedDate(day.dateString);}}
            />

            <Text className="mt-2 mb-2 text-xl font-bold text-center bg-green-200 rounded-lg">Your Entries for {selectedDate}</Text>

            <View className="flex-1">
                <FlatList
                    data={filteredEntries}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingHorizontal: 16 }}

                    renderItem={({ item }) => (
                    <DiarySummaryCard key={item.id} diaryEntry={item} viewDiaryDetails={viewDiaryDetails} />
                    )}
                />
            </View>
            
            <DiaryCard visible={visibleDiaryCard} hideModalDiary={hideModalDiary} deleteDiary={deleteDiaryEntry} showSnackBar={showSnackBar} diaryEntry={selectedDiaryEntry} />

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
