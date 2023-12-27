import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { fetchWeatherForecast, fetchLocations } from '../api/weather';
import { debounce } from 'lodash';
import { weatherImages } from '../constants';
import ImageContainer from '../constants/components/ImageContainer';
import 'expo-dev-client'

const HomeScreen = () => {
  const [city, setCity] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = useCallback(
    debounce(async (value) => {
      if (value.length > 2) {
        setLoading(true);
        const data = await fetchLocations({ cityName: value });
        setLocations(data);
        setLoading(false);
      } else {
        setLocations([]);
      }
    }, 1200),
    []
  );

  const handleLocation = async (loc) => {
    setLoading(true);
    setLocations([]);
    const data = await fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    });
    setWeatherData(data);
    setLoading(false);
  };

  const handleCitySearch = async () => {
    if (searchValue) {
      setLoading(true);
      const data = await fetchWeatherForecast({
        cityName: searchValue,
        days: '3',
      });
      setWeatherData(data);
      setLoading(false);
      console.log(setWeatherData)
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.backgroundImage}
        blurRadius={70}
        source={require('../assets/images/b.png')}
      >
        <View style={styles.searchBar}>
          <TextInput
            onChangeText={(text) => {
              setSearchValue(text);
              handleSearch(text);
            }}
            value={searchValue}
            textAlign="start"
            placeholder="Şehir Ara"
            placeholderTextColor="lightgray"
            style={styles.searchBarInput}
          />
          <TouchableOpacity style={styles.touchable} onPress={handleCitySearch}>
            <AntDesign name="search1" size={24} color={searchValue ? 'white' : 'white'} />
          </TouchableOpacity>
        </View>
        {weatherData && (
          <View style={styles.weatherContainer}>
            <ImageBackground
              source={weatherImages[weatherData.current.condition.text]}
              style={styles.weatherImage}
            >
              <View style={styles.design}>
                <View style={styles.description}>
                  <ImageContainer imageSource={require('../assets/images/rüzgars.png')} />
                  <Text style={styles.weatherText}>{weatherData.current.wind_mph}km</Text>
                  <Text style={styles.weatherCon}>Windy</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.temperature}>{weatherData.current.feelslike_c}°</Text>
                  <Text style={styles.weatherConditionn}>{weatherData.location.name}</Text>
                </View>
                <View style={styles.descriptionn}>
                  <ImageContainer imageSource={require('../assets/images/rainy-daya.png')} style={styles.img} />
                  <Text style={styles.weatherCondition}>{weatherData.current.condition.text}</Text>
                </View>

              </View>
              <View style={styles.ask}>
                <View style={styles.icon}>
                  <Image source={require('../assets/images/cloudlywe.png')} />
                  <Text style={styles.weatherCondition}>Air Quality</Text>
                </View>
                <View style={styles.icon}>
                  <View style={styles.co}>
                    <Image source={require('../assets/images/pressure.png')} />
                    <View>
                      <Text style={styles.weatherCondition}>Pressure</Text>
                      <Text style={styles.weatherCondition}>{weatherData.current.pressure_in}</Text>
                    </View>

                  </View>
                  <View style={styles.co}>
                    <Image source={require('../assets/images/cloudlywe.png')} />
                    <View>
                      <Text style={styles.weatherCondition}>Feels Like</Text>
                      <Text style={styles.weatherCondition}>{weatherData.current.feelslike_c}°</Text>
                    </View>

                  </View>
                  <View style={styles.co}>
                    <Image source={require('../assets/images/cloudlywe.png')} />
                    <View>
                      <Text style={styles.weatherCondition}>Uv</Text>
                      <Text style={styles.weatherCondition}>{weatherData.current.uv}</Text>
                    </View>

                  </View>
                </View>
                <View style={styles.icon}>
                  <View style={styles.co}>
                    <Image source={require('../assets/images/tornado.png')} />
                    <View>
                      <Text style={styles.weatherCondition}>Visibility</Text>
                      <Text style={styles.weatherCondition}>{weatherData.current.vis_km}km</Text>
                    </View>

                  </View>
                  <View style={styles.co}>
                    <Image source={require('../assets/images/lowvisib.png')} />
                    <View>
                      <Text style={styles.weatherCondition}>Gust</Text>
                      <Text style={styles.weatherCondition}>{weatherData.current.gust_kph}km</Text>
                    </View>

                  </View>
                  <View style={styles.co}>
                    <Image source={require('../assets/images/humidity.png')} />
                    <View>
                      <Text style={styles.weatherCondition}>Humidity</Text>
                      <Text style={styles.weatherCondition}>%{weatherData.current.humidity}</Text>
                    </View>

                  </View>
                </View>
              </View>
              <View className="mb-2 space-y-3">
                <View className="flex-row items-center mx-5 space-x-2" style={{ marginTop: 20, borderRadius: 20, borderWidth: 3, borderColor: 'white', marginLeft: 55, marginRight: 30, justifyContent: 'center', height: 180 }}>
                  <Text className="text-white text-base" style={styles.weatherConditio}>Daily Weather</Text>

                  <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    showsHorizontalScrollIndicator={false}
                  >
                    {weatherData?.forecast?.forecastday?.map((item, index) => {
                      const date = new Date(item.date);
                      const options = { weekday: 'long' };
                      let dayName = date.toLocaleDateString('en-US', options);
                      dayName = dayName.split(',')[0];

                      return (
                        <View
                          key={index}
                          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                          style={{ width: 200, height: 200, marginTop: 20 }}
                        >

                          <Image
                            source={{ uri: 'https:' + item?.day?.condition?.icon }}
                            style={{ width: 64, height: 64 }}
                          />
                          <Text className="text-white" style={styles.weatherConditio}>{dayName}</Text>
                          <Text className="text-white text-xl font-semibold" style={styles.weatherConditio}>
                            {item?.day?.avgtemp_c}&#176;
                          </Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>

            </ImageBackground>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  design: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    height: 200
  },
  co: {
    display: 'flex',
    flexDirection: 'row'
  },
  icon: {
    marginTop: 10,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    height: 'auto',
    marginRight: 10
  },
  iconimg: {
    marginRight: 100
  },
  description: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 40,
    width: 200
  },
  locationContainer: {
    backgroundColor: 'gray',
    maxHeight: 100,
    height: 100,
    width: 200
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 1,
  },
  locationItemBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    height: 180
  },
  ask: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 60,
    borderWidth: 2,
    height: 200,
    width: 300,
    borderRadius: 20,
    borderColor: 'white'

  },
  descriptionn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginTop: 20,
    width: 120,
    marginRight: 15
  },
  locationText: {
    color: 'black',
    fontSize: 12,
    marginLeft: 8,
  },
  container: {
    flex: 1,

  },
  location: {
    backgroundColor: 'gray',
    height: 100,
    width: 100
  },
  backgroundImage: {
    flex: 1,
  },

  searchBarInput: {
    borderRadius: 5,


  },
  searchBar: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 40,
    marginRight: 40,
    paddingHorizontal: 16,
    paddingTop: 10,
    textAlign: 'left',
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',

  },
  touchable: {
    height: 30,
    width: 50,
    marginLeft: 199,
    borderRadius: 5
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: 50,
  },
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 50,
    textAlign: 'center'
  },
  weatherText: {
    marginTop: 5,
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  weatherCon: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'italic',
    alignItems: 'center',
    marginLeft: 6

  },
  weatherImage: {

    borderColor: 'white',
    borderRadius: 20,
    width: 390,
    height: 710,
  },
  weatherCondition: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center'
  },
  weatherConditio: {
    fontSize: 16,
    color: 'white',
    marginLeft: 20,
    marginTop: 5


  },
  weatherConditionn: {
    fontSize: 26,
    color: 'white',
    marginBottom: 40,
    marginRight: 10
  },
  temperature: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
export default HomeScreen;