import React, {useState, useContext} from 'react';
import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';
import Autocomplete from '../components/autocomplete'
import ListItem from '../components/listItem'
import fetch from 'isomorphic-unfetch'
import { WeatherContext } from '../lib/weather';

const baseUrl = process.env.BASE_URL.replace(/\/+$/, '')

export default function Index() {
  const { user, loading } = useFetchUser();
  // const [locations, setLocations] = useState([])


  // example GET request
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
  //     {...value, updated: new Date(), weatherData: weather, isDefault: false}
  //   ]))
  //   // console.log(weather)
  // }

  const weather = useContext(WeatherContext)
  const { handleAddLocation, locations, getUser } = weather 
  console.log(locations)

  const shareUser = () => {
    getUser(user)
  }

  shareUser()

  return (
    <Layout user={user} loading={loading}>

      {/* {loading && <p>Loading login info...</p>} */}

      {/* <Autocomplete addLocation={handleAddLocation} /> */}
      {locations.map( (item, i) => (<ListItem weatherItem={item} key={i} ></ListItem>))}
    </Layout>
  );
}
