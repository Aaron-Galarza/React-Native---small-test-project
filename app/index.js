// app/index.js
import React, { useState } from 'react'; // Importamos useState
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { useNavigation, Link } from 'expo-router'; // Importamos useNavigation y Link
import { useColorScheme } from 'react-native'; // Importamos useColorScheme
import { destinations } from '../data/destinations'; // Importamos los datos de los destinos
import DestinationCard from '../components/DestinationCard'; // Importamos el componente de tarjeta

export default function HomeScreen() {
  const navigation = useNavigation(); // Inicializamos useNavigation
  const colorScheme = useColorScheme(); // Obtenemos el esquema de color del sistema ('light' o 'dark')

  // Usamos useState para controlar un estado local del tema, aunque useColorScheme detecte el sistema
  // Esto cumple con la práctica del hook useState en esta pantalla, como pediste.
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  // Estilos que cambian según el tema (ejemplo básico)
  const containerStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? '#333' : '#f0f0f0', // Fondo oscuro si isDarkMode es true
    paddingTop: 20, // Pequeño espacio en la parte superior
  };

  const titleStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: isDarkMode ? '#fff' : '#333', // Color de texto según el tema
  };

  const themeToggleContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  };

  const themeTextStyle = {
    marginRight: 10,
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#333',
  };


  return (
    <View style={containerStyle}> {/* Usamos el estilo dinámico */}
      <Text style={titleStyle}>Destinos de Viaje</Text> {/* Usamos el estilo dinámico */}

      {/* Switch para cambiar el estado local del tema */}
      <View style={themeToggleContainerStyle}>
         <Text style={themeTextStyle}>Modo Oscuro:</Text>
         <Switch
           value={isDarkMode}
           onValueChange={(value) => setIsDarkMode(value)}
           // Los colores del Switch también pueden ser dinámicos si quieres
         />
      </View>


      {/* Lista de destinos usando FlatList */}
      <FlatList
        data={destinations} // Los datos a mostrar
        keyExtractor={(item) => item.id} // Clave única para cada elemento
        renderItem={({ item }) => <DestinationCard destination={item} />} // Renderiza cada destino con DestinationCard
      />

      {/* Botón o Link para navegar a la pantalla About */}
      {/* Usamos Link para una navegación sencilla declarativa */}
      <Link href="/about" asChild>
        <TouchableOpacity style={styles.aboutButton}>
          <Text style={styles.aboutButtonText}>Acerca de la App</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  // Algunos estilos generales que no dependen del tema local
  aboutButton: {
    backgroundColor: '#007bff',
    padding: 10,
    margin: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});