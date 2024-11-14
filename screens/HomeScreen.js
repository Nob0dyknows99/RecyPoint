import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: -33.4489,
    longitude: -70.6693,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso para acceder a la ubicación fue denegado');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setMapRegion({
        ...mapRegion,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    })();
  }, []);

  const centerMapOnUserLocation = () => {
    if (location) {
      setMapRegion({
        ...mapRegion,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } else {
      alert("No se pudo obtener la ubicación del usuario");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.subtitle}>¡Bienvenido!</Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={mapRegion}
            showsUserLocation={true}
            onRegionChangeComplete={(region) => setMapRegion(region)}
          >
            {/* Marcadores de ejemplo */}
            <Marker coordinate={{ latitude: -33.4489, longitude: -70.6693 }} title="Punto de Reciclaje 1" />
            <Marker coordinate={{ latitude: -33.4569, longitude: -70.6483 }} title="Punto de Reciclaje 2" />
          </MapView>
          <TouchableOpacity style={styles.gpsButton} onPress={centerMapOnUserLocation}>
            <Ionicons name="locate" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          Reciclar es un pequeño acto con un gran impacto. Al separar nuestros residuos correctamente reducimos la contaminación.
        </Text>
        <Text style={styles.highlightText}>Cada material reciclado cuenta para cuidar al planeta!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 70, // Margen superior para evitar que el contenido quede debajo del header
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    marginTop: 20,
    width: '100%',
    height: 450,
    borderRadius: 15, // Radio para redondear las esquinas del mapa
    overflow: 'hidden', // Oculta cualquier parte del mapa que sobresalga del borde redondeado
    marginBottom: 20,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  gpsButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'green',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  highlightText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
});

export default HomeScreen;
