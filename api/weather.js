import axios from "axios";
import { apiKey } from "../constants";

const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=&q=${params.cityName}`;
const apiCall = async (endpoint) => {
    console.log('Requesting:', endpoint);
    const options = {
        method: 'GET',
        url: endpoint,
    };

    try {
        const response = await axios.request(options);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return {};
    }
}


export const fetchWeatherForecast = params => {
    let forecastUrl = forecastEndpoint(params);
    return apiCall(forecastUrl);
}

export const fetchLocations = params => {
    let locationsUrl = locationsEndpoint(params);
    return apiCall(locationsUrl);
}
