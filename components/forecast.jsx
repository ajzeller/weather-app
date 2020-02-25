import styled from 'styled-components'
import moment from 'moment'
import { getOverviewIcon, 
  windDirectionIcon, 
  convertUnits, 
  CardText300, 
  CardText400,
  Horizontal_Line
 } from '../pages/locations/[id]'
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
import { IoIosCompass, IoMdTime, IoIosCalendar, IoMdPartlySunny } from "react-icons/io";


const ForecastGrid = styled.div`
  display: grid;
  /* overflow-x: scroll; */
  /* overflow: hidden; */
  width: 100%;
  margin: 0px 0px 20px 0px;
  /* justify-items: center; */
  .section-title {
    justify-self: center
  }
`

const ForecastContainer = styled.div`
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
  padding: 0 10px;
  border-radius: 8px;
  /* overflow-y: scroll; */
  /* overflow: auto; */
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 30px repeat(auto-fit, minmax(10px, 1fr));
  justify-items: center;
  margin: 0 15px 0 0px;
  grid-gap: 1px;
  background-color: #EBEBEB;
`

const DetailGridItem = styled.div`
  display: grid;
  width: 100%;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 20px 30px 40px 15px 15px 20px;
  font-size: 12px;
  background-color: white;
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

const DatesGrid = styled.div`
  display: grid;
  margin: 0 0 0 30px;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
  grid-gap: 1px;
  background-color: grey;
`

const DayItem = styled.span`
  text-transform: uppercase;
  font-weight: 500;
  color: ${props => props.theme.theme.text.quarternary};
`

const ForecastByDay = styled.div`
  display: grid;
  /* border: 1px solid grey; */

`

const ForecastDayItem = styled.div`
  display: grid;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  /* margin: 0 20px; */
  align-items: center;
  justify-items: left;
  grid-template-columns: auto 70px 35px 20px;
  grid-template-rows: 30px;

  svg{
    height: 30px;
    width: 30px;
    justify-self: center;
  }
`

const TooltipPanel = styled.div`
  background-color: ${props => props.theme.theme.bg.secondary};
  box-shadow: 0 1px 2px 2px rgba(0,0,0,0.1);
  padding: 10px 10px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr;
`

const Forecast = ({ weatherItem, isMetric }) => {

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

  // prepare data
  let forecastDaysDetails = [ [] ]
  let dayIndex = 0
  let day = moment(weatherItem.weatherData.forecast.list[0].dt, 'X').format('D')
  console.log(`day: ${day}`)

  forecastAdjusted.forEach(item => {
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

  console.log(forecastDaysDetails)

  const forecastSummary = forecastDaysDetails.map(item => {
    let temp_min = item[0].main_adjusted.temp
    let temp_max = item[0].main_adjusted.temp
    let weatherId = 800
    const date = moment(item[0].dt, 'X').format('dddd, MMM Do')

    item.forEach(day => {
      if(day.main_adjusted.temp < temp_min){
        temp_min = day.main_adjusted.temp
      }

      if(day.main_adjusted.temp > temp_max){
        temp_max = day.main_adjusted.temp
      }

      if(day.weather[0].id !== 800){
        weatherId = day.weather[0].id
      }

    })

    return {
      temp_min,
      temp_max,
      weatherId,
      date
    }

  })

  console.log(forecastAdjusted)
  // console.log(forecastDaysDetails)
  console.log(forecastSummary)

  return(
    <ForecastGrid>
        <ForecastByDay>
          {forecastSummary.map( (item, i) => (
            <ForecastDayItem key={i}>
              <CardText300>
              {item.date}
              </CardText300>
                {getOverviewIcon(item.weatherId)}
              <CardText400>
                {item.temp_max}&deg;
              </CardText400>
              <CardText400>
                {item.temp_min}&deg;
              </CardText400>
            </ForecastDayItem>
          ))}
        </ForecastByDay>
        <Horizontal_Line />
        <ForecastGraph weatherData={forecastAdjusted} />
    </ForecastGrid>
  )
}

const CustomTooltip = (props) => {
  const {active} = props

  if(active){
    const {payload, label } = props
    // console.log(payload)
    // console.log(label)

    return(
      <TooltipPanel>
        <CardText300>{label}</CardText300>
        <CardText400>{payload[0].payload.main_adjusted.temp}&deg;</CardText400>
        <CardText400>{payload[0].payload.wind_mph.toFixed(1)}mph {windDirectionIcon(payload[0].payload.wind.deg)}</CardText400>
          
      </TooltipPanel>
    )
  }
  return(null)

}

const ForecastGraph = ({ weatherData }) => {
  const paddingVal = 0

  const weatherDataLastRemoved = [ ...weatherData]
  weatherDataLastRemoved.pop()

  let forecastDays = []
  forecastDays.push(moment(weatherData[0].dt, 'X').format('ddd MMM Do'))
  let daysIndex = 0

  weatherData.forEach(item => {
    const date = moment(item.dt, 'X').format('ddd MMM Do')
    if(date !== forecastDays[daysIndex]){
      forecastDays.push(date)
      daysIndex++
    }
  })

  console.log(forecastDays)

  const renderLineChart = (
    <ResponsiveContainer width='100%' height={100} >
      <ComposedChart 
        data={weatherData} 
        margin={{ top: 0, right: 15, left: -30, bottom: -10 }} 
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
        <Tooltip 
          content={<CustomTooltip/>}
        />
        {/* <CartesianGrid 
          // strokeDasharray="2 2"
          // stroke="#EBEBEB"

        /> */}
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
    <ForecastContainer>
      <ContainerHorizScroll>
        <DetailGrid>
          <DetailGridItem>
            <span></span>
            <span></span>
            <span></span>
            <WiThermometer />
            <WiStrongWind />
            <IoIosCompass />
          </DetailGridItem>

          {weatherDataLastRemoved.map( (item,i) => (
            <DetailGridItem key={i}>
              <DayItem>{moment(item.dt, 'X').format('ddd')}</DayItem>
              {item.time}
              <DetailIcon>
                {getOverviewIcon(item.weather[0].id)}
              </DetailIcon>
              <span>{item.main_adjusted.temp}&deg;</span>
              <span>{item.wind_mph.toFixed(1)}</span>
              {windDirectionIcon(item.wind.deg)}

              </DetailGridItem>
          ))}
        </DetailGrid>
        {renderLineChart}
      </ContainerHorizScroll>
    </ForecastContainer>
  )
}

export default Forecast