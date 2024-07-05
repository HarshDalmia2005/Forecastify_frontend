import React from 'react'
import { useWeatherContext } from '../context/WeatherContext'
import { humid, temperature, uv, weather, winds } from '../utils/icons'
import './hourly.css'
import Alert from './Alert'

const Hourlyweather = () => {

    const { HourWeather, errorHourly } = useWeatherContext()

    if (errorHourly) return <Alert error={errorHourly} />

    const convertToAmPm = (time) => {
        let hours = parseInt(time.slice(11, 13), 10);
        let minutes = time.slice(-2);
        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Handle midnight (0 hours)
        return `${hours}:${minutes} ${period}`;
    };

    return (
        <div className='bg-gray-500 bg-opacity-50 rounded-2xl p-6 mt-7 w-full mx-10'>
            <h1 className='ml-4 text-gray-300 text-sm font-semibold'>TODAY'S FORECAST</h1>
            <div className="weather-grid flex space-x-7 w-full justify-between mt-5">
                {HourWeather.map((data, index) => {
                    return <div key={index} className="weather-card min-w-max space-y-3 rounded-2xl bg-gray-700 px-10 py-5 bg-opacity-50">
                        <div className='flex justify-center'>
                            <p className='text-xl font-bold text-gray-300 mb-3 mr-2'>{convertToAmPm(data.time)}</p>
                            <img
                                src={data.condition.icon}
                                alt="Weather Icon"
                            />
                        </div>
                        <div>
                            <p className='text-sm space-x-2 text-gray-300'>{weather} Weather</p>
                            <p className='font-bold text-lg ml-4 text-white'>{data.condition.text}</p>
                        </div>
                        <div>
                            <p className='text-sm space-x-2 text-gray-300'>{temperature} Temperature</p>
                            <p className='font-bold text-lg ml-4 text-white'>{(data.temp_c).toFixed(0)}°C</p>
                        </div>
                        <div>
                            <p className='text-sm space-x-2 text-gray-300'>{humid} Humidity </p>
                            <p className='font-bold text-lg ml-4 text-white'>{data.humidity}%</p>
                        </div>
                        <div>
                            <p className='text-sm space-x-2 text-gray-300'>{winds} Wind Speed</p>
                            <p className='font-bold text-lg ml-4 text-white'>{data.wind_kph} km/h</p>
                        </div>
                        <div>
                            <p className='text-sm space-x-2 text-gray-300'>{uv} Uv Index</p>
                            <p className='font-bold text-lg ml-4 text-white'>{data.uv}</p>
                        </div>

                    </div>
                })}
            </div>
        </div>
    )
}

export default Hourlyweather