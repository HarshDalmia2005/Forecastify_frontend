import React from 'react';
import { useWeatherContext } from '../context/WeatherContext';
import { humid, temperature, weather, winds } from '../utils/icons';
import Alert from './Alert';

const CurrentLocationData = () => {
    const { weatherData, errorWeather} = useWeatherContext();

    if (!weatherData || errorWeather){
        return <Alert error={errorWeather}/>
    };

    return (
        <div className="current-location-data w-full mx-10">
            <div className="current flex justify-between mt-5">
                <div className="left mx-10">
                    <h2 className='text-3xl font-bold text-white'>{weatherData.location}</h2>
                    <p className='text-white'>{weatherData.time}</p>
                    <p className='text-gray-300'>Chances of rain: {weatherData.rainChances} %</p>
                    <p className='mt-20 text-6xl font-bold text-white'>{weatherData.temperature} °C</p>
                </div>
                <img
                    src={weatherData.icon}
                    alt="weather"
                    className='w-[25%]'
                />
            </div>
            <div className="data bg-gray-500 bg-opacity-50 rounded-2xl p-6 mt-7 ">
                <h2 className='ml-2 text-gray-300 text-sm font-semibold'>WEATHER CONDITIONS</h2>
                <div className='flex space-x-48 mt-5'>
                    <div className='space-y-10 mx-5'>
                        <div className='flex flex-col'>
                            <p className='text-lg space-x-2 text-gray-300'>{weather} Weather </p>
                            <p className='font-bold text-xl ml-7 text-white'>{weatherData.weather}</p>
                        </div>

                        <div className='flex flex-col'>
                            <p className='text-lg space-x-2 text-gray-300'>{humid} Humidity </p>
                            <p className='font-bold text-2xl ml-7 text-white'>{weatherData.humidity}%</p>
                        </div>
                    </div>
                    <div className='space-y-10'>
                        <div className='flex flex-col'>
                            <p className='text-lg space-x-2 text-gray-300'>{winds} Wind Speed  </p>
                            <p className='font-bold text-2xl ml-7 text-white'>{weatherData.windSpeed} km/h</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-lg space-x-2 text-gray-300'>{temperature} Feels like </p>
                            <p className='font-bold text-2xl ml-7 text-white'>{weatherData.feels} °C</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CurrentLocationData;
