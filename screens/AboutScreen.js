import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/Header';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="RecyPoint" />
      <Text style={styles.subtitle}>¡Bienvenido a RecyPoint!</Text>
      <Text style={styles.text}>
        Tu aliado para encontrar puntos de reciclaje cercanos de manera fácil y rápida. Con nuestra app, puedes localizar centros de reciclaje en tiempo real, obtener direcciones precisas.
      </Text>
      <Text style={styles.highlightText}>
        ¡Haz del reciclaje un hábito cotidiano y contribuye a un futuro más sostenible con RecyPoint!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 110,
  },
  subtitle: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 170,
    width: 360,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#666',
    marginBottom: 150,
    width: 360,
    justifyContent: 'center',
  },
  highlightText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
    width: 360,
  },
});

export default AboutScreen;
