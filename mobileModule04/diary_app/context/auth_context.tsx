import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import { createContext, useContext, useState, useEffect } from 'react';
import { APP_USER } from '../app/interfaces/diary_interfaces';


type AuthContextType = {
  user: APP_USER | null;
  setUser: (user: APP_USER | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {}, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<APP_USER | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(getApp());
        
        const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
            try{
                if (firebaseUser) {
                    const providerId = firebaseUser.providerData[0]?.providerId ?? "firebase";

                    const appUser: APP_USER = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.providerData[0].email ?? null,
                        displayName: firebaseUser.providerData[0].displayName ?? null,
                        provider: providerId,
                        firebaseUser,
                    };
                
                    setUser(appUser);
                }
                else {
                    setUser(null);
                }
        } catch (error) {
            console.error("Error in auth state change handling:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }

    });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
        {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);
