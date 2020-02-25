import React, {useContext, useEffect} from 'react';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment'
import Layout from '../../components/layout';
import { useFetchUser } from '../../lib/user';
import { WeatherContext } from '../../lib/weather';
import {weatherIcons} from '../../assets/weatherIcons'
import { IoIosCheckmarkCircleOutline, 
  IoIosCheckmarkCircle, 
  IoMdTrash,
  IoIosArrowDropright,
  IoIosAddCircleOutline,
  IoIosArrowDropdown
} from "react-icons/io";
import Forecast from '../../components/forecast'
import { WiWindDeg } from "react-icons/wi";

const Card = styled.div`
  padding: 10px 10px;
  background-color: ${props => props.theme.theme.bg.secondary};
  border-radius: 8px;
  box-shadow: 0 1px 15px 2px rgba(0,0,0,0.1);
  margin: 0 0 15px 0;
  display: grid;
  box-sizing: border-box;
  width: 100%;

  svg {
    /* width: 30px; */
    /* height: 30px; */
  }
`

const CardGridUpper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1.5fr;
  grid-gap: 5px;
  box-sizing: border-box;
  width: 100%;
`

const CardUpperText = styled.div`
  display: grid;
  justify-items: left;
  margin: 27px 0 0 0;
  align-items: top;
  align-content: start;
  grid-template-rows: repeat(4, auto);
  grid-gap: 1px;
`

const CardUpperIcon = styled.div`
  justify-self: right;
  margin: 20px 0 0 0;

  svg {
    width: 30vw;
    height: 30vw;
    max-height: 120px;
    max-width: 120px;
  }
`

const CardText100 = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 2rem;
  line-height: 1.8rem;
`

const CardText300 = styled.h3`
  margin: 0;
  font-size: 0.9rem;
`

const CardText400 = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 300;
`

const CardText500 = styled.h5`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 300;
  color: ${props => props.theme.theme.text.tertiary};
`

const CardText600 = styled.span`
  margin: 0;
  font-size: 0.7rem;
  font-weight: 300;
  color: ${props => props.theme.theme.text.tertiary};
`

const CardGridFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: end;

  .left-item {
    justify-self: left;
  }

  .center-item {
    justify-self: center;
  }

  .right-item {
    justify-self: right;
  }

  a {
    color: ${props => props.theme.theme.text.primary};
  }

  svg, a{
    display: block;

    &:hover{
      cursor: pointer;
    }
  }
`

const CardGridLower = styled.div`
  margin: 20px 0px 0px 0px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px; 
  grid-row-gap: 10px; 
  box-sizing: border-box;
  width: 100%;
`

const DetailItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;

  .left-item {
    justify-self: left;
  }

  .right-item {
    justify-self: right;
  }
`

const Horizontal_Line = styled.div`
  height: 1px;
  border-bottom: 1px solid #EBEBEB;
  margin: 15px 10px;
`

const Horizontal_Space_30 = styled.div`
  height: 30px;
`

const WindDirection = styled.span`
  /* display: flex; */

  svg{
    color: ${props => props.theme.theme.text.tertiary};
    vertical-align: middle;
    transform: ${props => { 
      return(`rotate(${props.angle+180}deg)`)
    }};
  }
`

const convertUnits = (value, isMetric) => {
  if(isMetric){
    return Math.round(value - 273.15)
  } else{
    const f = (value - 273.15)*(9/5) + 32
    return Math.round(f)
  }
}

const getOverviewIcon = (weatherId) => {
  const idLeadingDigit = weatherId.toString()[0]
  if( idLeadingDigit == 8 ) {
    // console.log(weatherId)
    const icon = weatherIcons.find(item => item.id == weatherId)
    // console.log(icon)
    return(icon.iconDay)
  } else {
    const icon = weatherIcons.find(item => item.id.toString()[0] == idLeadingDigit)
    // console.log(icon)
    return(icon.iconDay)
  }
}

const getPrecipitation = (weatherItem) => {
  if('snow' in weatherItem.weatherData){
    let precip
    if('3h' in weatherItem.weatherData.snow ){
      precip = weatherItem.weatherData.snow['3h'].toFixed(1)
    } else {
      precip = weatherItem.weatherData.snow['1h'].toFixed(1)
    }
    console.log(precip)
    // return(
    //   <DetailGroup label={'Snow (last 3hr)'} value={`${Math.round(weatherItem.weatherData.visibility*0.000621371)} mi`} />
    // )
  }

  if('rain' in weatherItem.weatherData){
    let precip
    if('3h' in weatherItem.weatherData.rain ){
      precip = weatherItem.weatherData.rain['3h'].toFixed(1)
    } else {
      precip = weatherItem.weatherData.rain['1h'].toFixed(1)
    }
    console.log(precip)
    return(
      <DetailGroup label={'Rain (last 3hr)'} value={`${precip}in`} />
    )
  }

  return(
    <DetailGroup label={'Precipitation'} value='None' />
  )
}

const DetailGroup = ( {label, value, icon} ) => {
  return(
    <DetailItemGrid>
      <CardText300 className='left-item'>{label}</CardText300>
      <CardText400 className='right-item'>{value} {label == 'Wind' && icon }</CardText400>
    </DetailItemGrid>
  )
}

const CardUpper = ({ weatherItem, setIsDefault, isMetric }) => {
  const weatherId = weatherItem.weatherData.weather[0].id

  return(
    <CardGridUpper>
      <span>
      {weatherItem.isDefault ? <IoIosCheckmarkCircle /> : <IoIosCheckmarkCircleOutline onClick={() => setIsDefault(weatherItem.weatherData.id)} /> }
      </span>
      <CardUpperIcon>
        { getOverviewIcon(weatherId) }
      </CardUpperIcon>
      <CardUpperText>
        <CardText100>{convertUnits(weatherItem.weatherData.main.temp, isMetric)}&deg;</CardText100>
        <CardText500>Feels like {convertUnits(weatherItem.weatherData.main.feels_like, isMetric)}&deg;</CardText500>
        <CardText300>{weatherItem.name}</CardText300>
        <CardText400>{weatherItem.weatherData.weather[0].main}</CardText400>
      </CardUpperText>
    </CardGridUpper>
  )
}

const windDirectionIcon = (angle) => (
  <WindDirection angle={angle}>
    <WiWindDeg />
  </WindDirection>
)

const CardDetails = ({ weatherItem, isMetric }) => {
  const highTemp = convertUnits(weatherItem.weatherData.main.temp_max, isMetric)
  const lowTemp = convertUnits(weatherItem.weatherData.main.temp_min, isMetric)

  // const WindDirectionIcon = 
  // <WindDirection angle={weatherItem.weatherData.wind.deg}>
  //   <IoIosArrowDropdown />
  // </WindDirection>

  return(
    <CardGridLower>
      <DetailGroup label={'High/Low'} value={`${highTemp}°/${lowTemp}°`} />
      <DetailGroup label={'Wind'} value={`${ (weatherItem.weatherData.wind.speed*2.23694).toFixed(1) }mph`} icon={windDirectionIcon(weatherItem.weatherData.wind.deg)}/>
      <DetailGroup label={'Humidity'} value={`${weatherItem.weatherData.main.humidity}%`} />
      {  getPrecipitation(weatherItem) }
    </CardGridLower>
  )
}

const CardFooter = ({ weatherItem, handleRemoveLocation, handleAddLocation }) => {
  const updatedAt = moment(weatherItem.updated, 'ddd MMM DD YYYY HH:mm:ss').format('ddd, MMM DD, h:mm a')

  return(
    <CardGridFooter>
      { weatherItem.isChecked ? 
        <IoMdTrash 
          className='left-item' 
          onClick={() => handleRemoveLocation(weatherItem.weatherData.id)} /> : 
        <IoIosAddCircleOutline 
          className='left-item' 
          onClick={() => handleAddLocation(weatherItem.weatherData.id)} />
      }
      <CardText600 className='center-item'>
        {updatedAt}
      </CardText600>
      <Link href={`/locations/[id]`} as={`/locations/${weatherItem.weatherData.id}`} >
        <a className='right-item'><IoIosArrowDropright /></a>
      </Link>
    </CardGridFooter>
  )
}

export default function Location() {
  const { user, loading } = useFetchUser();
  const { 
    handleAddLocation,
    handleRemoveLocation,
    setIsDefault,
    locations,
    searchResults, 
    isMetric,
    getUser 
  } = useContext(WeatherContext) 

  const router = useRouter();
  const locationId = router.query.id

  const getWeatherItem = () => {
    let weatherData = locations.find(item => item.weatherData.id == locationId)
    if(weatherData){
      return weatherData
    }
    weatherData = searchResults.find(item => item.weatherData.id == locationId)
    return weatherData
  }

  const weatherItem = getWeatherItem()

  // const weatherItem = locations.find(item => item.weatherData.id == locationId)

  console.log(weatherItem)
  // console.log(locations)

  const shareUser = () => {
    getUser(user)
  }

  shareUser()

  const test = moment(1582362000, 'X').format('ddd, MMM DD, h:mma')

  console.log(test)

  return (
    <Layout user={user} loading={loading}>
      {weatherItem && (
        <Card>
          <CardUpper weatherItem={weatherItem} setIsDefault={setIsDefault} isMetric={isMetric} />
          <CardDetails weatherItem={weatherItem} isMetric={isMetric} />
          <Horizontal_Line />
          <Forecast weatherItem={weatherItem} isMetric={isMetric} />
          <CardFooter 
            weatherItem={weatherItem} 
            handleAddLocation={handleAddLocation} 
            handleRemoveLocation={handleRemoveLocation}
            />
        </Card>
      )}
    </Layout>
  );
}

export {
  Card,
  CardUpper,
  CardDetails,
  CardFooter,
  getOverviewIcon,
  windDirectionIcon,
  convertUnits,
  CardText300,
  CardText400,
  Horizontal_Line,
  Horizontal_Space_30
}
