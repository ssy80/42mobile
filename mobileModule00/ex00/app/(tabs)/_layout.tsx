import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import "nativewind";
import { Appbar, Searchbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <View style={styles.container}>
            
      {/* AppBar */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Calculator" titleStyle={styles.appBarTitleStyle} />
      </Appbar.Header>
        
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffd33d',
          headerShown: false,
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

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appBar: {
        backgroundColor: '#000000',
    },
    appBarTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center'
    },
  });