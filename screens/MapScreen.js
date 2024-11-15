import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { getPuntosLimpios } from '../http/index';

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
      console.log('Puntos Limpios obtenidos:', puntos); 
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
      alert("No se pudo obtener la ubicación del usuario");
    }
  };

  if (!mapRegion.latitude || !mapRegion.longitude) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={mapRegion}
          showsUserLocation={true}
          onRegionChangeComplete={(region) => setMapRegion(region)}
        >
          {puntosLimpios.length > 0 ? (
            puntosLimpios.map((punto) => (
              <Marker
                key={punto.id}
                coordinate={{ latitude: parseFloat(punto.Latitud), longitude: parseFloat(punto.Longitud) }}
                title={punto.nombre || 'Punto Limpio'}
              />
            ))
          ) : (
            console.log('No hay puntos para mostrar')
          )}
        </MapView>
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
});

export default MapScreen;
