import { FirebaseAuthTypes } from '@react-native-firebase/auth';


export interface APP_USER {
    uid: string;
    email: string | null;
    displayName: string | null;
    provider: string;
    firebaseUser: FirebaseAuthTypes.User;
};


export interface DiaryEntry {
    id: string;
    title: string;
    feeling: string;
    content: string;
    createdAt: any;
    email: string | null;
}
