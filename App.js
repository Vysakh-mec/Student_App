import "react-native-gesture-handler"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screen/HomeScreen"
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {

  const Stack = createStackNavigator()

  const [isAppReady, setIsAppReady] = useState(false)

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync()

        await Font.loadAsync({
          'Montserrat_400': require("./assets/fonts/Montserrat-400.ttf"),
          'Montserrat_500': require("./assets/fonts/Montserrat-500.ttf"),
          'Montserrat_600': require("./assets/fonts/Montserrat-600.ttf"),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setIsAppReady(true)
      }
    }

    prepareApp()
  }, [])

  if (isAppReady) {
    SplashScreen.hideAsync()
  } else {
    return null;
  }

  return (
    <GestureHandlerRootView>

      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
