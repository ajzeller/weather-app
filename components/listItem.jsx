import styled from 'styled-components'
import {weatherIcons} from '../assets/weatherIcons'
import { IoIosCheckmarkCircleOutline, 
  IoIosCheckmarkCircle, 
  IoMdTrash,
  IoIosArrowDropright} from "react-icons/io";
import moment from 'moment'

const Card = styled.div`
  padding: 10px 10px;
  background-color: ${props => props.theme.theme.bg.secondary};
  border-radius: 5px;
  box-shadow: 0 1px 7px 0px rgba(0,0,0,0.1);
  margin: 10px 0;
  display: grid;

  svg {
    /* width: 30px; */
    /* height: 30px; */
  }
`

const CardGridUpper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 2fr;
  grid-gap: 5px;
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

const CardBody = styled.div`

`

const CardFooter = styled.div`
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
`


const ListItem = ( {weatherItem} ) => {
  const weatherId = weatherItem.weatherData.weather[0].id
  const idLeadingDigit = weatherId.toString()[0]
  console.log(weatherId)

  const getIcon = () => {
    if( idLeadingDigit == 8 ) {
      console.log(weatherId)
      const icon = weatherIcons.find(item => item.id == weatherId)
      console.log(icon)
      return(icon.iconDay)
    } else {
      const icon = weatherIcons.find(item => item.id.toString()[0] == idLeadingDigit)
      console.log(icon)
      return(icon.iconDay)
    }
  }

  const KtoF = (value) => {
    const f = (value - 273.15)*(9/5) + 32
    return Math.round(f)
  }

  getIcon()

  // const updatedAt = 'test'
  const updatedAt = moment(weatherItem.updated, 'ddd MMM DD YYYY HH:mm:ss').format('ddd, MMM DD, h:m a')
  //Wed Feb 19 2020 15:23:46 GMT-0800 (Pacific Standard Time)

  return(
    <Card>
      <CardGridUpper>
        <span>
        {weatherItem.isDefault ? <IoIosCheckmarkCircle /> : <IoIosCheckmarkCircleOutline /> }
        </span>
        <CardUpperIcon>
          { getIcon() }
        </CardUpperIcon>
        <CardUpperText>
          <CardText100>{KtoF(weatherItem.weatherData.main.temp)}&deg;</CardText100>
          <CardText500>Feels like {KtoF(weatherItem.weatherData.main.feels_like)}&deg;</CardText500>
          <CardText300>{weatherItem.name}</CardText300>
          <CardText400>{weatherItem.weatherData.weather[0].main}</CardText400>
        </CardUpperText>
      </CardGridUpper>

      <CardFooter>
        <IoMdTrash className='left-item' />
        <CardText600 className='center-item'>
          {updatedAt}
        </CardText600>
        <IoIosArrowDropright className='right-item'/> 
      </CardFooter>
      
    </Card>
  )
}

export default ListItem