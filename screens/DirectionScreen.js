import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DirectionScreen({ route }) {
  const { location } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deseo ir a:</Text>
      <Text style={styles.address}>{location.title}</Text>
      <Button title="Ir" onPress={() => alert(`Navegando a ${location.title}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 10 },
  address: { fontSize: 16, marginBottom: 20 },
});
