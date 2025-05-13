// components/DestinationCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router'; // Importamos useNavigation

const DestinationCard = ({ destination }) => {
  const navigation = useNavigation(); // Inicializamos el hook

  const handlePress = () => {
    // Navega a la pantalla de detalles usando el ID del destino
    navigation.navigate('destination', { id: destination.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={destination.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.description}>{destination.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    overflow: 'hidden', // Para que la imagen no se salga de los bordes redondeados
  },
  image: {
    width: '100%', // Ocupa todo el ancho de la tarjeta
    height: 150, // Altura fija de la imagen
    resizeMode: 'cover', // Asegura que la imagen cubra el área
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default DestinationCard;