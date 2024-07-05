import React from 'react'
import './daily.css'
import { useWeatherContext } from '../context/WeatherContext'
import { humid, temperature, weather, winds } from '../utils/icons'
import Alert from './Alert'
const DailyWeather = () => {
    const { DailyWeather,errorDaily } = useWeatherContext()
     
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    function getDayName(dateString) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today=new Date()
        const date = new Date(dateString);
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else {
            const dayIndex = date.getDay(); // Returns 0 (Sunday) through 6 (Saturday)
            return daysOfWeek[dayIndex];
        }
    }

    if(errorDaily){
        return <Alert error={errorDaily}/>
    }
    return (
        <div className='w-full bg-gray-500 bg-opacity-50 rounded-2xl p-6 mx-20 my-14'>
            <h2 className='ml-4 text-gray-300 text-sm font-semibold'>7 DAYS FORECAST</h2>
            <div className="daily-card">
                {DailyWeather.map((data, index) => {
                    return <div key={index} className="weather-card mt-5 bg-gray-700 bg-opacity-50 rounded-2xl py-2">
                        <div className='flex justify-center items-center'>
                            <p className='text-xl font-bold text-gray-300 mr-3'>{getDayName(data.date)}</p>
                            <img
                                src={data.day.condition.icon}
                                alt="Weather Icon"
                            />
                        </div>
                        <div className='flex justify-between mx-7 mb-3'>
                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{weather} Weather</p>
                                <p className='font-bold text-lg ml-4 text-white'>{data.day.condition.text}</p>
                            </div>
                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{temperature} Temperature</p>
                                <p className='font-bold text-lg ml-4 text-white'>{data.day.avgtemp_c}°C</p>
                            </div>
                        </div>
                        <div className='flex justify-between mx-7'>
                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{humid} Humidity</p>
                                <p className='font-bold text-lg ml-4 text-white'>{data.day.avghumidity}%</p>
                            </div>
                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{winds} Wind Speed</p>
                                <p className='font-bold text-lg ml-4 text-white'>{data.day.maxwind_kph} kph</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div >
    )
}

export default DailyWeather