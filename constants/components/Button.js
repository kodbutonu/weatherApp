import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Navigation hook

export default function Button({ text }) {
    const navigation = useNavigation(); // Navigation hook'u kullanarak navigation objesini alın

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
            <View style={styles.button}>
                <Text style={styles.text}>{text.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        paddingHorizontal: 50,
        paddingVertical: 10,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
});
