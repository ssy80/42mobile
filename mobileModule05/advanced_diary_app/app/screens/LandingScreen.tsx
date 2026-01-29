import { JSX } from 'react/jsx-runtime';
import { Button } from 'react-native-paper';
import { router } from "expo-router";
import { useAuth } from '../../context/auth_context';
import { View, Image, Text } from 'react-native';


export default function LandingScreen(): JSX.Element {

    const { user, loading: authLoading } = useAuth();

    const checkLogin = () => {

       if (!user) {
            router.replace("/screens/LoginScreen");
        } else {
            router.replace("/screens/HomeScreen");
        }
    }

    return (
        <View className="flex-1 items-center justify-center bg-transparent">
                
                <View className='mb-16'>
                    <Text className="text-4xl font-bold">My Diary App</Text>
                </View>

                <View className='mb-16'>
                    <Image className="h-48 w-48" source={require('../../assets/images/my_diary_logo.png')}/>
                </View>

                <Button
                mode="outlined"
                onPress={checkLogin}
                >
                Login
                </Button>
        </View>
    );
}
