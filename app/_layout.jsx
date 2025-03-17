import { Stack } from "expo-router";
import CardsProvider from "@/context/CardContext";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";

export default function Layout() {
  const [loaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <CardsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Cardx", headerShown: false }}
        />
        <Stack.Screen
          name="Cards/[cardID]"
          options={{ title: "Task Details", headerShown: false }}
        />
      </Stack>
    </CardsProvider>
  );
}
