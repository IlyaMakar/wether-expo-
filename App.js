import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import Loading from './Loading';
import Weather from './Weather';
import axios from 'axios';


const API_KEY = 'ac47238fe11bad08088c703a2ff9eccf'

export default class extends React.Component {
 
  state = {
    isLoading: true
  }

  getWether = async (latitude, longitude) => {
    const {date} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    this.setState({isLoading: false, temp: date.temp});
    console.log(date);
  }

  getLocation = async () => {
  try {
    await Location.requestForegroundPermissionsAsync();
    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
    this.getWether(latitude, longitude);
  } catch (error) {
    Alert.alert('Не могу определить геопозицию', 'Очень грустно :(');
  }
 
 }
 
 
  componentDidMount() {
  this.getLocation();
 }
 
  render (){
    const {isLoading, temp} = this.state;
  return (
    isLoading ? <Loading /> : <Weather temp={temp} />
 )}
}



