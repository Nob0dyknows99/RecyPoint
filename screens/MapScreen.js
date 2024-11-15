import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { getPuntosLimpios } from '../http/index';
import MapComponent from '../components/MapComponent';

const MapScreen = () => {
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

    (async () => {
      const puntos = await getPuntosLimpios();
      setPuntosLimpios(puntos);
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
      alert('No se pudo obtener la ubicación del usuario');
    }
  };

  const openGoogleMaps = (latitude, longitude) => {
    const url = `http://maps.google.com/maps?q=${parseFloat(latitude)},${parseFloat(longitude)}`;
    Linking.openURL(url).catch(err => console.error('Error al abrir URL:', err));
  };

  return (
    <View style={styles.container}>
      <Header />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    marginTop: 95,
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 20,
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
});

export default MapScreen;
