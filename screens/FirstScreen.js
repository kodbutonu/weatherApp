import React, { Component } from 'react';
import {
    StyleSheet,   // CSS-like styles
    Text,         // Renders text
    View          // Container component
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from '../constants/components/Swiper';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default class Screens extends Component {
    render() {
        return (
            <Swiper>
                {/* First screen */}
                <View style={[styles.slide, { backgroundColor: 'cyan' }]}>
                    <Ionicons name="information-circle-outline" size={54} color="white" />
                    <Text style={styles.header}>İnformation</Text>
                    <Text style={styles.text}>Follow current weather information and always be prepared.</Text>
                </View>
                {/* Second screen */}
                <View style={[styles.slide, { backgroundColor: 'lightgreen' }]}>
                    <MaterialCommunityIcons name="weather-cloudy" size={54} color="white" />
                    <Text style={styles.header}>Forecast</Text>
                    <Text style={styles.text}>Plan your daily routine with accurate weather forecasts.</Text>
                </View>
                {/* Third screen */}
                <View style={[styles.slide, { backgroundColor: 'yellow' }]}>
                    <Ionicons name="umbrella-outline" size={54} color="white" />
                    <Text style={styles.header}>Right</Text>
                    <Text style={styles.text}>Our weather app always guides you for your outdoor activities.</Text>
                </View>
            </Swiper>
        );
    }
}

const iconStyles = {
    size: 100,
    color: '#FFFFFF',
};

const styles = StyleSheet.create({
    // Slide styles
    slide: {
        flex: 1,                    // Take up all screen
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally
    },
    // Header styles
    header: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    // Text below header
    text: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
    },
});

