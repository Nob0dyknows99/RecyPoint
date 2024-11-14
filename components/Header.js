import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>RecyPoint</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        backgroundColor: '#87CEEB',
        paddingVertical: 15, // Ajusta el valor para cambiar la altura
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    title: {
        top: 10,
        padding: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
  });
  

export default Header;
