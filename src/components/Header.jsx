import React from 'react'
import { save, search } from '../utils/icons'
import { useWeatherContext } from '../context/WeatherContext';
import { useState, useEffect } from 'react';
import Alert from './Alert';
import Register from '../Auth/Register';
import { BrowserRouter as Router, Route, Routes, Navigate ,Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';



const Header = () => {
    const { fetchWeatherData, fetchHourly, fetchDaily, errorLocation, addLocation, addError, setaddError, weatherData, success, setsuccess } = useWeatherContext();
    const [location, setLocation] = useState('');
    const {logout,setIsAuthenticated,isAuthenticated}=useAuth()




    const handleSearch = () => {
        fetchWeatherData(location);
        fetchHourly(location);
        fetchDaily(location)
        setLocation('')
    };

    const handleSave = () => {
        if (location) {
            addLocation(location)
            setLocation('')
        }
    }

    const handleAuth = () => {
        if (isAuthenticated == true) {
            logout()
        }
        else logout()
    }

    useEffect(() => {
        if (addError || success) {
            const timer = setTimeout(() => {
                setaddError('');
                setsuccess('');
            }, 3000); // Adjust the timeout duration as needed (3000ms = 3 seconds)

            // Cleanup the timer if the component unmounts or addError changes
            return () => clearTimeout(timer);
        }
    }, [addError, setaddError, success, setsuccess]);


    if (errorLocation) return <Alert error={errorLocation} />

    return (
        <>
            {addError && <p className='bg-gray-200 text-red-500 font-bold text-center bg-opacity-30 w-screen'>*{addError}</p>}
            {success && <p className='bg-gray-200 text-green-400 font-bold text-center bg-opacity-30 w-screen'>*{success}</p>}
            <div className='w-full flex items-center space-x-2 mx-10'>
                <input type="text" placeholder='Search for cities' className='bg-gray-600 bg-opacity-50 border border-white w-full my-4 p-2 px-4 rounded-full outline-none text-white' value={location} onChange={(e) => setLocation(e.target.value)} />
                <button className=' rounded-full text-gray-400 font-bold px-4 py-3  hover:bg-gray-100 hover:text-black hover:cursor-pointer' onClick={handleSearch}>{search}</button>
                <button onClick={handleSave} className='bg-green-500 font-bold w-24 rounded-2xl p-2 px-2 bg-opacity-50 hover:cursor-pointer hover:bg-gray-100 text-sm'>{save} Save</button>
                <button onClick={handleAuth} className='bg-red-600/90 hover:bg-red-500 p-2 rounded-full font-bold absolute right-5 top-2'>{isAuthenticated ? 'Signout' : 'SignIn'}</button>
            </div>
        </>
    )
}

export default Header