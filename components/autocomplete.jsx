import React, {useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import styled from 'styled-components'
import { MdClear } from "react-icons/md";

// const Wrapper = styled.div`
//   font-size: ${props => props.theme.theme.fontSizes[1]};
// `

const Input = styled.input`
  border: none;
  font-size: ${props => props.theme.theme.fontSizes[1]};
  padding: 5px 10px;
  background-color: ${props => props.theme.theme.bg.secondary};
  color: ${props => props.theme.theme.text.primary};
`

const List = styled.div`
  background-color: ${props => props.theme.theme.bg.tertiary};
`

const ListItem = styled.div`
  padding: 5px 0;

  &:hover{
    cursor: pointer;
  }
`

const InputWrapper = styled.div`
  padding: 5px 15px;
  margin: 0 0 10px 0;
  background-color: ${props => props.theme.theme.bg.secondary};
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 1px 7px 0px rgba(0,0,0,0.1);

  .styled-input{
    border: none;
    font-size: ${props => props.theme.theme.fontSizes[1]};
    padding: 7px 0px;
    background-color: ${props => props.theme.theme.bg.secondary};
    color: ${props => props.theme.theme.text.primary};
    margin: 0;
    font-weight: 400;

    &:focus{
      outline: none;
    }
  }
`

const ClearSpan = styled.span`
  display: flex;
  margin-left: 10px;
`

export default function Autocomplete( {addLocation} ) {
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  })

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latlong = await getLatLng(results[0])
    setCoordinates(latlong)
    setLocation(value)
    addLocation({...latlong, name: value})
    console.log(latlong)
  }

  return(
    <div>
      {/* <p>Lat: {coordinates.lat}</p> */}
      {/* <p>Lat: {coordinates.lng}</p>  */}

      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={handleSelect}
        >{ ({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <InputWrapper>
            

            <input className='styled-input' {...getInputProps({placeholder: 'Search locations...'})} />
            <ClearSpan onClick={() => setLocation('')}><MdClear /></ClearSpan>

            <List>
              {suggestions.map((suggestion) => {
                return(
                  <ListItem {...getSuggestionItemProps(suggestion)}>{suggestion.description}</ListItem>
                )
              } )}
            </List>
          </InputWrapper>
          
        )}

      </PlacesAutocomplete>
    </div>
    
  )
}