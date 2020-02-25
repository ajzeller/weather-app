import {useContext} from 'react'
import { WeatherContext } from '../lib/weather';
import {
  Card,
  CardUpper,
  CardDetails,
  CardFooter,
  Horizontal_Space_30
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
      <Horizontal_Space_30 />
      <CardFooter 
        weatherItem={weatherItem} 
        handleAddLocation={handleAddLocation} 
        handleRemoveLocation={handleRemoveLocation}
        />
    </Card>
  )
}

export default WeatherCard