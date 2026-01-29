import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuth } from '../../context/auth_context';
import { WEB_CLIENT_ID } from '../constants/diary_constants';


GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
});


export function useGoogleLogin() {

    const { setUser } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const loginWithGoogle = async () => {
        try {
            setLoading(true);
            setError(null);

            await GoogleSignin.hasPlayServices();
            //await GoogleSignin.revokeAccess();
            //await GoogleSignin.signOut();
            await GoogleSignin.signIn();

            const { idToken } = await GoogleSignin.getTokens();
            if (!idToken) 
                throw new Error("No Google ID token");

            const credential = GoogleAuthProvider.credential(idToken);
            if (!credential) 
                throw new Error("No Google credential");

            const auth = getAuth(getApp());
            const userCredential = await signInWithCredential(auth, credential);
            if (!userCredential) 
                throw new Error("No Firebase credential");

            const user = userCredential.user;
            if (!user) 
                throw new Error("No Firebase user");
            
            const appUser = {
                uid: user.uid,
                email: user.email ?? null,
                displayName: user.displayName ?? null,
                provider: user.providerData[0].providerId,
                firebaseUser: user,
            };

            setUser(appUser);

        } catch (err: any) {
            console.error("Google Sign-In failed:", err);
            setError(err?.message ?? 'Google login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        loginWithGoogle,
        error,
        clearError: () => setError(null),
        loading,
    };

}
