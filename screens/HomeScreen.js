import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen() {
  const markers = [
    { title: 'Punto limpio 1', latitude: -33.4569, longitude: -70.6483 },
    { title: 'Punto limpio 2', latitude: -33.457, longitude: -70.6486 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RecyPoint</Text>
      <Text style={styles.subheader}>¡Bienvenido!</Text>
      <View style={styles.mapContainer}>
        <Text style={styles.mapText}>Puntos limpios cercanos</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -33.4569,
            longitude: -70.6483,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          scrollEnabled={false} // Hace que el mapa no se pueda mover, para parecer una imagen
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
            />
          ))}
        </MapView>
      </View>
      <Text style={styles.description}>
        Reciclar es un pequeño acto con un gran impacto. Al separar nuestros residuos correctamente, reducimos la contaminación.
      </Text>
      <Text style={styles.footer}>
        Cada material reciclado cuenta para cuidar el planeta!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E6E9EF'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  mapContainer: {
    backgroundColor: '#D3D3D3',
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    position: 'absolute',
    top: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  footer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  }
});
