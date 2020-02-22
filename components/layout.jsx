import React from 'react';
import Head from 'next/head';
import styled from 'styled-components'

import Header from './header';
import BottomNav from './bottomNav';
import { UserProvider } from '../lib/user';
import { WeatherProvider } from '../lib/weather';

const Main = styled.main`
  color: ${props => props.theme.theme.text.primary};
  background-color: ${props => props.theme.theme.bg.primary};
  margin: 0;
  padding: 0px 15px 50px 15px;
  min-height: calc(100vh - 74px - 0px - 50px);
`

const Content = styled.div`
  max-width: ${props => props.theme.theme.contentWidths[0]};
  margin: auto;
`

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    {/* <WeatherProvider > */}
      <Head>
        <title>Weather App</title>
      </Head>

      <Header />

      <BottomNav />

      <Main>
        <Content >{children}</Content>
      </Main>

      <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${process.env.PLACES_API_KEY}&libraries=places`}></script>

    {/* </WeatherProvider> */}
  </UserProvider>

);

export default Layout;
