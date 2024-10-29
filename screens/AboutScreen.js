import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>RecyPoint</Text>
      <Text style={styles.subheader}>¡Bienvenido!</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          ¡Bienvenido a RecyPoint! Tu aliado para encontrar puntos de reciclaje cercanos de manera fácil y rápida. Con nuestra app, puedes localizar centros de reciclaje en tiempo real, obtener direcciones precisas.
        </Text>
        <Text style={styles.footer}>
          ¡Haz del reciclaje un hábito cotidiano y contribuye a un futuro más sostenible con RecyPoint!
        </Text>
      </View>
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
  descriptionContainer: {
    backgroundColor: '#D3D3D3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
});
