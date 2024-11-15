import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import * as Location from 'expo-location';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import MapComponent from '../components/MapComponent';
import { getPuntosLimpios } from '../http/index';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: -33.4489,
    longitude: -70.6693,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [puntosLimpios, setPuntosLimpios] = useState([]);

  useEffect(() => {
    (async () => {
      // Solicitar permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso para acceder a la ubicación fue denegado');
        return;
      }

      // Obtener ubicación del usuario
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      // Actualizar región del mapa
      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      }));
    })();

    // Obtener puntos limpios desde el backend
    (async () => {
      const puntos = await getPuntosLimpios();
      setPuntosLimpios(puntos);
    })();
  }, []);

  const centerMapOnUserLocation = () => {
    if (location) {
      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    } else {
      alert('No se pudo obtener la ubicación del usuario');
    }
  };

  const openGoogleMaps = (latitude, longitude) => {
    const url = `http://maps.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error('Error al abrir URL:', err));
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.subtitle}>¡Bienvenido!</Text>
        <View style={styles.mapContainer}>
          <MapComponent
            region={mapRegion}
            puntosLimpios={puntosLimpios}
            onRegionChange={setMapRegion}
            openGoogleMaps={openGoogleMaps}
          />
          <TouchableOpacity style={styles.gpsButton} onPress={centerMapOnUserLocation}>
            <Ionicons name="locate" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          Reciclar es un pequeño acto con un gran impacto. Al separar nuestros residuos correctamente reducimos la contaminación.
        </Text>
        <Text style={styles.highlightText}>¡Cada material reciclado cuenta para cuidar al planeta!</Text>
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
    marginTop: 70,
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
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
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
