import React, {useContext} from 'react';
import styled from 'styled-components'
import { IoIosHome, IoIosRefresh, IoIosSearch } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { WeatherContext } from '../lib/weather';

import Link from 'next/link';

const NavContainer= styled.nav`
  z-index: 1;
  bottom: 0;
  position: fixed;
  width: 100vw;
  background-color: ${props => props.theme.theme.bg.secondary};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 15px 0;
  /* border-top: 2px solid ${props => props.theme.theme.bg.primary}; */
  box-shadow: 0 1px 7px 0px rgba(0,0,0,0.1);
`

const NavItem = styled.div`
  display: flex;
  font-size: 20px;
  color: ${props => props.theme.theme.text.quarternary};

  &:hover{
    cursor: pointer;
  }
  a{
    color: ${props => props.theme.theme.text.quarternary};
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    grid-gap: 3px;
    text-decoration: none;
    span{
      font-size: 0.8rem;
    }
  }
`

const BottomNav = () => {
  const weather = useContext(WeatherContext)
  const { updateWeather } = weather 

  return(
    <NavContainer>
        <NavItem>
          <Link href='/'>
            <a>
              {/* <IoIosHome /> */}
              <TiHome />
            </a>
          </Link>
        </NavItem>

        <NavItem onClick={updateWeather}>
          <IoIosRefresh />
        </NavItem>

        <NavItem>
          <Link href='/search'>
            <a>
              <IoIosSearch /> 
            </a>
          </Link>
        </NavItem>


    </NavContainer>
  )
}

export default BottomNav