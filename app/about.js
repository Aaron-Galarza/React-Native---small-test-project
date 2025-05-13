// app/about.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font'; // Importamos useFonts
import { Link } from 'expo-router'; // Importamos Link para volver

export default function AboutScreen() {
  // ** useFonts: Carga fuentes personalizadas **
  // Intentamos cargar una o más fuentes.
  // loadFonts es un booleano que indica si las fuentes han terminado de cargar.

// ... dentro de tu componente
const [fontsLoaded] = useFonts({
'BebasNeue': require('../assets/BebasNeue-Regular.ttf'), // Ruta si está directamente en assets
// ... otras fuentes si las tienes
});
// ...

  // Mientras las fuentes se están cargando, podemos mostrar un indicador o null
  if (!fontsLoaded) {
    // Opcional: Mostrar un indicador de carga si tarda mucho
    return null; // O <Text>Cargando fuente...</Text>
  }

  // Si las fuentes se cargaron, mostramos el contenido de la pantalla
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de Mini App de Viajes</Text>
      {/* Usamos la fuente personalizada en este texto */}
      <Text style={[styles.infoText, { fontFamily: 'CustomFont' }]}>
        Esta es una mini aplicación de viajes creada para practicar los hooks de React Native con Expo Router.
      </Text>
       <Text style={styles.infoText}>
        Explora diferentes destinos y aprende sobre el desarrollo móvil.
      </Text>

      {/* Botón para volver a la pantalla principal */}
      <Link href="/" asChild>
        <TouchableOpacity style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Ir a la lista de destinos</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Centra contenido verticalmente
    alignItems: 'center', // Centra contenido horizontalmente
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
    // Aquí el fontFamily se aplica directamente en línea para combinarlo con el estilo base
  },
   homeButton: {
    backgroundColor: '#007bff', // Un azul
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});