import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import "nativewind";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: true,
        headerTintColor: '#ffffff',
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen
        name="ex00"
        options={{
          title: 'ex00',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="ex01"
        options={{
          title: 'ex01',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />

      <Tabs.Screen
        name="ex02"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calculator' : 'calculator-outline'} color={color} size={24}/>
          ),
        }}
      />

      <Tabs.Screen
        name="calculator_app"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calculator' : 'calculator-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
