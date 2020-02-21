import {useContext} from 'react'
import styled from 'styled-components'
import useDarkMode from 'use-dark-mode'
import Toggle from 'react-toggle'
import '../assets/unitsToggleStyle.scss'
import { FiMoon, FiSun } from "react-icons/fi"
import { WiCelsius, WiFahrenheit } from "react-icons/wi";
import Celsius from '../assets/celsius16.svg'
import Fahr from '../assets/fahr16.svg'
import { WeatherContext } from '../lib/weather';

const UnitsToggler = () => {
  const darkMode = useDarkMode(false)
  const theme = darkMode.value ? 'dark' : 'light'

  // console.log(theme)

  const weather = useContext(WeatherContext)
  const { toggleUnits, isMetric } = weather 

  return(
    <Toggle
          defaultChecked={isMetric}
          onChange={toggleUnits} 
          icons={{
            checked: <Fahr />,
            unchecked: <Celsius />
          }}
          />
  )
  
}

export default UnitsToggler