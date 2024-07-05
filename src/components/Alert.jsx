import React from 'react'
import { useWeatherContext } from '../context/WeatherContext'
import { wrong } from '../utils/icons'

const Alert = ({error}) => {
    return (
        <div className='bg-gray-500 mx-10 my-10 rounded-xl bg-opacity-50 flex justify-center py-2'>
            <span className='text-red-500 font-bold text-center text-2xl'>{wrong}</span>
            <span className="text-red-500 font-bold text-center text-2xl ml-5">
                {error}
            </span>
        </div>
    )
}

export default Alert