import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';

const baseUrl = process.env.BASE_URL.replace(/\/+$/, '')

const WeatherContext = React.createContext()

const WeatherProvider = (props) => {
  const [locations, setLocations] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isMetric, setIsMetric] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getUser = (userObj) => {
    setUser(userObj)
  }

  console.log(user)

  const getWeather = async (latitude, longitude) => {
    const res = await fetch(`${baseUrl}/api/weather?lat=${latitude}&lon=${longitude}`)
    const json = await res.json()
    // console.log(json)
    return(json)
  }

  const handleAddLocation = async (value) => {
    try{
      const location = searchResults.find(item => item.weatherData.id == value)

      // only POST to DB if user is true
      if(user){
        const { lat, lng, name, updated, isDefault } = location
        const locationPayload = {
          lat,
          lng,
          name,
          geoId: location.weatherData.id,
          isDefault,
          isChecked: true,
          updated
        }
        const res = await fetch(`${baseUrl}/api/users`, {
          method: 'POST',
          body: JSON.stringify(locationPayload)
        })
      }
      
      // add location to locations arr
      setLocations(prev => ([
        ...prev, 
        {
          ...location,
          isChecked: true
        }
      ]))
  
      // update locations's isChecked in search results arr
      setSearchResults(prev => (prev.map(item => {
        if(item.weatherData.id == value){
          return {
            ...item,
            isChecked: true,
          }
        }
        return item
      })))
      console.log('add location')

    } catch(err){
      console.log(`Error: ${err}`)
    }
    
  }

  const handleRemoveLocation = async (value) => {
    try{
      const location = searchResults.find(item => item.weatherData.id == value)

      if(user){
        const res = await fetch(`${baseUrl}/api/users`, {
          method: 'DELETE',
          body: JSON.stringify({id: value})
        })
      }

      setLocations(prev => (prev.filter(item => item.weatherData.id !== value)))

      setSearchResults(prev => (prev.map(item => {
        if(item.weatherData.id == value){
          return {
            ...item,
            isChecked: false,
          }
        }
        return item
      })))
    } catch(err){
      console.log(`Error: ${err}`)
    }
  }

  const handleSelectResult = async (value) => {
    setIsLoading(true)
    const weather = await getWeather(value.lat, value.lng)
    setSearchResults(prev => ([
      ...prev, 
      {...value, 
        updated: new Date(), 
        weatherData: weather, 
        isDefault: false,
        isChecked: false
      }
    ]))
    setIsLoading(false)
    // console.log(weather)
  }

  // updates each weather item for refresh or get
  const updateEach = async (value) => {
    const weather = await getWeather(value.lat, value.lng)
    return {
      ...value, 
      updated: new Date(), 
      weatherData: weather 
    }
  }

  const updateWeather = async () => {
    setIsLoading(true)
    const updatedLocations = await Promise.all(locations.map(location => updateEach(location)))
    setLocations(updatedLocations)

    const updatedSearchResults = await Promise.all(searchResults.map(location => updateEach(location)))
    setSearchResults(updatedSearchResults)
    setIsLoading(false)
  }

  const getLocations = async () => {
    if(user){
      const res = await fetch(`${baseUrl}/api/users`, {
        method: 'GET'
      })
      const json = await res.json()
      console.log(json)
      return(json)
    }
  }

  const setIsDefault = async (value) => {
    if(user){
      try{
        const res = await fetch(`${baseUrl}/api/users`, {
          method: 'PUT',
          body: JSON.stringify({id: value})
        })

        setLocations(prev => (prev.map(item => ({
          ...item,
          isDefault: false
        }))))

        setLocations(prev => (prev.map(item => {
          if(item.weatherData.id == value){
            return {
              ...item,
              isDefault: true
            }
          }
          return item
        })))

        setSearchResults(prev => (prev.map(item => ({
          ...item,
          isDefault: false
        }))))

        setSearchResults(prev => (prev.map(item => {
          if(item.weatherData.id == value){
            return {
              ...item,
              isDefault: true
            }
          }
          return item
        })))
        

      } catch(err){
        console.log(`Error: ${err}`)
      }
    }
  }

  const toggleUnits = () => {
    setIsMetric(prev => !prev)
  }

  useEffect( () => {
    if(user){
      console.log('useEffect user')

      const getUserLocations = async () => {
        setIsLoading(true)
        // get locations from db
        const res = await getLocations()
        const userLocations = res[0].weather
        console.log(userLocations)
        const updatedLocations = await Promise.all(userLocations.map(location => updateEach(location)))
        setLocations(updatedLocations)
        // return(locationsFromDb)
        setIsLoading(false)
      }

      getUserLocations()

    } else {
      console.log('useEffect')
    }


  }, [user])

  // console.log(isMetric)
  console.log(locations)
  console.log(isLoading)

  return(
    <WeatherContext.Provider value={{
      getUser,
      getWeather,
      handleAddLocation,
      handleRemoveLocation,
      handleSelectResult,
      setIsDefault,
      updateWeather,
      locations,
      searchResults,
      isMetric,
      toggleUnits,
      isLoading
    }} >
      {props.children}
    </WeatherContext.Provider>
  )
}

const WeatherConsumer = WeatherContext.Consumer
export { WeatherProvider, WeatherConsumer, WeatherContext }
