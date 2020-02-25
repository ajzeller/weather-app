import React, {useContext} from 'react';
import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';
import WeatherCard from '../components/WeatherCard'
import { WeatherContext } from '../lib/weather';

export default function Index() {
  const { user, loading } = useFetchUser();
  const { handleAddLocation, locations, getUser } = useContext(WeatherContext)
  console.log(locations)
  const defaultLocation = locations.filter(item => item.isDefault)
  console.log(defaultLocation)

  const shareUser = () => {
    getUser(user)
  }

  shareUser()

  return (
    <Layout user={user} loading={loading}>
      {defaultLocation.length > 0 && <WeatherCard weatherItem={defaultLocation[0]} />}
      {locations.filter(item => !item.isDefault).map( (item, i) => (<WeatherCard weatherItem={item} key={i} ></WeatherCard>))}
    </Layout>
  );
}
