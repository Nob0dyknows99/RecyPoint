import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ navigation }) {
  const markers = [
    { title: 'Punto de reciclaje 1', latitude: -33.4569, longitude: -70.6483 },
    { title: 'Punto de reciclaje 2', latitude: -33.457, longitude: -70.6486 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Puntos cercanos</Text>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: -33.4569,
          longitude: -70.6483,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            onPress={() => navigation.navigate('Ir a', { location: marker })}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E9EF',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  map: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
});
