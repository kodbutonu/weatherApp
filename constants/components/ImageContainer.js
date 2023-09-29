import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const ImageContainer = (props) => {
    const [fillAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        fillAnimation.setValue(0); // Animasyon değerini sıfırla
        Animated.timing(fillAnimation, {
            toValue: 1,
            duration: 1000, // Animasyon süresi (milisaniye cinsinden)
            useNativeDriver: false,
        }).start();
    }, [props.imageSource]);

    const fillStyle = {
        width: fillAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200], // İçi dolacak genişlik değeri
        }),
    };

    return (
        <View style={styles.border}>
            <Animated.View style={[styles.fill, fillStyle]}>
                <Image source={props.imageSource} style={styles.image} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    border: {
        borderWidth: 2,
        borderColor: 'white',
        height:50,
        width:50,
        borderRadius:30
    },
    fill: {
        overflow: 'hidden',
    },
    image:{
        marginTop:5,
        marginLeft:5
    }
});

export default ImageContainer;
