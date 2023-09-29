import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../assets/images/weather_logo.png";
import { useNavigation } from '@react-navigation/native';
const SplashScreen = () => {
    const edges = useSafeAreaInsets();
    const startAnimation = useRef(new Animated.Value(0)).current;
    const scaleLogo = useRef(new Animated.Value(0)).current;
    const scaleTitle = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    useEffect(() => {
        Animated.sequence([
            Animated.timing(startAnimation, {
                useNativeDriver: true,
                toValue: -Dimensions.get("window").height + (edges.top + 65),
                duration: 1000, // Animasyon süresi
                delay: 1000, // Gecikme süresi
            }),
            Animated.timing(scaleLogo, {
                useNativeDriver: true,
                toValue: 1, // Logo'nun ölçeğini düzeltme
                duration: 1000,
            }),
            Animated.timing(scaleTitle, {
                useNativeDriver: true,
                toValue: 1, // Başlığın ölçeğini düzeltme
                duration: 1000,
            }),
        ]).start(() => {
            navigation.navigate("First");
        });
    }, []);

    return (
        <Animated.View style={[styles.screen, { transform: [{ translateY: 0 }] }]}>
            <Animated.View style={styles.animatedView}>
                <Animated.Image source={Logo} style={[styles.image, { transform: [{ scale: scaleLogo }] }]} />
                <Animated.Text style={[styles.text, { transform: [{ scale: scaleTitle }] }]}>
                    AeroSense
                </Animated.Text>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    screen: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "cyan",
        flex: 1,
    },
    animatedView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 115,
        height: 100,
        borderRadius: 260,
    },
    text: {
        fontSize: 30,
        color: "white",
    },
});

export default SplashScreen;
