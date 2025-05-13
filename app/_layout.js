// app/_layout.js (ejemplo del template)
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Aquí se definen las configuraciones de pantalla,
          las rutas basadas en archivos generalmente se cargan automáticamente */}
      {/* Por ejemplo, para ocultar el header en la pantalla principal: */}
       <Stack.Screen name="index" options={{ headerShown: false }} />
       {/* Otras pantallas o grupos se manejarían aquí si no fueran la raíz */}
       <Stack.Screen name="destination/[id]" options={{ title: 'Detalle del Destino' }} />
       <Stack.Screen name="about" options={{ title: 'Acerca de la App' }} />

    </Stack>
  );
}