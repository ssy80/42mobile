import { Pressable, Text } from 'react-native';
import { JSX } from 'react/jsx-runtime';
import { DiaryEntry } from '../interfaces/diary_interfaces';
import { Card, IconButton } from 'react-native-paper';
import { feelings } from '../constants/diary_constants';


type DiarySummaryCardProps = {
    diaryEntry: DiaryEntry;
    viewDiaryDetails: (diaryEntry: DiaryEntry) => void;
}

export function DiarySummaryCard(diarySummaryCardProps: DiarySummaryCardProps): JSX.Element {

    const {diaryEntry, viewDiaryDetails} = diarySummaryCardProps;
    const emoji = feelings.find(item => item.id === diaryEntry.feeling)?.emoji || '❓';
  
    return (
        
        <Pressable
        onPress={() =>
            viewDiaryDetails(diaryEntry)
        }
        className="border border-green-200 rounded-lg mt-2"
        >

            <Card.Title
                title={diaryEntry.title}
                subtitle={diaryEntry.createdAt?.toDate().toLocaleDateString()}

                left={(props) => <Text className="text-4xl">{emoji}</Text>}

                right={(props) => <IconButton {...props} icon="dots-vertical"/>}
                
            />

        </Pressable>        
    );
};
