import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { JSX } from 'react/jsx-runtime';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ActivityIndicator, Avatar, Button, Modal, Portal } from 'react-native-paper';
import { router } from 'expo-router';
import { useGithubLogin } from '../oauth/useGithubLogin';
import { useGoogleLogin } from '../oauth/useGoogleLogin';
import { useAuth } from '../../context/auth_context';
import { useEffect } from 'react';


export default function LoginScreen(): JSX.Element {

    const { user } = useAuth();

    const {
        loginWithGoogle,
        error,
        clearError,
        loading,
    } = useGoogleLogin();

    const {
        loginWithGithub,
        error: githubError,
        clearError: clearGithubError,
        loading: githubLoading,
        request: githubRequest,
    } = useGithubLogin();
   
    useEffect(() => {
        if (user) {
            router.replace("/screens/HomeScreen");
        }
    }, [user]);
    
    const isLoading = loading || githubLoading

    return (
        <View className="flex-1 items-center justify-center bg-transparent">
            
            <View className='mb-16'>
            <Image className="h-48 w-48" source={require('../../assets/images/my_diary_logo.png')}/>
            </View>

            <Text className="mb-4 text-lg font-bold">Login to access My Diaries !</Text>
            <Button
            mode="outlined"
            icon="google"
            onPress={loginWithGoogle}
            loading={loading}
            disabled={loading}
            >
                Continue with Google
            </Button>

            <Button
            className='mt-4'
            mode="outlined"
            icon="github"
            onPress={loginWithGithub}
            loading={githubLoading}
            disabled={githubLoading}
            >
                Continue with GitHub
            </Button>

            {/* Error Modal */}
            <Portal>
                <Modal
                visible={!!error || !!githubError}
                onDismiss={() => {
                    clearError();
                    clearGithubError();
                }}
                contentContainerStyle={styles.modal}
                >
                    <Text className="text-lg font-semibold mb-2">
                        Login Failed
                    </Text>

                    <Text className="mb-4">
                        {error ?? githubError}
                    </Text>

                    <Button mode="contained" onPress={() => {
                        clearError();
                        clearGithubError();
                    }}>
                        OK
                    </Button>
                </Modal>
            </Portal>

            {/* Loading Modal */}
            <Portal>
            <Modal
                visible={isLoading}
                dismissable={false}
                contentContainerStyle={styles.modal}
            >
                <View className="items-center">
                <ActivityIndicator size="large" />
                <Text className="mt-4 text-base">
                    Signing you in…
                </Text>
                </View>
            </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },

    tabBarIndicator: {
        backgroundColor: 'transparent',
        height: 2,
    }
});
