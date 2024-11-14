import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import AboutScreen from './screens/AboutScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Oculta el header en la parte superior
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Mapa') {
              iconName = 'map';
            } else if (route.name === 'Nosotros') {
              iconName = 'information-circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Tab.Screen name="Mapa" component={MapScreen} options={{ title: 'Mapa' }} />
        <Tab.Screen name="Nosotros" component={AboutScreen} options={{ title: 'Nosotros' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
