import {useContext} from 'react'
import { WeatherContext } from '../lib/weather';
import {
  Card,
  CardUpper,
  CardDetails,
  CardFooter
} from '../pages/locations/[id]'

const WeatherCard = ( {weatherItem} ) => {

  const { 
    handleAddLocation, 
    handleRemoveLocation,
    setIsDefault,
    isMetric 
  } = useContext(WeatherContext) 

  return(
    <Card>
      <CardUpper weatherItem={weatherItem} setIsDefault={setIsDefault} isMetric={isMetric} />
      <CardDetails weatherItem={weatherItem} isMetric={isMetric} />
      <CardFooter 
        weatherItem={weatherItem} 
        handleAddLocation={handleAddLocation} 
        handleRemoveLocation={handleRemoveLocation}
        />
    </Card>
  )
}

export default WeatherCard