import { View, Text } from 'react-native'
import React from 'react'

const ForecastItem = ({ time, temp_c, condition }) => {
    return (
        <View style={{ alignItems: 'center', marginHorizontal: 15 }}>
            <Text>{time}</Text>
            <Image source={{ uri: condition.icon }} style={{ width: 50, height: 50 }} />
            <Text>{temp_c}°C</Text>
        </View>
    );
};

export default ForecastItem