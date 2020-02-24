import styled from 'styled-components'
import moment from 'moment'
import { getOverviewIcon, windDirectionIcon, convertUnits, CardText300, CardText400 } from '../pages/locations/[id]'
import { 
  LineChart, 
  Line, 
  AreaChart,
  ComposedChart,
  Area,
  CartesianGrid, 
  XAxis, 
  YAxis,
  Tooltip,
  ResponsiveContainer 
} from 'recharts';
import {weatherIcons} from '../assets/weatherIcons'
import { WiThermometer, WiStrongWind } from "react-icons/wi";


const ForecastGrid = styled.div`
  display: grid;
  /* overflow-x: scroll; */
  /* overflow: hidden; */
  width: 100%;
  margin: 10px 00px 30px 00px;
  grid-gap: 20px;
  /* justify-items: center; */
  .section-title {
    justify-self: center
  }
`

const ForecastDayContainer = styled.div`
  display: grid;
  overflow-x: scroll;
  /* width: auto; */
  /* max-width: 100%; */
  /* width: 300px; */
  /* overflow: auto; */
  /* background-color: #F1F8FF; */
  box-sizing: border-box;
  /* border: 1px solid #D3E7FF; */
  /* border: 1px solid ${props => props.theme.theme.text.tertiary}; */
  /* box-shadow: 0 1px 2px 2px rgba(0,0,0,0.1); */
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  /* overflow-y: scroll; */
  /* overflow: auto; */
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 30px repeat(auto-fit, minmax(10px, 1fr));
  justify-items: center;
  margin: 0 15px 0 0px;
`

const DetailGridItem = styled.div`
  display: grid;
  width: 100%;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 40px 15px 15px 20px;
  font-size: 12px;
`

const ContainerHorizScroll = styled.div`
  /* overflow-x: auto; */
  /* overflow-x: scroll; */

  width: 1500px;
  /* width: 300px; */
  /* overflow-x: scroll; */
  /* white-space: nowrap; */
`

const DetailIcon = styled.div`
  justify-self: center;
  width: 100%;

  svg{
    width: 100%;
    height: 100%;
  }
`

const Forecast = ({ weatherItem, isMetric }) => {
  // prepare data
  let forecastDaysDetails = [ [] ]
  let dayIndex = 0
  let day = moment(weatherItem.weatherData.forecast.list[0].dt, 'X').format('D')
  console.log(`day: ${day}`)

  weatherItem.weatherData.forecast.list.forEach(item => {
    const itemDate = moment(item.dt, 'X').format('D')
    console.log(itemDate)

    item.time = moment(item.dt, 'X').format('ha')
    item.main_adjusted = {}
    item.main_adjusted.temp = convertUnits(item.main.temp, isMetric)
    item.main_adjusted.feels_like = convertUnits(item.main.feels_like, isMetric)
    item.main_adjusted.temp_min = convertUnits(item.main.temp_min, isMetric)
    item.main_adjusted.temp_max = convertUnits(item.main.temp_max, isMetric)
    item.wind_mph = item.wind.speed * 2.23694

    if(itemDate == day){
      forecastDaysDetails[dayIndex].push(item)
    } else {
      day = itemDate
      forecastDaysDetails.push([])
      dayIndex += 1
      forecastDaysDetails[dayIndex].push(item)
    }
  })

  const forecastAdjusted = weatherItem.weatherData.forecast.list.map(item => {
    item.time = moment(item.dt, 'X').format('ha')
    item.main_adjusted = {}
    item.main_adjusted.temp = convertUnits(item.main.temp, isMetric)
    item.main_adjusted.feels_like = convertUnits(item.main.feels_like, isMetric)
    item.main_adjusted.temp_min = convertUnits(item.main.temp_min, isMetric)
    item.main_adjusted.temp_max = convertUnits(item.main.temp_max, isMetric)
    item.wind_mph = item.wind.speed * 2.23694

    return item
  })

  console.log(forecastAdjusted)
  // console.log(forecastDaysDetails)

  return(
    <ForecastGrid>
      <CardText300 className='section-title'>{forecastDaysDetails.length} Day Forecast</CardText300>
        {/* {forecastDaysDetails.map(item => (<ForecastDayItem weatherData={item} />) )} */}
        <ForecastGraph weatherData={forecastAdjusted} />
    </ForecastGrid>
  )
}

const ForecastGraph = ({ weatherData }) => {
  const paddingVal = 0

  const weatherDataLastRemoved = [ ...weatherData]
  weatherDataLastRemoved.pop()

  const renderLineChart = (
    <ResponsiveContainer width='100%' height={100} >
      <ComposedChart 
        data={weatherData} 
        margin={{ top: 5, right: 15, left: -30, bottom: -10 }} 
      >
        <Area 
          yAxisId="left"
          type="monotone" 
          dataKey="main_adjusted.temp" 
          stroke="#1B8EEF" 
          fill="#3AC1F8" 
          dot={true} 
          />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="wind_mph" 
          stroke="#FF1733"
          dot={false} 
        />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis 
          dataKey="time" 
          tickLine={false} 
          interval={0} 
          tick={{fontSize: 12}}
          padding={{ left: paddingVal, right: paddingVal }}
          />
        <YAxis 
          yAxisId="left" 
          domain={['auto', 'auto']} 
          tickLine={false} 
          tick={{fontSize: 12}} 
          mirror={false} 
        />

        <YAxis 
          yAxisId="right" 
          orientation="left"
          domain={['auto', 'auto']} 
          tickLine={false} 
          tick={{fontSize: 12, fill: '#FF1733'}}
          mirror={true}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const date = moment(weatherData[0].dt, 'X').format('ddd MMM Do')

  return(
    <ForecastDayContainer>
      <ContainerHorizScroll>
        <DetailGrid>
          <DetailGridItem>
            <span></span>
            <span></span>
            <WiThermometer />
            <WiStrongWind />
          </DetailGridItem>
          {weatherDataLastRemoved.map(item => (
            <DetailGridItem>
              {item.time}
              <DetailIcon>
                {getOverviewIcon(item.weather[0].id)}
              </DetailIcon>
              <span>{item.main_adjusted.temp}</span>
              <span>{item.wind_mph.toFixed(1)}</span>
              {windDirectionIcon(item.wind.deg)}

              </DetailGridItem>
          ))}
        </DetailGrid>
        {renderLineChart}
      </ContainerHorizScroll>
    </ForecastDayContainer>
  )
}

export default Forecast