import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { JSX } from 'react/jsx-runtime';
import { DiaryEntry } from '../interfaces/diary_interfaces';
import { Card, Modal, Portal, Divider, Button } from 'react-native-paper';
import { feelings } from '../constants/diary_constants';
import { useNetwork } from '../hooks/useNetwork';
import { useState } from 'react';


type DiaryCardProps = {
    visible: boolean;
    hideModalDiary: () => void;
    showSnackBar: (msg: string) => void;
    deleteDiary: (entryId: string) => Promise<void>;
    diaryEntry: DiaryEntry | null;
};


export function DiaryCard(diaryCardProps: DiaryCardProps): JSX.Element {

    const { visible, hideModalDiary, deleteDiary, showSnackBar, diaryEntry } = diaryCardProps;
    
    const emoji = feelings.find(item => item.id === diaryEntry?.feeling)?.emoji ?? '❓';
    const { isConnected } = useNetwork();
    
    const [deleting, setDeleting] = useState(false);

    async function processDelete(){
            try {
                
                if (!isConnected) {
                    Alert.alert(
                        'Offline',
                        'You are currently offline. Your entry cannot be deleted right now.'
                    );
                    return;
                }

                setDeleting(true);
    
                await deleteDiary(diaryEntry?.id ?? '');
                hideModalDiary();
                showSnackBar('Entry deleted successfully!');
            } catch (err: any) {
                console.error('Delete entry failed:', err);
            } finally {
                setDeleting(false);
            }
    };
  
    return (

        <Portal>
            <Modal visible={visible} onDismiss={hideModalDiary} contentContainerStyle={styles.containerStyle}>
                <View className="rounded-lg">
                    <Card.Title
                        title={diaryEntry?.createdAt?.toDate().toLocaleDateString()}
                    />
                    <Divider />
                    <View className="px-4 py-2">
                        <Text className="text-2xl">
                            {diaryEntry?.title}
                        </Text>
                    </View>
                    <Divider />
                    <View className="flex-row px-4 py-2">
                        <Text className="text-xl">
                            My feeling 
                        </Text>
                        <Text className="text-4xl ml-4">
                            {emoji}
                        </Text>
                    </View>
                    <Divider />
                    <Text className="px-4 pb-4 text-xl">
                        {diaryEntry?.content}
                    </Text>

                    <Button
                    mode="outlined"
                    onPress={processDelete}
                    className="mt-4"
                    loading={deleting}
                    >
                    Delete
                    </Button>

                    <Button
                    mode="outlined"
                    onPress={hideModalDiary}
                    className="mt-4"
                    >
                    OK
                    </Button>
                </View>
            </Modal>        
        </Portal>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
});
