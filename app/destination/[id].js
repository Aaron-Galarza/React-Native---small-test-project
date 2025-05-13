// app/destination/[id].js
import React, { useEffect } from 'react'; // Importamos useEffect (aunque no lo usaremos para cargar datos estáticos, es bueno importarlo para mostrar su uso si fuera necesario)
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation, useFocusEffect, useRoute } from 'expo-router'; // Importamos los hooks de Expo Router
import { destinations } from '../../data/destinations'; // Importamos los datos de los destinos (ajusta la ruta si es necesario)
import { useCallback } from 'react'; // Importamos useCallback para useFocusEffect

export default function DestinationDetailScreen() {
  // ** useLocalSearchParams: Lee los parámetros de la URL **
  // Aquí obtenemos el 'id' que pasamos desde la DestinationCard
  const { id } = useLocalSearchParams();

  // ** useNavigation: Para la navegación programática **
  const navigation = useNavigation();

  // ** useRoute: Información sobre la ruta actual **
  // Aunque useLocalSearchParams es más directo para parámetros,
  // useRoute te da acceso a más información de la ruta si la necesitas
  const route = useRoute();
  console.log('Información de la ruta actual:', route); // Puedes ver esto en la consola de desarrollo

  // Encontrar el destino basado en el ID
  // Para datos estáticos como este, puedes hacerlo directamente aquí
  const destination = destinations.find(dest => dest.id === id);

  // Si el destino no se encuentra (por ejemplo, si alguien escribe una URL inválida)
  if (!destination) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Destino no encontrado.</Text>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
      </View>
    );
  }

  // ** useFocusEffect: Ejecuta código cuando la pantalla se enfoca **
  // Esto es útil para actualizar datos, mostrar mensajes, etc.,
  // cuando el usuario vuelve a esta pantalla.
  useFocusEffect(
    // Usamos useCallback para memorizar la función de efecto
    // Esto evita que el efecto se ejecute innecesariamente si las dependencias no cambian
    useCallback(() => {
      console.log(`¡Pantalla de ${destination.name} enfocada!`);
      // Puedes mostrar un mensaje o cargar datos aquí
      Alert.alert('¡Bienvenido!', `¡Bienvenido a ${destination.name}!`);

      // Opcional: función de limpieza (se ejecuta cuando la pantalla pierde el foco o se desmonta)
      return () => {
        console.log(`Saliendo de la pantalla de ${destination.name}.`);
        // Por ejemplo, podrías cancelar suscripciones o limpiar temporizadores aquí
      };
    }, [destination]) // La dependencia es 'destination'. El efecto se re-ejecutará si el destino cambia (aunque en este caso es estático)
  );


  return (
    <ScrollView style={styles.scrollViewContainer}> {/* Usamos ScrollView por si el contenido es largo */}
      <View style={styles.container}>
        <Image source={destination.image} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{destination.name}</Text>
          <Text style={styles.description}>{destination.description}</Text>

          {/* ** useNavigation: Botón para volver a la pantalla anterior ** */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Volver a la lista</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 20, // Espacio en la parte inferior al final del scroll
  },
  image: {
    width: '100%',
    height: 250, // Altura más grande para la imagen de detalle
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: -50, // Para que la caja de info se superponga un poco a la imagen
    borderRadius: 10,
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '95%', // Ocupa casi todo el ancho con margen
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
   backButton: {
    backgroundColor: '#6c757d', // Un gris
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});