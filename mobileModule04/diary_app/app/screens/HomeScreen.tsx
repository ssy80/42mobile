import { getAuth, signOut } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import { JSX } from 'react/jsx-runtime';
import { useAuth } from '../../context/auth_context';
import { View, Text, FlatList, Alert } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { Redirect } from "expo-router";
import { useState, useEffect } from 'react';
import { NewEntryModalForm } from '../components/NewEntryModalForm';
import { createDiaryEntry } from '../firebase/createNewDiaryEntry';
import { DiaryEntry } from "../interfaces/diary_interfaces";
import { DiarySummaryCard } from '../components/DiarySummaryCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DiaryCard } from '../components/DiaryCard';
import { deleteDiaryEntry } from '../firebase/deleteDiaryEntry';
import { subscribeToDiaryEntries } from '../firebase/subscribeToDiaryEntries';


export default function HomeScreen(): JSX.Element {

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

    const showSnackBar = (msg: string) => {
        setVisibleSnackBar(true);
        setSnackBarMessage(msg);

        setTimeout(() => {
            setVisibleSnackBar(false);
        }, 2000);
    }
    const dismissSnackBar = () => setVisibleSnackBar(false);

    const [entries, setEntries] = useState<DiaryEntry[]>([]);

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

    
    return (
 
        <SafeAreaView className="flex-1 bg-transparent" edges={['top', 'bottom']}>

            <Text className="mt-4 mb-4 text-2xl font-bold text-center">Your Diary Entries</Text>

            <FlatList
                data={entries}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}

                renderItem={({ item }) => (
                <DiarySummaryCard key={item.id} diaryEntry={item} viewDiaryDetails={viewDiaryDetails} />
                )}
            />

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

            <View className="mt-2 mb-2">
                <Button
                mode="outlined"
                onPress={logout}
                >
                Logout
                </Button>
            </View>

            <Snackbar
                visible={visibleSnackBar}
                onDismiss={dismissSnackBar}
                duration={2000}
            >
                {snackBarMessage}
            </Snackbar>

        </SafeAreaView>
    );
};
