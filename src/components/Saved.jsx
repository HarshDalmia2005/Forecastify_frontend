import React, { useEffect } from 'react'
import Slider from 'react-slick'
import { useWeatherContext } from '../context/WeatherContext';
import { humid, temperature, trash, umbrella, uv, weather, winds } from '../utils/icons';
import './saved.css'

const Saved = () => {

    const { Locations, getLocation, deleteLocation, deleted, setdeleted, setLocations ,sendWeatherData, success} = useWeatherContext()

    const handleDelete = (e, id) => {
        // console.log("delete ", id)
        deleteLocation(id)
    }

    useEffect(() => {
        if (deleted) {
            const timer = setTimeout(() => {
                setdeleted('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [deleted, setdeleted]);

    useEffect(() => {
        getLocation()
    }, [success,deleted])

    useEffect(() => {
        getLocation()
    }, [])


    if (Locations.length == 0) return null

    return (

        <div className='location-card bg-gray-500 bg-opacity-50 rounded-2xl p-6 mt-7 w-full mx-10 '>
            <h2 className='font-bold text-gray-300 text-sm '>SAVED LOCATIONS</h2>
            <div className='flex space-x-4'>

                {Locations.map((data, index) => {
                    return <div key={index} className="saved-card mt-5 min-w-max  bg-gray-700 bg-opacity-50 rounded-2xl py-2 flex flex-col">
                        <div className="details space-y-3 mx-10">
                            <div className='flex justify-center items-center space-x-2'>
                                <h2 className='text-xl font-bold text-gray-300 mb-3 text-center'>{data.weatherData.location}</h2>
                                <img
                                    src={data.weatherData.icon}
                                    alt="Weather Icon"
                                    className='w-20'
                                />
                            </div>

                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{weather} Weather</p>
                                <p className='font-bold text-lg ml-4 text-white'>{data.weatherData.weather}</p>
                            </div>
                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{temperature} Temperature</p>
                                <p className='font-bold text-lg ml-4 text-white'>{(data.weatherData.temperature)}°C</p>
                            </div>
                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{humid} Humidity </p>
                                <p className='font-bold text-lg ml-4 text-white'>{data.weatherData.humidity}%</p>
                            </div>
                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{winds} Wind Speed</p>
                                <p className='font-bold text-lg ml-4 text-white'>{data.weatherData.windSpeed} km/h</p>
                            </div>
                            <div>
                                <p className='text-sm space-x-2 text-gray-300'>{umbrella} Chances of Rain</p>
                                <p className='font-bold text-lg ml-4 text-white'>{data.weatherData.rainChances} %</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center my-3'>
                            <button onClick={(e) => { handleDelete(e, data._id) }} className='rounded-2xl bg-red-600 bg-opacity-60 p-2 w-16'>{trash}</button>
                        </div>
                    </div>
                })}
            </div>
            {deleted && <p className='bg-gray-200 text-green-600 font-bold text-center bg-opacity-30 w-screen'>*{deleted}</p>}
        </div>


    )
}

export default Saved