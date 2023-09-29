import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./screens/SplashScreen";
import Screens from "./screens/FirstScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
                    <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="First" component={Screens} options={{ headerShown: false }} />
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                   </NavigationContainer>

    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
