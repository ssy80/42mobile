import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from '@react-native-firebase/firestore';
import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import { DiaryEntry } from '../interfaces/diary_interfaces';


export function subscribeToDiaryEntries(onChange: (entries: DiaryEntry[]) => void, onError?: (error: Error) => void) {
  
    const auth = getAuth(getApp());
    const user = auth.currentUser;
    const db = getFirestore();

    try{
        if (!user) {
            onError?.(new Error("Not authenticated"));
            return () => {};
        }

        const q = query(
            collection(db, "diaries", user.uid, "diaryEntries"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            snapshot => {
                const entries: DiaryEntry[] = snapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<DiaryEntry, "id">),
                }));
                onChange(entries);
            },
            error => {
                console.error("Firestore listener error:", error);
                onError?.(error);
            }
        );

        return unsubscribe;
    } catch (err:any) {
        console.error("Error getting diary entries:", err);
        throw new Error(err?.message || "Failed to get diary entries");
    }
}
