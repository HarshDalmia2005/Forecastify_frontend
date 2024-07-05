import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import CurrentLocationData from './components/CurrentLocationData'
import Hourlyweather from './components/Hourlyweather'
import DailyWeather from './components/DailyWeather'
import Saved from './components/Saved'


function App() {

  return (
    <div className='header w-screen h-screen backdrop-blur-lg bg-white flex'>
      
      <div className='w-[60%]'>
        <Header />
        <CurrentLocationData />
        <Hourlyweather />
        <Saved/>
      </div>
      <div className='w-[33%]'>
        <DailyWeather />
      </div>
    </div>
  )
}

export default App
