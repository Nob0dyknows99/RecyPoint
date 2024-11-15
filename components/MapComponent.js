import React from 'react';
import { StyleSheet, Linking, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const MapComponent = ({ region, puntosLimpios, onRegionChange, openGoogleMaps }) => {
  return (
    <MapView
      style={styles.map}
      region={region}
      showsUserLocation={true}
      onRegionChangeComplete={onRegionChange}
    >
      {puntosLimpios.length > 0 ? (
        puntosLimpios.map((punto) => (
          <Marker
            key={punto.id}
            coordinate={{ latitude: parseFloat(punto.Latitud), longitude: parseFloat(punto.Longitud) }}
            title={punto.nombre || 'Punto Limpio'}
          >
            <Callout onPress={() => openGoogleMaps(punto.Latitud, punto.Longitud)}>
              <View style={styles.popup}>
                <Text style={styles.popupTitle}>{punto.nombre}</Text>
                <Text style={styles.popupButtonText}>Ir</Text>
              </View>
            </Callout>
          </Marker>
        ))
      ) : null}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  popup: {
    alignItems: 'center',
    width: 150,
  },
  popupTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  popupButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default MapComponent;
