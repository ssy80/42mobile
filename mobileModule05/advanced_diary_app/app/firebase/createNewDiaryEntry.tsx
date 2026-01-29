import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';


type DiaryEntry = {
    title: string;
    feeling: string;
    content: string;
    email: string | null;
};

export async function createDiaryEntry(entry: DiaryEntry) {

    const { title, feeling, content, email } = entry;
    const auth = getAuth(getApp());
    const user = auth.currentUser;

    try {
        if (!user)
            throw new Error("Not authenticated");

        const db = getFirestore();
        const entryRef = collection(db, 'diaries', user.uid, 'diaryEntries');

        await addDoc(entryRef, {
            email: email ?? null,
            title,
            feeling,
            content,
            createdAt: serverTimestamp(),
        });

    } catch (err:any) {
        console.error("Error creating diary entry:", err);
        throw new Error(err?.message || "Failed to create diary entry");
    }
}
