import React, {useState} from 'react';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';
import Autosuggest from '../components/autosuggest'
import LocationSearchInput from '../components/placesAutocomplete'
import Autocomplete from '../components/autocomplete'
import ListItem from '../components/listItem'
import fetch from 'isomorphic-unfetch'

const baseUrl = process.env.BASE_URL.replace(/\/+$/, '')

export default function Search() {
  const { user, loading } = useFetchUser();
  const [inputText, setInputText] = useState('5254962')
  const [locations, setLocations] = useState([])

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  // console.log(baseUrl)

  // example GET request
  const getWeather = async (latitude, longitude) => {
    // console.log(process.env.API_KEY) 
    // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather`, {
    //   method: 'get',
    //   headers: {
    //     'id': inputText,
    //     'appid': process.env.API_KEY
    //   }
    // })
    // const json = await res.json()
    const res = await fetch(`${baseUrl}/api/weather?lat=${latitude}&lon=${longitude}`)
    const json = await res.json()
    console.log(json)
    return(json)
  }

  const getPlaces = async () => {
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=1600+Amphitheatre&key=${process.env.PLACES_API_KEY}`)
    const json = await res.json()
    console.log(json)
  }

  const handleAddLocation = async (value) => {
    const weather = await getWeather(value.lat, value.lng)
    setLocations(prev => ([
      ...prev, 
      {...value, updated: new Date(), weatherData: weather, isDefault: false}
    ]))
    // console.log(weather)
  }

  console.log(locations)


  return (
    <Layout user={user} loading={loading}>
      {/* {loading && <p>Loading login info...</p>} */}

      <Autocomplete addLocation={handleAddLocation} />
      {locations.map( (item, i) => (<ListItem weatherItem={item} key={i} ></ListItem>))}
    </Layout>
  );
}
