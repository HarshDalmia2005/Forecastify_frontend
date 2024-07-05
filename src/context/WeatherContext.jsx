import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { isAxiosError } from 'axios';
import { useAuth } from './AuthContext';

const WeatherContext = createContext();

export const useWeatherContext = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [errorLocation, setErrorLocation] = useState('');
    const [errorWeather, seterrorWeather] = useState('')
    const [errorHourly, seterrorHourly] = useState('')
    const [errorDaily, seterrorDaily] = useState('')
    const [HourWeather, setHourWeather] = useState([])
    const [DailyWeather, setDailyWeather] = useState([])
    const [addError, setaddError] = useState('')
    const { userData } = useAuth()
    const [success, setsuccess] = useState('')
    const [Locations, setLocations] = useState([])
    const [deleted, setdeleted] = useState('')
    const URL = "http://localhost:3000/locations"

    const fetchLocation = async () => {
        try {
            const ipResponse = await axios.get('https://api.ipify.org?format=json');
            const ipAddress = ipResponse.data.ip;
            const locationResponse = await axios.get(`https://ipinfo.io/${ipAddress}/geo`);
            const { city, region, country } = locationResponse.data;
            setLocation(`${city}, ${region}, ${country}`);
        } catch (error) {
            setErrorLocation('Error fetching location data. Please try again later.');
            console.error('Error fetching location data:', error);
        }
    };

    const fetchWeatherData = async (location) => {
        try {

            const apiKey = process.env.apiKey;
            const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: apiKey, // Replace with your WeatherAPI key
                    q: location,
                    days: 1 // Number of days to fetch
                }
            });
            // console.log(response.data)


            // const placeDate = formatDate(data)
            const currentdata = response.data
            const now = new Date();
            const currentHour = now.getHours();

            setWeatherData({
                temperature: (currentdata.current.temp_c).toFixed(0),
                weather: currentdata.current.condition.text,
                humidity: currentdata.current.humidity,
                windSpeed: currentdata.current.wind_kph,
                time: currentdata.location.localtime,
                icon: currentdata.current.condition.icon,
                location: currentdata.location.name,
                feels: (currentdata.current.feelslike_c).toFixed(0),
                rainChances: currentdata.forecast.forecastday[0].hour[currentHour + 1].chance_of_rain
            });
        } catch (error) {
            seterrorWeather('Error fetching weather data. Please try again later.');
            console.error('Error fetching weather data:', error);
        }
    };

    const fetchHourly = async (location) => {
        try {

            const apiKey = process.env.apiKey;
            const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: apiKey,
                    q: location,
                    hours: 4
                }
            });

            const data = response.data;
            // console.log(data)
            const now = new Date();
            const currentHour = now.getHours();

            setHourWeather(response.data.forecast.forecastday[0].hour.slice(currentHour + 1));

        }
        catch (error) {
            seterrorHourly('Error fetching weather data, refresh and try again')
            console.error('Error fetching weather data:', error);
        }
    }

    const fetchDaily = async (location) => {
        try {
            const apiKey = process.env.apiKey;
            const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: apiKey, // Replace with your WeatherAPI key
                    q: location,
                    days: 7 // Number of days to fetch
                }
            });
            // console.log(response.data)

            setDailyWeather(response.data.forecast.forecastday)
        }
        catch (err) {
            seterrorDaily("Error fetching daily data, Refresh and try again")
            console.error('Error fetching daily data', err)
        }
    }

    const sendWeatherData = async (location) => {
        try {

            const apiKey = process.env.apiKey;

            const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: apiKey, // Replace with your WeatherAPI key
                    q: location,
                    days: 1 // Number of days to fetch
                }
            });
            // console.log(response.data)


            // const placeDate = formatDate(data)
            const currentdata = response.data
            const now = new Date();
            const currentHour = now.getHours();

            return {
                temperature: (currentdata.current.temp_c).toFixed(0),
                weather: currentdata.current.condition.text,
                humidity: currentdata.current.humidity,
                windSpeed: currentdata.current.wind_kph,
                time: currentdata.location.localtime,
                icon: currentdata.current.condition.icon,
                location: currentdata.location.name,
                feels: (currentdata.current.feelslike_c).toFixed(0),
                rainChances: currentdata.forecast.forecastday[0].hour[currentHour + 1].chance_of_rain
            };
        } catch (error) {
            seterrorWeather('Error fetching weather data. Please try again later.');
            console.error('Error fetching weather data:', error);
        }
    };

    const addLocation = async (newLocation) => {
        try {
            const weather = await sendWeatherData(newLocation)

            const data = {
                city: newLocation,
                weatherData: weather,
                userId: userData._id
            }
            const response = await axios.post(`${URL}/add`, data)
            // console.log(response)

            setsuccess(response.data.message)

        } catch (err) {
            if (isAxiosError(err)) setaddError(err.response.data.message)
            console.log(err)
        }

    };

    const getLocation = async () => {
        try {
            const response = await axios.get(`${URL}/get/${userData._id}`)
            const recieved=await response.data
            
            const newData=await Promise.all(
                recieved.map(async(loc)=>{
                    const weather=await sendWeatherData(loc.city);
                    return {...loc,weatherData:weather}
                })
            )

            // console.log(newData)
            setLocations(newData)

        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response.data.message)
            }
            console.log(error)
        }
    }

    const deleteLocation = async (id) => {

        try {

            const response = await axios.delete(`${URL}/delete/${id}`)
            // console.log(response)
            setdeleted(response.data.message)

        } catch (err) {
            if (isAxiosError(err)) {
                console.log(err)
                setdeleted(err.response.data.message)
            }
        }
    }



    useEffect(() => {
        fetchLocation();
        // console.log(userData)
    }, []);

    useEffect(() => {
        if (location) {
            fetchWeatherData(location);
            fetchHourly(location);
            fetchDaily(location);
        }
    }, [location]);




    return (
        <WeatherContext.Provider value={{
            location, setLocation, weatherData,
            errorLocation, errorWeather, errorDaily,
            errorHourly, fetchWeatherData,
            fetchHourly, HourWeather, setHourWeather, DailyWeather,
            fetchDaily, addLocation, addError, setaddError, success,
            setsuccess, getLocation, Locations, deleteLocation,
            deleted,setdeleted,sendWeatherData,setLocations
        }}>
            {children}
        </WeatherContext.Provider>
    );
};
