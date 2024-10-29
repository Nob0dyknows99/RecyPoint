import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import AboutScreen from './screens/AboutScreen';
import DirectionScreen from './screens/DirectionScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio" // Asegura que "Inicio" sea la pantalla inicial
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Mapa') iconName = 'map';
            else if (route.name === 'Inicio') iconName = 'home';
            else if (route.name === 'Nosotros') iconName = 'information-circle';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Nosotros" component={AboutScreen} />

        {/* Pantalla de navegación oculta */}
        <Tab.Screen 
          name="Ir a" 
          component={DirectionScreen} 
          options={{ tabBarButton: () => null }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
