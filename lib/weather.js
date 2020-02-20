import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';

const baseUrl = process.env.BASE_URL.replace(/\/+$/, '')

const WeatherContext = React.createContext()

const WeatherProvider = (props) => {
  const [locations, setLocations] = useState([])

  const test = 'test'

  // const getWeather = async (latitude, longitude) => {
  //   const res = await fetch(`${baseUrl}/api/weather?lat=${latitude}&lon=${longitude}`)
  //   const json = await res.json()
  //   console.log(json)
  //   return(json)
  // }

  // const handleAddLocation = async (value) => {
  //   const weather = await getWeather(value.lat, value.lng)
  //   setLocations(prev => ([
  //     ...prev, 
  //     {...value, 
  //       updated: new Date(), 
  //       weatherData: weather, 
  //       isDefault: false
  //     }
  //   ]))
  //   // console.log(weather)
  // }

  return(
    <WeatherContext.Provider value='weather context'>
      {props.children}
    </WeatherContext.Provider>
  )
}

const WeatherConsumer = WeatherContext.Consumer
export { WeatherProvider, WeatherConsumer, WeatherContext }
