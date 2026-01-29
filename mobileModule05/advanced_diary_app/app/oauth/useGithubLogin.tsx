import {
  getAuth,
  GithubAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  getFunctions,
  httpsCallable,
} from '@react-native-firebase/functions';
import { getApp } from '@react-native-firebase/app';
import { useAuth } from '../../context/auth_context';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useEffect, useState } from 'react';
import { DISCOVERY, CLIENT_ID } from '../constants/diary_constants';


WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri();

const discovery = DISCOVERY;

const config = {
    clientId: CLIENT_ID,
    redirectUri,
    scopes: ['read:user', 'user:email'],
    usePKCE: false,
    codeChallengeMethod: undefined,
};

interface GithubExchangeResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export function useGithubLogin() {

    const { setUser } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(config, discovery);

    // Handle OAuth response
    useEffect(() => {
        if (!response) return;

        if (response.type === 'success') {
            const { code } = response.params;
            exchangeCodeForToken(code);
        }
        else if (response.type === 'error') {
            setError(response.error?.message ?? 'GitHub login failed. Please try again.');
            return;
        }

    }, [response]);

    const exchangeCodeForToken = async (code: string) => {
        try {
            setLoading(true);
            setError(null);
            
            const app = getApp();
            const functions = getFunctions(app);

            const exchangeGithubCode = httpsCallable<{ code: string }, GithubExchangeResponse>(functions, 'exchangeGithubCode');
            
            // Call your Cloud Function
            const result = await exchangeGithubCode({ code });
            if (!result || !result.data) 
                throw new Error("No response from token exchange");

            const { access_token: accessToken } = result.data;
            if (!accessToken) 
                throw new Error("No GitHub access token received");

            // Use the real token to sign into Firebase
            const credential = GithubAuthProvider.credential(accessToken);
            if (!credential) 
                throw new Error("No GitHub credential");

            const auth = getAuth(app);
            
            const userCredential = await signInWithCredential(auth, credential)
            if (!userCredential) 
                throw new Error("No Firebase credential");

            const user = userCredential.user;
            if (!user) 
                throw new Error("No Firebase user");

            const appUser = {
                uid: user.uid,
                email: user.providerData[0].email ?? null,
                displayName: user.providerData[0].displayName ?? null,
                provider: user.providerData[0].providerId,
                firebaseUser: user,
            };
            
            setUser(appUser);
            
        } catch (err: any) {
            console.error("Auth failed", err);
            setError(err?.message ?? 'Github login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const loginWithGithub = async () => {
        try {
            setLoading(true);
            setError(null);

            await promptAsync();

        } catch (err: any) {
            console.error("Github Sign-In failed:", err);
            setError(err?.message ?? 'Github login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        loginWithGithub,
        error,
        clearError: () => setError(null),
        loading,
        request
    };

};
