import React, {useContext} from 'react';
import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';
import Autocomplete from '../components/autocomplete'
import WeatherCard from '../components/WeatherCard'
import { WeatherContext } from '../lib/weather';

const baseUrl = process.env.BASE_URL.replace(/\/+$/, '')

export default function Search() {
  const { user, loading } = useFetchUser();
  const { handleSelectResult, searchResults, getUser } = useContext(WeatherContext) 

  const shareUser = () => {
    getUser(user)
  }

  shareUser()

  // console.log(searchResults)

  return (
    <Layout user={user} loading={loading}>
      <Autocomplete addLocation={handleSelectResult} />
      {searchResults.map( (item, i) => (<WeatherCard weatherItem={item} key={i} ></WeatherCard>))}
    </Layout>
  );
}
