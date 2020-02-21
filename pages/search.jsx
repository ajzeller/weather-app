import React, {useState, useContext} from 'react';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';
import Autocomplete from '../components/autocomplete'
import ListItem from '../components/listItem'
import fetch from 'isomorphic-unfetch'
import { WeatherContext } from '../lib/weather';

const baseUrl = process.env.BASE_URL.replace(/\/+$/, '')

export default function Search() {
  const { user, loading } = useFetchUser();

  const weather = useContext(WeatherContext)
  const { handleSelectResult, searchResults, getUser } = weather 

  const shareUser = () => {
    getUser(user)
  }

  shareUser()

  // console.log(searchResults)

  return (
    <Layout user={user} loading={loading}>
      {/* {loading && <p>Loading login info...</p>} */}

      <Autocomplete addLocation={handleSelectResult} />
      {searchResults.map( (item, i) => (<ListItem weatherItem={item} key={i} ></ListItem>))}
    </Layout>
  );
}
