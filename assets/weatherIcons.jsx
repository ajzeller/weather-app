import { WiDayLightning, 
  WiNightLightning, 
  WiDayShowers,
  WiNightShowers,
  WiDayRain,
  WiNightRain,
  WiDaySnow,
  WiNightSnow,
  WiDayFog,
  WiNightFog,
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy
} from "react-icons/wi";


export const weatherIcons = [
  {
    id: 200,
    iconDay: <WiDayLightning />,
    iconNight: <WiNightLightning />,
    description: 'Thunderstorm'
  },
  {
    id: 300,
    iconDay: <WiDayShowers />,
    iconNight: <WiNightShowers />,
    description: 'Drizzle'
  },
  {
    id: 500,
    iconDay: <WiDayRain />,
    iconNight: <WiNightRain />,
    description: 'Rain'
  },
  {
    id: 600,
    iconDay: <WiDaySnow />,
    iconNight: <WiNightSnow />, 
    description: 'Snow'
  },
  {
    id: 701, 
    iconDay: <WiDayFog />,
    iconNight: <WiNightFog />,
    description: 'Mist'
  },
  {
    id: 800, 
    iconDay: <WiDaySunny />,
    iconNight: <WiNightClear />,
    description: 'Clear'
  },
  {
    id: 801, 
    iconDay: <WiDayCloudy />,
    iconNight: <WiNightAltCloudy />,
    description: 'Few clouds'
  },
  {
    id: 802, 
    iconDay: <WiDayCloudy />,
    iconNight: <WiNightAltCloudy />,
    description: 'Scattered clouds'
  },
  {
    id: 803, 
    iconDay: <WiCloudy />,
    iconNight: <WiNightAltCloudy />, 
    description: 'Some Clouds'
  },
  {
    id: 804, 
    iconDay: <WiCloudy />,
    iconNight: <WiNightAltCloudy />,
    description: 'Overcast'
  },
]
