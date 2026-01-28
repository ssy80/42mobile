import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  doc,
  deleteDoc,
} from '@react-native-firebase/firestore';


export async function deleteDiaryEntry(entryId: string): Promise<void> {

    try {
        const auth = getAuth(getApp());
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated");
        }

        const db = getFirestore();
        const entryRef = doc(db, 'diaries', user.uid, 'diaryEntries', entryId);
        await deleteDoc(entryRef);

        } catch (err: any) {
            console.error("Failed to delete diary entry:", err);
            throw new Error(err?.message || "Failed to delete diary entry");
        }
}
